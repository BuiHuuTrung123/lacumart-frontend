// src/components/Admin/DashboardSidebar/DashboardSidebar.jsx
import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Inventory,
  ShoppingCart,
  Assessment,
  Warehouse,
  Dashboard as DashboardIcon,
  FitnessCenter,
  LocalMall,
  TrendingUp,
  Storage,
} from '@mui/icons-material';
import logo from '~/assets/logo.png';

const menuItems = [
  { id: 'dashboard', label: 'Tổng quan', icon: DashboardIcon },
  { id: 'products', label: 'Sản phẩm', icon: Inventory },
  { id: 'orders', label: 'Đơn hàng', icon: ShoppingCart },
  { id: 'inventory', label: 'Kho hàng', icon: Warehouse },
  { id: 'revenue', label: 'Doanh thu', icon: Assessment },
];

const DashboardSidebar = ({ activeSection, onSectionChange }) => {
  return (
    <Box
      sx={{
        width: 280,
        background: 'linear-gradient(180deg, #0f1720 0%, #1a2530 100%)',
        color: 'white',
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: '2px solid #ff5722',
        boxShadow: '4px 0 20px rgba(255, 87, 34, 0.1)',
      }}
    >
      {/* Header với Logo */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
          <img 
            src={logo} 
            alt="LACU MART" 
            style={{ 
              height: '50px', 
              width: '50px',
              borderRadius: '8px',
            }} 
          />
          <Box>
            <Typography 
              variant="h5" 
              fontWeight={800}
              sx={{
                background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '1px',
              }}
            >
              LACU MART
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)', 
                mt: 0.5,
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.5px'
              }}
            >
              FITNESS ADMIN
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Menu */}
      <List sx={{ p: 2, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => onSectionChange(item.id)}
              sx={{
                borderRadius: '12px',
                backgroundColor: activeSection === item.id 
                  ? 'rgba(255, 87, 34, 0.2)' 
                  : 'transparent',
                border: activeSection === item.id 
                  ? '2px solid #ff5722' 
                  : '2px solid transparent',
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 87, 34, 0.15)',
                  border: '2px solid rgba(255, 87, 34, 0.5)',
                  transform: 'translateX(5px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: activeSection === item.id ? '#ff5722' : 'rgba(255,255,255,0.8)',
                  minWidth: 45,
                  transition: 'color 0.3s ease',
                }}
              >
                <item.icon sx={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: activeSection === item.id ? 700 : 600,
                  fontSize: '15px',
                  color: activeSection === item.id ? '#ff5722' : 'white',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

      {/* Stats Summary */}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            background: 'rgba(255, 87, 34, 0.1)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 87, 34, 0.2)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 600,
              mb: 1 
            }}
          >
            🏋️‍♂️ Fitness Power
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#ff5722',
              fontSize: '12px',
              fontWeight: 600 
            }}
          >
            Let's build together! 💪
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, position: 'absolute', bottom: 0, width: '100%' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.5)', 
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: 600 
          }}
        >
          © 2024 LACU MART • FITNESS
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardSidebar;