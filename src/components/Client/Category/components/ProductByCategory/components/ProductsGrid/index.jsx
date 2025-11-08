import React from 'react'
import { Grid, Box, Pagination } from '@mui/material'
import ProductCard from '~/components/Client/Item/components/ProductListByCategory/components/ProductCard'

const ProductsGrid = ({ products, onProductClick, onAddToCart, onQuickBuy, onFavoriteClick, page, totalPages, onPageChange }) => {
    return (
        <>
            <Grid key="products-grid" container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={`product-${product._id}`}>
                        <ProductCard
                            product={product}
                            onProductClick={onProductClick}
                            onAddToCart={onAddToCart}
                            onQuickBuy={onQuickBuy}
                            onFavoriteClick={onFavoriteClick}
                        />
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box key="pagination" sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => onPageChange(value)}
                        color="primary"
                        size="large"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderRadius: 3,
                                fontWeight: 'bold',
                                '&.Mui-selected': {
                                    background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                                    color: 'white',
                                    boxShadow: '0 4px 15px rgba(255,87,34,0.3)'
                                }
                            }
                        }}
                    />
                </Box>
            )}
        </>
    )
}

export default ProductsGrid