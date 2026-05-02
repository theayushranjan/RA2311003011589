import { useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationList } from '@/components/NotificationList';
import { Log } from '@/middleware/logger';

export default function AllNotifications() {
  const { notifications, viewedIds, loading, error, fetchAllNotifications, markAsViewed } = useNotifications();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      Log('frontend', 'info', 'page', 'All Notifications page mounted');
      mounted.current = true;
    }
    fetchAllNotifications();
  }, [fetchAllNotifications]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>All Notifications</Typography>
      <NotificationList 
        notifications={notifications}
        viewedIds={viewedIds}
        loading={loading}
        error={error}
        onView={markAsViewed}
      />
    </Box>
  );
}
