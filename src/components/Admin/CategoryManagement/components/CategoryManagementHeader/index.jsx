// src/components/Admin/CategoryManagement/components/CategoryManagementHeader.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const CategoryManagementHeader = ({ onAddCategory }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Quản lý danh mục
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onAddCategory}
        sx={{
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#1565c0' },
          borderRadius: 2,
          px: 3,
          py: 1,
          fontWeight: 600
        }}
      >
        Thêm danh mục
      </Button>
    </Box>
  );
};

export default CategoryManagementHeader;