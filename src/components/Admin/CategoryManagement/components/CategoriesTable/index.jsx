// src/components/Admin/CategoryManagement/components/CategoriesTable.jsx
import React from 'react'
import { TableContainer, Paper, Table, TableBody } from '@mui/material'

import TableHeaderRow from '~/components/Admin/CategoryManagement/components/CategoriesTable/components/TableHeaderRow'
import CategoryTableRow from '~/components/Admin/CategoryManagement/components/CategoriesTable/components/CategoryTableRow'
import EmptyTableState from '~/components/Admin/CategoryManagement/components/CategoriesTable/components/EmptyTableState'

const CategoriesTable = ({ categories, onEditCategory, onDeleteCategory }) => {
  return (
    <TableContainer 
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHeaderRow />
        <TableBody>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <CategoryTableRow
                key={category._id}
                category={category}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
              />
            ))
          ) : (
            <EmptyTableState onAddCategory={onEditCategory} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoriesTable