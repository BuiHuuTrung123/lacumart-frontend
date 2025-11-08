import React from 'react'
import {
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material'

// FormActions.jsx - TẠM THỜI BỎ VALIDATION
const FormActions = ({ 
  onClose, 
  isSubmitting, 
  hasImages, 
  isEdit 
}) => {

  
  return (
    <DialogActions sx={{ p: 3, background: 'rgba(255, 87, 34, 0.05)' }}>
      {/* ... Cancel button ... */}
      
      <Button 
        type="submit" 
        variant="contained" 
        disabled={isSubmitting} // 🎯 TẠM BỎ !hasImages ĐỂ TEST
        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{
          borderRadius: 2, 
          px: 4, 
          py: 1, 
          fontWeight: 700, 
          background: 'linear-gradient(135deg, #ff5722, #ff8c42)',
          '&:hover': { 
            background: 'linear-gradient(135deg, #e65100, #ff5722)', 
            transform: 'translateY(-2px)' 
          },
          transition: 'all 0.3s ease', 
          '&:disabled': { 
            background: '#ccc', 
            transform: 'none' 
          }
        }}
      >
        {isSubmitting ? 'ĐANG XỬ LÝ...' : (isEdit ? 'CẬP NHẬT' : 'THÊM MỚI')} 💪
      </Button>
    </DialogActions>
  )
}

export default FormActions