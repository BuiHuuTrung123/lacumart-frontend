// components/ShippingStep.jsx
import React from 'react'
import {
    Box,
    Typography,
    Grid,
    TextField
} from '@mui/material'
import AddressSelect from '~/components/Client/Checkout/components/AddressSelect'

const ShippingStep = ({ register, errors, watch, setValue }) => {
    const selectedCity = watch('city')
    const selectedDistrict = watch('district')

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Thông tin giao hàng
            </Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Thông tin người nhận
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        {...register('fullName', { required: 'Họ tên là bắt buộc' })}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        {...register('phone', { 
                            required: 'Số điện thoại là bắt buộc',
                            pattern: {
                                value: /^(0[3|5|7|8|9])+([0-9]{8})$/,
                                message: 'Số điện thoại không hợp lệ'
                            }
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        variant="outlined"
                    />
                </Grid>
                
                {/* Address Select Component */}
                <AddressSelect 
                    register={register}
                    errors={errors}
                    selectedCity={selectedCity}
                    selectedDistrict={selectedDistrict}
                    setValue={setValue}
                    
                />

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Địa chỉ cụ thể"
                        {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        variant="outlined"
                        multiline
                        rows={2}
                        placeholder="Số nhà, tên đường, tổ/khu phố..."
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ghi chú (tùy chọn)"
                        {...register('note')}
                        variant="outlined"
                        multiline
                        rows={2}
                        placeholder="Ghi chú về địa chỉ giao hàng..."
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ShippingStep