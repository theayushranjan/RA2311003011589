import { useEffect, useState, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationList } from '@/components/NotificationList';
import { FilterBar } from '@/components/FilterBar';
import { Log } from '@/middleware/logger';

export default function PriorityNotifications() {
  const [limit, setLimit] = useState(5);
  const [type, setType] = useState('All');
  
  const { notifications, viewedIds, loading, error, fetchPriorityNotifications, markAsViewed } = useNotifications();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      Log('frontend', 'info', 'page', 'Priority Notifications page mounted');
      mounted.current = true;
    }
    Log('frontend', 'info', 'page', `Priority page fetching: limit=${limit}, type=${type}`);
    fetchPriorityNotifications(limit, type);
  }, [limit, type, fetchPriorityNotifications]);

  const handleFilterChange = (newLimit: number, newType: string) => {
    setLimit(newLimit);
    setType(newType);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Priority Notifications</Typography>
      <FilterBar initialLimit={limit} initialType={type} onChange={handleFilterChange} />
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
