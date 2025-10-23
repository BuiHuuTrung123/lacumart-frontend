import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Kích thước responsive
const HEADER_HEIGHT = { xs: '60px', sm: '70px', md: '80px' };
const SUPPLEMENT_NAVBAR_HEIGHT = { xs: '120px', sm: '130px', md: '130px', lg:'60px' };
const BANNER_HEIGHT = { xs: '300px', sm: '400px', md: '500px', lg: '600px', xl: '700px' };
const CATEGORY_HEIGHT = { xs: 'auto', md: '400px', lg: '500px' };
const FOOTER_HEIGHT = { xs: 'auto', md: '56px' };

// Create a theme instance.
const theme = extendTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff5722',
      light: '#ff8a65',
      dark: '#d84315',
    },
    secondary: {
      main: '#4b433fff',
      light: '#534bae',
      dark: '#000051',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  
  trelloCustom: {
    headerHeight: HEADER_HEIGHT,
    supplementNavbarHeight: SUPPLEMENT_NAVBAR_HEIGHT,
    bannerHeight: BANNER_HEIGHT,
    categoryHeight: CATEGORY_HEIGHT,
    footerHeight: FOOTER_HEIGHT
  },

  // Thêm breakpoints tùy chỉnh
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, & *": {
          overscrollBehavior: 'none',
          boxSizing: 'border-box',
          "*::-webkit-scrollbar": {
            width: { xs: "4px", sm: "6px", md: "8px" },
            height: { xs: "4px", sm: "6px", md: "8px" },
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: '#dcdde1',
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfbfbf",
          },
        },
        html: {
          fontSize: { xs: '14px', sm: '15px', md: '16px' },
        },
        body: {
          margin: 0,
          padding: 0,
          minHeight: '100vh',
        },
      },
    },
    
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          borderRadius: '8px',
          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
          padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
          '&:hover': { 
            borderWidth: '2px',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
          transition: 'all 0.2s ease-in-out',
        }
      },
    },
    
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          borderRadius: '0 0 12px 12px',
          borderTop: '3px solid #ff5722'
        }
      }
    }
  }
});

export default theme;