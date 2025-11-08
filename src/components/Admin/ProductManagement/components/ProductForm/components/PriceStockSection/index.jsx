import React from 'react'
import { Controller } from 'react-hook-form'
import {
  Grid,
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment
} from '@mui/material'
import { AttachMoney, Numbers } from '@mui/icons-material'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { 
  VALIDATION_MESSAGES,
   
} from '~/constants/productForm'
import { handleNumberInput,validatePrice } from '~/utils/validators/productValidator'

const PriceStockSection = ({
  control,
  errors,
  watchPriceOriginal,
  watchPriceCurrent,
  watchStockQuantity
}) => {
  const priceError = validatePrice(watchPriceCurrent, watchPriceOriginal)

  return (
    <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <AttachMoney sx={{ color: '#ff5722', fontSize: 28 }} />
        <Typography variant="h5" fontWeight={700}>GIÁ CẢ & TỒN KHO</Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Original Price */}
        <Grid item xs={12} md={4}>
          <Controller
            name="price.original"
            control={control}
            rules={{ required: VALIDATION_MESSAGES.PRICE_REQUIRED }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Giá gốc *"
                error={!!errors.price?.original}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₫</InputAdornment>
                  ),
                  inputMode: 'decimal'
                }}
                onChange={(e) => handleNumberInput(field, e.target.value)}
                placeholder="0"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              />
            )}
          />
          <FieldErrorAlert errors={errors} fieldName="price.original" />
        </Grid>

        {/* Current Price */}
        <Grid item xs={12} md={4}>
          <Controller
            name="price.current"
            control={control}
            rules={{ required: VALIDATION_MESSAGES.PRICE_REQUIRED }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Giá bán *"
                error={!!errors.price?.current}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₫</InputAdornment>
                  ),
                  inputMode: 'decimal'
                }}
                onChange={(e) => handleNumberInput(field, e.target.value)}
                placeholder="0"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              />
            )}
          />
          <FieldErrorAlert errors={errors} fieldName="price.current" />
          {priceError && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
              {priceError}
            </Typography>
          )}
        </Grid>

        {/* Stock Quantity */}
        <Grid item xs={12} md={4}>
          <Controller
            name="stock.quantity"
            control={control}
            rules={{ required: VALIDATION_MESSAGES.STOCK_REQUIRED }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Số lượng tồn kho *"
                error={!!errors.stock?.quantity}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Numbers sx={{ color: '#ff5722' }} />
                    </InputAdornment>
                  ),
                  inputMode: 'numeric'
                }}
                onChange={(e) => handleNumberInput(field, e.target.value, true)}
                placeholder="0"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              />
            )}
          />
          <FieldErrorAlert errors={errors} fieldName="stock.quantity" />
          {watchStockQuantity && (
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
              Số lượng: {parseInt(watchStockQuantity) || 0}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PriceStockSection