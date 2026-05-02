import { Card, CardContent, Typography, Box, Badge } from '@mui/material';
import { Notification } from '@/api/notificationsApi';
import { notificationColors } from '@/style/theme';
import { Log } from '@/middleware/logger';

interface NotificationCardProps {
  notification: Notification;
  isViewed: boolean;
  onView: (id: string) => void;
}

export const NotificationCard = ({ notification, isViewed, onView }: NotificationCardProps) => {
  const color = notificationColors[notification.Type as keyof typeof notificationColors] || '#ffffff';

  const handleClick = () => {
    if (!isViewed) {
      Log('frontend', 'info', 'component', `Notification viewed: ${notification.ID}`);
      onView(notification.ID);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        cursor: isViewed ? 'default' : 'pointer',
        borderLeft: `6px solid ${color}`,
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: isViewed ? 'none' : 'translateY(-2px)',
          boxShadow: isViewed ? undefined : '0 6px 40px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isViewed && (
              <Box 
                sx={{ 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  backgroundColor: 'error.main',
                  flexShrink: 0
                }} 
              />
            )}
            <Typography variant="subtitle2" sx={{ color, fontWeight: 'bold' }}>
              {notification.Type}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {notification.Timestamp}
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: isViewed ? 'normal' : '500',
            color: isViewed ? 'text.secondary' : 'text.primary'
          }}
        >
          {notification.Message}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.disabled' }}>
          ID: {notification.ID}
        </Typography>
      </CardContent>
    </Card>
  );
};
