// src/components/Admin/ProductManagement/components/DeleteConfirmationDialog.jsx
import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <Typography>Bạn có chắc chắn muốn xóa sản phẩm này?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmationDialog