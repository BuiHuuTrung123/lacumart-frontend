import React from 'react'
import { Paper, Tabs, Tab } from '@mui/material'

function OrderTabs({ activeTab, handleTabChange }) {
    return (
        <Paper
            sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}
        >
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    '& .MuiTab-root': {
                        py: 2,
                        fontSize: '0.875rem',
                        fontWeight: '400',
                        color: 'text.secondary',
                        minWidth: 'auto',
                        px: 3,
                        '&.Mui-selected': {
                            color: '#ee4d2d',
                            fontWeight: '500'
                        }
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#ee4d2d',
                        height: 2
                    }
                }}
            >
                <Tab label="Tất cả" />
                <Tab label="Chờ xác nhận" />
                <Tab label="Đang giao" />
                <Tab label="Đã giao" />
                <Tab label="Đã hủy" />
            </Tabs>
        </Paper>
    )
}

export default OrderTabs