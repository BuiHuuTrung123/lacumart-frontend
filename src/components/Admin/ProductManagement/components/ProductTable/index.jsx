// src/components/Admin/ProductManagement/components/ProductTable.jsx
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'

import ProductTableRow from '~/components/Admin/ProductManagement/components/ProductTable/components/ProductTableRow'
import TableHeaderRow from '~/components/Admin/ProductManagement/components/TableHeaderRow'

const ProductTable = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableHeaderRow />
        </TableHead>
        <TableBody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductTableRow
                key={product._id}
                product={product}
                onEdit={onEditProduct}
                onDelete={onDeleteProduct}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                <Typography variant="body1" color="textSecondary">
                  Không có sản phẩm nào
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable