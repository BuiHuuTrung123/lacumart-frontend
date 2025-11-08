// src/components/Admin/CategoryManagement/components/TableHeaderRow.jsx
import React from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'

const TableHeaderRow = () => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#f8fafc' }}>
        <TableCell sx={{ fontWeight: 700, fontSize: '1rem', py: 2 }}>Danh mục</TableCell>
        <TableCell sx={{ fontWeight: 700, fontSize: '1rem', py: 2 }}>Mô tả</TableCell>
        <TableCell sx={{ fontWeight: 700, fontSize: '1rem', py: 2 }}>Thứ tự hiển thị</TableCell>
        <TableCell sx={{ fontWeight: 700, fontSize: '1rem', py: 2 }}>Trạng thái</TableCell>
        <TableCell align="center" sx={{ fontWeight: 700, fontSize: '1rem', py: 2 }}>Thao tác</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
