import React from 'react'
import {
  Box,
  Card,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import { Star } from '@mui/icons-material'

const ProductDescriptionTabs = ({ product, tabValue, onTabChange }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontSize: '1rem',
              fontWeight: 'bold',
            }
          }}
        >
          <Tab label="Mô tả sản phẩm" />
          <Tab label="Thông số kỹ thuật" />
          <Tab label="Đánh giá (124)" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ color: '#1a202c', mb: 3 }}>
                Chi tiết sản phẩm
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                {product.description}
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  🎯 Đặc điểm nổi bật:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Star sx={{ color: '#ff5722', fontSize: '1.2rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Chất lượng cao cấp, đảm bảo an toàn" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Star sx={{ color: '#ff5722', fontSize: '1.2rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Hiệu quả vượt trội, kết quả nhanh chóng" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Star sx={{ color: '#ff5722', fontSize: '1.2rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Được ưa chuộng và tin dùng" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Thông số kỹ thuật
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Tên sản phẩm" secondary={product.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Thương hiệu" secondary={product.brand} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Định lượng" secondary={product.quantification} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Danh mục" secondary={product.mainCategory} />
                </ListItem>
              </List>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Đánh giá từ khách hàng
              </Typography>
              <Typography color="text.secondary">
                Tính năng đánh giá đang được phát triển...
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  )
}

export default ProductDescriptionTabs