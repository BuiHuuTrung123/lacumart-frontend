// src/components/Admin/ProductManagement/components/TableHeaderRow.jsx
import React from 'react'
import { TableRow, TableCell } from '@mui/material'

const TableHeaderRow = () => {
  return (
    <TableRow>
      <TableCell>Sản phẩm</TableCell>
      <TableCell>Danh mục</TableCell>
      <TableCell>Thương hiệu</TableCell>
      <TableCell>Giá</TableCell>
      <TableCell>Tồn kho</TableCell>
      <TableCell>Trạng thái</TableCell>
      <TableCell align="center">Thao tác</TableCell>
    </TableRow>
  )
}

export default TableHeaderRow