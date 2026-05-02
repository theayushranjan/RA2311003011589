import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Soft blue
    },
    background: {
      default: '#121212',
      paper: 'rgba(30, 30, 30, 0.8)', // Glassmorphism base
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)', // Safari support
          backgroundColor: 'rgba(30, 30, 30, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

export const notificationColors = {
  Event: '#2196f3', // Blue
  Result: '#4caf50', // Green
  Placement: '#ff9800', // Orange
};

export default theme;
