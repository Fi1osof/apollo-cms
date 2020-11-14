import React, { useMemo } from 'react'

import { TableCell, TableHead, TableRow } from 'material-ui/Table'
import { TableHeaderProps } from './interfaces'

export * from './interfaces'

const EnhancedTableHead: React.FC<TableHeaderProps> = (props) => {
  const { columnData } = props

  const content = useMemo(() => {
    if (!columnData) {
      return null
    }

    const columns = columnData.filter((n) => n.hidden !== true)

    if (!columns.length) {
      return null
    }

    return (
      <TableHead>
        <TableRow>
          {columns.map((column, index) => {
            const { id, key } = column

            return (
              <TableCell
                key={key ? key : id && typeof id === 'string' ? id : index}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                {column.label}
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }, [columnData])

  return content
}

export default EnhancedTableHead
