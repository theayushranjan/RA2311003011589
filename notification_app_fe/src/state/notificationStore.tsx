import React, { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';
import { Log } from '@/middleware/logger';
import { Notification } from '@/api/notificationsApi';

interface State {
  token: string | null;
  tokenExpiry: number | null;
  notifications: Notification[];
  viewedIds: Set<string>;
}

type Action =
  | { type: 'SET_TOKEN'; payload: { token: string; expiry: number } }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'MARK_VIEWED'; payload: string }
  | { type: 'INIT_VIEWED'; payload: string[] };

const initialState: State = {
  token: null,
  tokenExpiry: null,
  notifications: [],
  viewedIds: new Set(),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TOKEN':
      Log('frontend', 'debug', 'state', 'Token updated in store');
      return { ...state, token: action.payload.token, tokenExpiry: action.payload.expiry };
    case 'SET_NOTIFICATIONS':
      Log('frontend', 'debug', 'state', `Set ${action.payload.length} notifications in store`);
      return { ...state, notifications: action.payload };
    case 'MARK_VIEWED': {
      if (state.viewedIds.has(action.payload)) return state;
      const newViewed = new Set(state.viewedIds).add(action.payload);
      sessionStorage.setItem('viewedIds', JSON.stringify(Array.from(newViewed)));
      Log('frontend', 'debug', 'state', `Marked notification ${action.payload} as viewed`);
      return { ...state, viewedIds: newViewed };
    }
    case 'INIT_VIEWED': {
      Log('frontend', 'debug', 'state', `Initialized ${action.payload.length} viewed IDs from session`);
      return { ...state, viewedIds: new Set(action.payload) };
    }
    default:
      return state;
  }
}

export const NotificationContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('viewedIds');
      if (stored) {
        dispatch({ type: 'INIT_VIEWED', payload: JSON.parse(stored) });
      }
    } catch (e) {
      Log('frontend', 'warn', 'state', 'Failed to parse viewedIds from sessionStorage');
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationStore = () => useContext(NotificationContext);
