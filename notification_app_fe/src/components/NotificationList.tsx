import { Grid, Skeleton, Box, Typography, Alert } from '@mui/material';
import { NotificationCard } from './NotificationCard';
import { Notification } from '@/api/notificationsApi';

interface NotificationListProps {
  notifications: Notification[];
  viewedIds: Set<string>;
  loading: boolean;
  error: string | null;
  onView: (id: string) => void;
}

export const NotificationList = ({ notifications, viewedIds, loading, error, onView }: NotificationListProps) => {
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (loading && notifications.length === 0) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={n}>
            <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 4 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (notifications.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No notifications found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {notifications.map((notification) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={notification.ID}>
          <NotificationCard 
            notification={notification}
            isViewed={viewedIds.has(notification.ID)}
            onView={onView}
          />
        </Grid>
      ))}
    </Grid>
  );
};
