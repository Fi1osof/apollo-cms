
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  // TableBody,
  TableCell,
  // TableFooter,
  TableHead,
  // TablePagination,
  TableRow,
  // TableSortLabel,
} from 'material-ui/Table';

import Checkbox from 'material-ui/Checkbox';
// import Tooltip from 'material-ui/Tooltip';

export default class EnhancedTableHead extends Component {

  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    // onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columnData: PropTypes.array.isRequired,
  }


  static defaultProps = {
  };

  // createSortHandler = property => event => {
  //   this.props.onRequestSort(event, property);
  // };

  render() {

    const {
      // onSelectAllClick, 
      order,
      orderBy,
      numSelected,
      rowCount,
      columnData,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              // onChange={onSelectAllClick}
            />
          </TableCell> */}
          {columnData.filter(n => n.hidden !== true).map(column => {

            const {
              id,
              key,
            } = column;

            return (
              <TableCell
                key={key || id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              // sortDirection={orderBy === column.id ? order : false}
              >
                {column.label}
                {/* <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    // onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip> */}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
