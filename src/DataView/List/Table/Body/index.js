import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  TableBody,
  TableCell,
  TableRow,
} from 'material-ui/Table';

export default class TBody extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    columnData: PropTypes.array.isRequired,
  }

  render() {

    const {
      data,
      columnData,
    } = this.props;


    return (
      <TableBody>
        {data.map((n) => {

          const {
            id,
          } = n;

          const columns = columnData.filter(n => n.hidden !== true).map((record, index) => {

            const {
              id: fieldName,
              label,
              disablePadding,
              padding,
              numeric,
              renderer,
              ...other
            } = record;

            const value = n[fieldName];

            return <TableCell
              key={index}
              padding={disablePadding === true ? "none" : padding}
              {...other}
            >
              {renderer ? renderer(value, n) : value || ""}
            </TableCell>

          });

          return (
            <TableRow
              key={id}
              hover
              tabIndex={-1}
            >

              {columns}

            </TableRow>
          );
        })}
      </TableBody>
    )
  }
}
