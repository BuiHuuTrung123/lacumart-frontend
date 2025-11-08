import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllOrder, fetchOrdersByUserAPI } from '~/redux/order/orderSlice'
import OrderHeader from '~/components/Client/OrderFollow/components/OrderHeader'
import OrderTabs from '~/components/Client/OrderFollow/components/OrderTabs'
import OrderCard from '~/components/Client/OrderFollow/components/OrderCard'
import EmptyOrder from '~/components/Client/OrderFollow/components/EmptyOrder'
import LoadMoreButton from '~/components/Client/OrderFollow/components/LoadMoreButton'

function OrderFollow() {
    const dispatch = useDispatch()
    const allOrders = useSelector(selectAllOrder)
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        dispatch(fetchOrdersByUserAPI())
    }, [dispatch])

    // Thêm kiểm tra an toàn
    const orders = Array.isArray(allOrders) ? allOrders : []
    const filteredOrders = orders.filter(order => {
        if (!order || !order.status) return false
        switch (activeTab) {
            case 0: return true
            case 1: return order.status === 'pending'
            case 2: return order.status === 'shipping'
            case 3: return order.status === 'completed'
            case 4: return order.status === 'cancelled'
            default: return true
        }
    })

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue)
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 1, sm: 2 } }}>
            <OrderHeader />
            <OrderTabs activeTab={activeTab} handleTabChange={handleTabChange} />
            
            {/* Orders List */}
            {filteredOrders.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredOrders.map((order) => (
                        <OrderCard key={order._id || order.id} order={order} />
                    ))}
                </Box>
            ) : (
                <EmptyOrder activeTab={activeTab} />
            )}

            {/* Load More Button */}
            {filteredOrders.length > 0 && <LoadMoreButton />}
        </Box>
    )
}

export default OrderFollow