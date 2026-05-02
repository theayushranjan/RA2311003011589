import { useState, useCallback } from 'react';
import { useNotificationStore } from '@/state/notificationStore';
import { fetchNotifications, fetchAllNotifications as fetchAllApi, Notification } from '@/api/notificationsApi';
import { Log } from '@/middleware/logger';

export const useNotifications = () => {
  const { state, dispatch } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNotifications = useCallback(async () => {
    if (!state.token) return;
    
    setLoading(true);
    setError(null);
    Log('frontend', 'info', 'hook', 'Starting fetch all notifications');
    
    try {
      const all = await fetchAllApi(state.token);
      dispatch({ type: 'SET_NOTIFICATIONS', payload: all });
      Log('frontend', 'info', 'hook', `Successfully fetched ${all.length} total notifications`);
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      Log('frontend', 'error', 'hook', `Fetch all failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [state.token, dispatch]);

  const fetchPriorityNotifications = useCallback(async (limit: number, type?: string) => {
    if (!state.token) return;

    setLoading(true);
    setError(null);
    Log('frontend', 'info', 'hook', `Fetching priority notifications: limit=${limit}, type=${type || 'all'}`);

    try {
      const notifications = await fetchNotifications(state.token, { limit, page: 1, notification_type: type });
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
      Log('frontend', 'info', 'hook', `Successfully fetched priority notifications`);
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      Log('frontend', 'error', 'hook', `Fetch priority failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [state.token, dispatch]);

  const markAsViewed = useCallback((id: string) => {
    dispatch({ type: 'MARK_VIEWED', payload: id });
  }, [dispatch]);

  return {
    notifications: state.notifications,
    viewedIds: state.viewedIds,
    loading,
    error,
    fetchAllNotifications,
    fetchPriorityNotifications,
    markAsViewed
  };
};
