import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import ChoseColumnsIcon from 'material-ui-icons/MoreVert'

import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'

import ListItem from 'material-ui/List/ListItem'
import ListItemText from 'material-ui/List/ListItemText'
import Switch from 'material-ui/Switch'
import {
  TableViewChoseColumnsProps,
  TableViewChoseColumnsState,
} from './interfaces'

export class TableViewChoseColumns extends Component<
  TableViewChoseColumnsProps,
  TableViewChoseColumnsState
> {
  // static propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   columnData: PropTypes.array.isRequired,
  //   toggleColumnVisibility: PropTypes.func.isRequired,
  // }

  state: TableViewChoseColumnsState = {
    anchorEl: undefined,
  }

  handleClick = (event: React.MouseEvent): void => {
    this.setState({ anchorEl: event.currentTarget as HTMLElement })
  }

  handleClose = (): void => {
    this.setState({ anchorEl: undefined })
  }

  toggleColumnVisibility = (event: React.MouseEvent): void => {
    const { toggleColumnVisibility } = this.props

    const index = parseInt(
      event.currentTarget.attributes.getNamedItem('value')?.value || '',
      10
    )
    const checked: boolean =
      event.currentTarget.attributes.getNamedItem('aria-checked')?.value ===
      'true'

    if (isNaN(index)) {
      return
    }

    return toggleColumnVisibility(event, !checked, index)
  }

  render(): JSX.Element | null {
    const { columnData } = this.props

    if (!columnData || !columnData.length) {
      return null
    }

    const ITEM_HEIGHT = 48

    const { anchorEl } = this.state

    const columns: JSX.Element[] = []

    columnData.map((n, index) => {
      const { id, label, description, hidden } = n

      if (hidden === undefined) {
        return
      }

      const textPrimary = label || id

      const checked = hidden === true ? false : true

      columns.push(
        <ListItem
          key={index}
          dense
          button
          aria-checked={checked}
          value={index}
          // onClick={(event) => toggleColumnVisibility(event, !checked, index)}
          onClick={this.toggleColumnVisibility}
        >
          <Switch checked={checked} />
          <ListItemText primary={textPrimary} secondary={description} />
        </ListItem>
      )
    })

    if (!columns || !columns.length) {
      return null
    }

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <ChoseColumnsIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              minWidth: 200,
              maxWidth: 350,
            },
          }}
        >
          {columns}
        </Menu>
      </div>
    )
  }
}

export default TableViewChoseColumns
