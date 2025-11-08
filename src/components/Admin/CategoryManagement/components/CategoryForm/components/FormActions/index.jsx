// src/components/Admin/CategoryManagement/components/CategoryForm/FormActions.jsx
import React from 'react'
import { DialogActions, Button, CircularProgress } from '@mui/material'

const FormActions = ({
  isEditMode,
  isSubmitting,
  canSubmit,
  submitButtonText,
  onDeleteClick,
  onClose
}) => {
  return (
    <DialogActions sx={{ p: 3, background: 'rgba(25, 118, 210, 0.05)' }}>
      {isEditMode && (
        <Button
          onClick={onDeleteClick}
          variant="outlined"
          color="error"
          disabled={isSubmitting}
          sx={{
            borderRadius: 2, 
            px: 3, 
            py: 1, 
            fontWeight: 700,
            mr: 'auto'
          }}
        >
          XÓA
        </Button>
      )}

      <Button 
        onClick={onClose} 
        variant="outlined" 
        disabled={isSubmitting}
        sx={{
          borderRadius: 2, 
          px: 4, 
          py: 1, 
          fontWeight: 700, 
          borderColor: '#1976d2', 
          color: '#1976d2',
          '&:hover': { 
            backgroundColor: 'rgba(25, 118, 210, 0.1)', 
            borderColor: '#1565c0' 
          }
        }}
      >
        HỦY BỎ
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={!canSubmit}
        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{
          borderRadius: 2, 
          px: 4, 
          py: 1, 
          fontWeight: 700,
          background: isEditMode ?
            'linear-gradient(135deg, #ed6c02, #ff9800)' :
            'linear-gradient(135deg, #1976d2, #42a5f5)',
          '&:hover': {
            background: isEditMode ?
              'linear-gradient(135deg, #d45a00, #ed6c02)' :
              'linear-gradient(135deg, #1565c0, #1976d2)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.3s ease',
          '&:disabled': { 
            background: '#ccc', 
            transform: 'none' 
          }
        }}
      >
        {submitButtonText} {isEditMode ? '✏️' : '📁'}
      </Button>
    </DialogActions>
  )
}

export default FormActions