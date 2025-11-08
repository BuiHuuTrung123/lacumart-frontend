// components/PaymentStep.jsx
import React from 'react'
import {
    Box,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
    Alert
} from '@mui/material'
import { LocalShipping, AccountBalance } from '@mui/icons-material'

const PaymentStep = ({ paymentMethod, setValue }) => {
    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Phương thức thanh toán
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setValue('paymentMethod', e.target.value)}
                >
                    {/* COD */}
                    <Card sx={{ p: 3, mb: 2, border: '2px solid', borderColor: paymentMethod === 'cod' ? 'primary.main' : 'transparent' }}>
                        <FormControlLabel
                            value="cod"
                            control={<Radio />}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocalShipping sx={{ mr: 2, color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Thanh toán khi nhận hàng (COD)
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Thanh toán bằng tiền mặt khi nhận được hàng
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                            sx={{ width: '100%', m: 0 }}
                        />
                    </Card>

                    {/* Bank Transfer */}
                    <Card sx={{ p: 3, border: '2px solid', borderColor: paymentMethod === 'banking' ? 'primary.main' : 'transparent' }}>
                        <FormControlLabel
                            value="banking"
                            control={<Radio />}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Chuyển khoản ngân hàng
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Chuyển khoản đến tài khoản ngân hàng của chúng tôi
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                            sx={{ width: '100%', m: 0 }}
                        />
                    </Card>
                </RadioGroup>
            </FormControl>

            <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                    {paymentMethod === 'banking' 
                        ? 'Sau khi đặt hàng, bạn sẽ được chuyển hướng đến trang xác nhận với thông tin chuyển khoản chi tiết.'
                        : 'Bạn sẽ thanh toán khi nhận được hàng. Nhân viên giao hàng sẽ liên hệ trước khi đến.'
                    }
                </Typography>
            </Alert>
        </Box>
    )
}

export default PaymentStep