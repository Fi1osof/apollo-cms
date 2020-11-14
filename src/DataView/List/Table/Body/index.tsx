import React, { useMemo } from 'react'
// import PropTypes from 'prop-types'

import { TableBody, TableCell, TableRow } from 'material-ui/Table'
import { TBodyProps } from './interfaces'

export * from './interfaces'

const TBody: React.FC<TBodyProps> = (props) => {
  const { data, columnData } = props

  const content = useMemo(() => {
    if (!columnData) {
      return null
    }

    const columns = columnData.filter((n) => n.hidden !== true)

    if (!columns.length) {
      return null
    }

    return (
      <TableBody>
        {data.map((n, index) => {
          const { id } = n

          return (
            <TableRow key={id || index} hover tabIndex={-1}>
              {columns.map((record, index2) => {
                const {
                  id: fieldName,
                  key,
                  // label,
                  disablePadding,
                  padding,
                  // numeric,
                  renderer,
                  ...other
                } = record

                const value =
                  fieldName && typeof fieldName === 'string'
                    ? n[fieldName]
                    : undefined

                return (
                  <TableCell
                    key={key ? key : id && typeof id === 'string' ? id : index2}
                    padding={disablePadding === true ? 'none' : padding}
                    {...other}
                  >
                    {value !== undefined && renderer
                      ? renderer(value, n)
                      : value || ''}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    )
  }, [columnData, data])

  return content
}

export default TBody
