
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import AddIcon from 'material-ui-icons/AddCircleOutline';

import { lighten } from 'material-ui/styles/colorManipulator';
import { Grid } from 'material-ui';

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
  }

  render() {

    const {
      numSelected,
      classes,
      title,
      addObject,
      filters,
    } = this.props;

    return (
      <Toolbar
        className={[classes.root, numSelected > 0 ? classes.highlight : null].join(" ")}
      >

        <Grid
          container
          alignItems="center"
        >

          <Grid
            item
          >
            {numSelected > 0 ? (
              <Typography type="subheading">{numSelected} selected</Typography>
            ) : (
                <Typography type="title">
                  {title}
                </Typography>
              )}

          </Grid>

          <Grid
            item
            xs
          >
            {filters}

          </Grid>


          <Grid
            item
          >

            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
                // <Tooltip title="Filter list">
                //   <IconButton aria-label="Filter list">
                //     <FilterListIcon />
                //   </IconButton>
                // </Tooltip>
                null
              )}
            {addObject ? <Tooltip title="Добавить">
              <IconButton
                aria-label="AddPlace"
                onClick={addObject}
              >
                <AddIcon />
              </IconButton>
            </Tooltip> : null}
          </Grid>

        </Grid>




      </Toolbar>
    );

  }
}




export default withStyles(toolbarStyles)(EnhancedTableToolbar);
