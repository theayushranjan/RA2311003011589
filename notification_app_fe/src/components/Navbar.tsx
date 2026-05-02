import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Log } from '@/middleware/logger';

export const Navbar = () => {
  const router = useRouter();

  const handleNav = (path: string, name: string) => {
    Log('frontend', 'info', 'component', `Navigation: User navigated to ${name} page`);
  };

  return (
    <AppBar position="sticky" sx={{ background: 'rgba(18, 18, 18, 0.8)', backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
            NotifiDash
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/" passHref legacyBehavior>
              <Button 
                component="a" 
                color={router.pathname === '/' ? 'primary' : 'inherit'}
                onClick={() => handleNav('/', 'All Notifications')}
                sx={{ fontWeight: router.pathname === '/' ? 'bold' : 'normal' }}
              >
                All Notifications
              </Button>
            </Link>
            <Link href="/priority" passHref legacyBehavior>
              <Button 
                component="a" 
                color={router.pathname === '/priority' ? 'primary' : 'inherit'}
                onClick={() => handleNav('/priority', 'Priority')}
                sx={{ fontWeight: router.pathname === '/priority' ? 'bold' : 'normal' }}
              >
                Priority
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
