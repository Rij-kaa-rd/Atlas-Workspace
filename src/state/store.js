import { getRuntimeState } from "../app.runtime.js";
import { getTodayISO } from "../utils/helpers.js";

let state = {};
const listeners = new Set();

export function initStore(initialState = null) {
  state = initialState || getRuntimeState() || { updatedAt: getTodayISO(), pages: [] };
  notify();
  return state;
}

export function getState() {
  return getRuntimeState() || state;
}

export function setState(nextState) {
  state = {
    ...getState(),
    ...nextState,
    updatedAt: getTodayISO(),
  };

  notify();
  return state;
}

export function replaceState(nextState) {
  state = {
    ...nextState,
    updatedAt: nextState?.updatedAt || getTodayISO(),
  };

  notify();
  return state;
}

export function subscribe(listener) {
  if (typeof listener !== "function") {
    throw new Error("Store listener must be a function.");
  }

  listeners.add(listener);

  return function unsubscribe() {
    listeners.delete(listener);
  };
}

export function dispatch(action) {
  if (!action || !action.type) {
    throw new Error("Action must have a type.");
  }

  switch (action.type) {
    case "workspace/replace":
      return replaceState(action.payload);

    case "workspace/patch":
      return setState(action.payload);

    default:
      console.warn(`[store] Unknown action type: ${action.type}`);
      return getState();
  }
}

function notify() {
  listeners.forEach((listener) => {
    try {
      listener(getState());
    } catch (error) {
      console.error("[store] Listener error:", error);
    }
  });
}
