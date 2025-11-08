// components/ConfirmationStep.jsx
import React from 'react'
import {
    Box,
    Typography,
    Card,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import { LocalShipping, AccountBalance } from '@mui/icons-material'

const VIETNAM_LOCATIONS = {
    cities: [
        { code: '01', name: 'Thành phố Hà Nội' },
        { code: '79', name: 'Thành phố Hồ Chí Minh' },
        { code: '48', name: 'Thành phố Đà Nẵng' }
    ],
    districts: {
        '01': [
            { code: '001', name: 'Quận Ba Đình' },
            { code: '005', name: 'Quận Cầu Giấy' }
        ],
        '79': [
            { code: '760', name: 'Quận 1' },
            { code: '764', name: 'Quận Gò Vấp' }
        ]
    },
    wards: {
        '001': [
            { code: '00001', name: 'Phường Phúc Xá' },
            { code: '00007', name: 'Phường Cống Vị' }
        ],
        '760': [
            { code: '26701', name: 'Phường Tân Định' },
            { code: '26704', name: 'Phường Đa Kao' }
        ]
    }
}

const ConfirmationStep = ({ watch, paymentMethod, cartItems, agreeTerms, setValue }) => {
    const formData = watch()
    const selectedCityObj = VIETNAM_LOCATIONS.cities.find(city => city.code === formData.city)
    const selectedDistrictObj = selectedCityObj && VIETNAM_LOCATIONS.districts[formData.city]?.find(d => d.code === formData.district)
    const selectedWardObj = selectedDistrictObj && VIETNAM_LOCATIONS.wards[formData.district]?.find(w => w.code === formData.ward)

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Xác nhận đơn hàng
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Địa chỉ giao hàng
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {formData.fullName} | {formData.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formData.address}, {selectedWardObj?.name}, {selectedDistrictObj?.name}, {selectedCityObj?.name}
                </Typography>
                {formData.note && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Ghi chú: {formData.note}
                    </Typography>
                )}
            </Card>

            <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Phương thức thanh toán
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {paymentMethod === 'banking' ? (
                        <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />
                    ) : (
                        <LocalShipping sx={{ mr: 2, color: 'primary.main' }} />
                    )}
                    <Typography variant="body1">
                        {paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' : 'Thanh toán khi nhận hàng (COD)'}
                    </Typography>
                </Box>
            </Card>

            <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Sản phẩm đã đặt ({cartItems.length})
                </Typography>
                {cartItems.map((item) => (
                    <Box key={item.productId} sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                        <img 
                            src={item.images} 
                            alt={item.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: 16 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" fontWeight="medium">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Số lượng: {item.quantity} × {item.price.toLocaleString('vi-VN')}₫
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="bold" color="primary">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </Typography>
                    </Box>
                ))}
            </Card>

            <FormControlLabel
                control={
                    <Checkbox 
                        checked={agreeTerms} 
                        onChange={(e) => setValue('agreeTerms', e.target.checked)}
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body2">
                        Tôi đồng ý với <span style={{ color: '#1976d2', cursor: 'pointer' }}>điều khoản và điều kiện</span> của LACU MART
                    </Typography>
                }
                sx={{ mt: 3 }}
            />
        </Box>
    )
}

export default ConfirmationStep