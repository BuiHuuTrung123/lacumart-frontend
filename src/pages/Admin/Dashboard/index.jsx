// src/pages/AdminDashboard/AdminDashboard.jsx
import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Container } from '@mui/material';
import DashboardSidebar from '~/components/Admin/DashboardSidebar/DashboardSidebar';
import ProductManagement from '~/components/Admin/ProductManagement/ProductManagement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('products');

  const renderSection = () => {
    switch (activeSection) {
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'revenue':
        return <RevenueManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Container maxWidth="xl">
          {renderSection()}
        </Container>
      </Box>
    </Box>
  );
};

// Placeholder components for other sections
const OrderManagement = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h4">Quản lý đơn hàng</Typography>
    <Typography>Component quản lý đơn hàng sẽ được phát triển sau...</Typography>
  </Paper>
);

const InventoryManagement = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h4">Quản lý kho hàng</Typography>
    <Typography>Component quản lý kho hàng sẽ được phát triển sau...</Typography>
  </Paper>
);

const RevenueManagement = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h4">Quản lý doanh thu</Typography>
    <Typography>Component quản lý doanh thu sẽ được phát triển sau...</Typography>
  </Paper>
);

export default AdminDashboard;