import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import theme from '@/style/theme';
import { NotificationProvider, useNotificationStore } from '@/state/notificationStore';
import { useEffect } from 'react';
import { fetchToken } from '@/api/notificationsApi';
import { setLoggerToken, Log } from '@/middleware/logger';
import { Navbar } from '@/components/Navbar';

const InitAuth = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch } = useNotificationStore();

  useEffect(() => {
    const initToken = async () => {
      const now = Date.now() / 1000;
      // Re-fetch token if not present or expired
      if (!state.token || (state.tokenExpiry && now >= state.tokenExpiry)) {
        Log('frontend', 'info', 'auth', 'Fetching new auth token');
        const tokenStr = await fetchToken();
        if (tokenStr) {
          setLoggerToken(tokenStr);
          dispatch({ type: 'SET_TOKEN', payload: { token: tokenStr, expiry: now + 3600 } });
        }
      }
    };
    initToken();
  }, [state.token, state.tokenExpiry, dispatch]);

  if (!state.token) {
    return <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>Authenticating...</Box>;
  }

  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <InitAuth>
          <Navbar />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Component {...pageProps} />
          </Container>
        </InitAuth>
      </NotificationProvider>
    </ThemeProvider>
  );
}
