import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Theme, withStyles } from 'material-ui/styles'

import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import AddIcon from 'material-ui-icons/AddCircleOutline'

import { lighten } from 'material-ui/styles/colorManipulator'
import Grid from 'material-ui/Grid'

import ChoseColumns from './ChoseColumns'
import { ToolbarProps } from './interfaces'

const toolbarStyles = (theme: Theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
    alignItems: 'flex-end',
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
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
})

export class EnhancedTableToolbar extends Component<ToolbarProps> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    addObject: PropTypes.func,
    columnData: PropTypes.array.isRequired,
    toggleColumnVisibility: PropTypes.func.isRequired,
  }

  render(): JSX.Element {
    const {
      // numSelected,
      classes,
      title,
      addObject,
      filters,
      columnData,
      toggleColumnVisibility,
    } = this.props

    const columns = []

    if (title) {
      columns.push(
        <Grid key="title" item>
          <Typography variant="title">{title}</Typography>
        </Grid>
      )
    }

    if (filters) {
      columns.push(
        <Grid key="filters" item xs>
          {filters}
        </Grid>
      )
    } else {
      columns.push(
        <Grid key="separator" item xs>
          {null}
        </Grid>
      )
    }

    if (columnData && columnData.length) {
      columns.push(
        <Grid key="ChoseColumns" item>
          <ChoseColumns
            columnData={columnData}
            toggleColumnVisibility={toggleColumnVisibility}
          />
        </Grid>
      )
    }

    if (addObject) {
      // if (global.document.createRange) {
      /**
       * https://github.com/jsdom/jsdom/issues/317
       */

      columns.push(
        <Grid key="add" item>
          <Tooltip title="Добавить">
            <IconButton aria-label="AddPlace" onClick={addObject}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      )
      // }
    }

    return (
      <Toolbar className={classes?.root}>
        <Grid container alignItems="center">
          {columns}
        </Grid>
      </Toolbar>
    )
  }
}

export default withStyles(toolbarStyles)((props: ToolbarProps) => (
  <EnhancedTableToolbar {...props} />
))
