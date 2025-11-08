import React from 'react'
import { Box, Typography, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const FiltersAndSort = ({ uniqueBrands, selectedBrands, onBrandFilter, sortBy, onSortChange }) => {
    return (
        <Box 
            sx={{ 
                mb: 6, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flexWrap: 'wrap', 
                gap: 3,
                p: 3,
                bgcolor: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
        >
            {uniqueBrands.length > 0 && (
                <Box key="brand-filter" sx={{ flex: 1, minWidth: 300 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                        🔍 Thương hiệu
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {uniqueBrands.map(brand => (
                            <Chip
                                key={`brand-${brand}`}
                                label={brand}
                                clickable
                                color={selectedBrands.includes(brand) ? 'primary' : 'default'}
                                onClick={() => onBrandFilter(brand)}
                                variant={selectedBrands.includes(brand) ? 'filled' : 'outlined'}
                                sx={{
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <Box key="sort-filter" sx={{ minWidth: 250 }}>
                <FormControl fullWidth size="medium">
                    <InputLabel>📊 Sắp xếp</InputLabel>
                    <Select
                        value={sortBy}
                        onChange={onSortChange}
                        label="📊 Sắp xếp"
                        sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e0e0e0'
                            }
                        }}
                    >
                        <MenuItem key="sort-name" value="name">🔄 Tên A-Z</MenuItem>
                        <MenuItem key="sort-price-low" value="price-low">💰 Giá: Thấp đến Cao</MenuItem>
                        <MenuItem key="sort-price-high" value="price-high">💎 Giá: Cao đến Thấp</MenuItem>
                        <MenuItem key="sort-rating" value="rating">⭐ Đánh giá cao nhất</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default FiltersAndSort