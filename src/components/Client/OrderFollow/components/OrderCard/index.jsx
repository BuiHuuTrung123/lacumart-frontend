import React from 'react'
import { Card, CardContent, Box, Typography, Chip } from '@mui/material'
import { Store } from '@mui/icons-material'
import OrderItem from '~/components/Client/OrderFollow/components/OrderItem'
import OrderActions from '~/components/Client/OrderFollow/components/OrderActions'

function OrderCard({ order }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success'
            case 'pending': return 'warning'
            case 'shipping': return 'primary'
            case 'cancelled': return 'error'
            default: return 'default'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Thành công'
            case 'pending': return 'Chờ xác nhận'
            case 'shipping': return 'Đang giao'
            case 'cancelled': return 'Đã hủy'
            default: return 'Chờ xử lý'
        }
    }

    const formatCurrency = (amount) => {
        if (!amount) return '0 ₫'
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('vi-VN')
        } catch {
            return ''
        }
    }

    return (
        <Card
            sx={{
                borderRadius: 2,
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                border: '1px solid',
                borderColor: 'grey.200',
                overflow: 'visible'
            }}
        >
            <CardContent sx={{ p: 2 }}>
                {/* Order Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'grey.100'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Store sx={{ fontSize: 16, color: 'grey.600' }} />
                        <Typography variant="body2" fontWeight="500">
                            {order.orderCode || 'Mã đơn hàng'}
                        </Typography>
                        <Chip
                            label={getStatusText(order.status)}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{
                                height: 20,
                                fontSize: '0.7rem',
                                fontWeight: '400'
                            }}
                        />
                    </Box>
                    <Typography variant="body2" color="grey.600">
                        {formatDate(order.createdAt?.$date || order.createdAt)}
                    </Typography>
                </Box>

                {/* Order Items */}
                <Box sx={{ mb: 2 }}>
                    {order.items?.slice(0, 2).map((item, index) => (
                        <OrderItem 
                            key={index} 
                            item={item} 
                            index={index} 
                            totalItems={order.items.length} 
                        />
                    ))}

                    {order.items && order.items.length > 2 && (
                        <Typography variant="caption" color="grey.600" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
                            ...và {order.items.length - 2} sản phẩm khác
                        </Typography>
                    )}
                </Box>

                {/* Order Summary */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'grey.100'
                }}>
                    <Typography variant="body2" color="grey.600">
                        Thành tiền:
                    </Typography>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="#ee4d2d" fontWeight="bold">
                            {formatCurrency(order.total)}
                        </Typography>
                        <Typography variant="caption" color="grey.600">
                            (Đã bao gồm VAT nếu có)
                        </Typography>
                    </Box>
                </Box>

                {/* Action Buttons */}
                <OrderActions status={order.status} />
            </CardContent>
        </Card>
    )
}

export default OrderCard