import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DownloadIcon from 'material-ui-icons/CloudDownload';
import { IconButton } from 'material-ui';
 
import { withStyles } from 'material-ui';

import moment from "moment";

// export const styles = theme => {

//   console.log("theme", theme);

//   const {
//     palette: {
//       action,
//     },
//   } = theme;

//   return {
//     link: {
//       color: action.active,
//       "&:hover": {
//         color: action.hover,
//       },
//     },
//   }
// }

export class ExportToExcel extends Component {

  static propTypes = {
    // classes: PropTypes.object.isRequired,
    table: PropTypes.instanceOf(HTMLTableElement).isRequired,
    format: PropTypes.oneOf(["csv", "xls", "xlsx"]).isRequired,
    filename: PropTypes.string.isRequired,
    columnData: PropTypes.array.isRequired,
    sheetName: PropTypes.string.isRequired,
    includeHeaders: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    format: "xlsx",
    filename: "Export",
    sheetName: "Sheet 1",
    includeHeaders: true,
  }


  exportTable(event) {

    const ExcellentExport = require('excellentexport');

    let {
      table,
      filename,
      format,
      sheetName,
      includeHeaders,
    } = this.props;



    const anchor = event.currentTarget;

    filename += `_${moment().format('DD.MM.YYYY-HH:mm:ss')}`;

    // console.log("exportExcel event", { ...event });

    // console.log("exportExcel anchor", anchor);


    // console.log("exportExcel table", table);

    const options = {
      // anchor: 'anchor',
      anchor,
      filename,
      format,
      sheetName,
    };

    let sheets = [];

    let data = [];

    let rows = [];

    if (includeHeaders) {

      let theadRows = table.querySelector("thead").children;

      for (let item of theadRows) {
        rows.push(item);
      }

    }

    // rows = rows.concat(table.querySelector("tbody").children);

    const tbodyRows = table.querySelector("tbody").children;

    for (let row of tbodyRows) {
      rows.push(row);
    }

    // const table2 = window.document.querySelector("table");

    // console.log("table", table);
    // console.log("table2", table2);

    // console.log("table === table2", table === table2);



    // console.log("table rows", rows, { ...rows });

    rows.map(row => {

      let values = [];

      // console.log("cols parent", row, { ...row });


      const cols = row.children;

      // console.log("cols", cols);

      for (let col of cols) {

        values.push(col ? col.textContent : "");

      }


      data.push(values);

    });

    // if (format === "csv") {

    sheets = [
      {
        name: sheetName,
        from: {
          // array: [
          //   [1, 2, 3],
          //   ['hello', '2200', 'bye'],
          //   ['quo"te', 'dobl"e qu"ote', 'singl\'e quote']
          // ]
          array: data,
        }
      }

    ];

    // console.log("data", data);

    // return false;

    const workbook = ExcellentExport.convert(options, sheets);

    // console.log(workbook, 'Result must not be null');



    // const anchor = document.getElementById('datatable');
    // const anchor = document.getElementById('datatable');
    // console.log(anchor.href, 'Element must have href');
    // console.log(anchor.href.indexOf('blob:') === 0, 'Element href myst be a blob:');

    return workbook;

  }

  render() {

    const {
      columnData,
      filename,
      format,
      table,
      sheetName,
      includeHeaders,
      // classes,
      ...other
    } = this.props;

    if (!table) {
      return;
    }

    return (
      <IconButton
        href="javascript:;"
        component="a"
        // download={`${filename}.${format}`}
        onClick={event => this.exportTable(event)}
        // className={classes.link}
        {...other}
      >
        <DownloadIcon />
      </IconButton>
    );
  }
}

export default ExportToExcel;

// export default withStyles(styles)(props => <ExportToExcel
//   {...props}
// />);