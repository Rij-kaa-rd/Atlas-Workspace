create table if not exists public.notion_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.notion_workspaces enable row level security;

drop policy if exists "Users can read own workspace" on public.notion_workspaces;
drop policy if exists "Users can insert own workspace" on public.notion_workspaces;
drop policy if exists "Users can update own workspace" on public.notion_workspaces;
drop policy if exists "Users can delete own workspace" on public.notion_workspaces;

create policy "Users can read own workspace"
on public.notion_workspaces
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own workspace"
on public.notion_workspaces
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own workspace"
on public.notion_workspaces
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own workspace"
on public.notion_workspaces
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists notion_workspaces_updated_at_idx
on public.notion_workspaces(updated_at desc);
