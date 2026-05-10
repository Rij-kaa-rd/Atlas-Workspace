# Atlas Workspace

Aplikasi workspace mirip Notion yang berjalan local-first dan siap disambungkan ke Supabase untuk authentication serta cloud sync.

## Fitur

- Email/password authentication lewat Supabase Auth.
- Cloud sync ke tabel `notion_workspaces` dengan Row Level Security.
- Local-first storage lewat `localStorage`.
- Responsive desktop/mobile.
- Kanban drag-drop.
- Markdown editor dan preview.
- Reminders dengan browser notifications.
- Tags, search, filter, duplicate, dan delete page.
- PWA shell saat dijalankan lewat `http://` atau hosting.

## Cara menjalankan

Untuk preview cepat, buka `index.html` langsung di browser.

Untuk mode PWA/service worker, jalankan static server di folder ini:

```bash
npx serve .
```

## Setup Supabase

1. Buat project di Supabase.
2. Buka SQL Editor dan jalankan isi file `supabase.sql`.
3. Buka Authentication > Providers > Email, lalu aktifkan email/password.
4. Tambahkan URL app di Authentication > URL Configuration.
5. Buka app, klik tombol cloud settings, masukkan `Project URL` dan `anon public key`.
6. Login atau buat akun dari app.

Data workspace akan tersimpan sebagai JSONB per user:

```sql
select user_id, updated_at, data
from public.notion_workspaces;
```

## Deploy

Folder ini bisa di-deploy sebagai static site ke Vercel, Netlify, Cloudflare Pages, Firebase Hosting, atau Supabase Storage. Untuk production, simpan Supabase URL dan anon key sebagai environment saat build atau isi manual lewat Cloud Settings di app.
