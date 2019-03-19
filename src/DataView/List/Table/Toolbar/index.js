
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
// import FilterListIcon from 'material-ui-icons/FilterList';
import AddIcon from 'material-ui-icons/AddCircleOutline';

import { lighten } from 'material-ui/styles/colorManipulator';
import Grid from 'material-ui/Grid';

import ChoseColumns from "./ChoseColumns";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    alignItems: "flex-end",
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.dark,
        backgroundColor: lighten(theme.palette.secondary.light, 0.4),
      }
      : {
        color: lighten(theme.palette.secondary.light, 0.4),
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: "flex",
  },
  title: {
    flex: '0 0 auto',
  },
});


export class EnhancedTableToolbar extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    addObject: PropTypes.func,
    columnData: PropTypes.array.isRequired,
    toggleColumnVisibility: PropTypes.func.isRequired,
  }

  render() {

    const {
      numSelected,
      classes,
      title,
      addObject,
      filters,
      columnData,
      toggleColumnVisibility,
    } = this.props;


    let columns = [];

    if (title) {
      columns.push(<Grid
        key="title"
        item
      >
        <Typography type="title">
          {title}
        </Typography>
      </Grid>);
    }


    if (filters) {
      columns.push(<Grid
        key="filters"
        item
        xs
      >
        {filters}
      </Grid>);
    }
    else {
      columns.push(<Grid
        key="separator"
        item
        xs
      >
        {null}
      </Grid>);
    }

    if (columnData && columnData.length) {
      columns.push(<Grid
        key="ChoseColumns"
        item
      >
        <ChoseColumns
          columnData={columnData}
          toggleColumnVisibility={toggleColumnVisibility}
        />
      </Grid>);
    }




    if (addObject) {

      const {
        document,
      } = global;

      const {
        createRange,
      } = document || {}

      if (createRange) {

        /**
         * https://github.com/jsdom/jsdom/issues/317
         */

        columns.push(<Grid
          key="add"
          item
        >
          <Tooltip title="Добавить">
            <IconButton
              aria-label="AddPlace"
              onClick={addObject}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>);
      }

    }

    return (
      <Toolbar
        className={[classes.root, numSelected > 0 ? classes.highlight : null].join(" ")}
      >

        <Grid
          container
          alignItems="center"
        >

          {columns}

        </Grid>



      </Toolbar>
    );

  }
}




export default withStyles(toolbarStyles)(EnhancedTableToolbar);
