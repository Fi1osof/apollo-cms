import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChoseColumnsIcon from 'material-ui-icons/MoreVert';

import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';

import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import Switch from 'material-ui/Switch';
import withStyles from 'material-ui/styles/withStyles';


export const styles = {

  root: {

  },
}

export class TableViewChoseColumns extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    columnData: PropTypes.array.isRequired,
    toggleColumnVisibility: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  };


  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {

    const {
      classes,
      columnData,
      toggleColumnVisibility,
    } = this.props;

    if (!columnData || !columnData.length) {
      return null;
    }

    const ITEM_HEIGHT = 48;

    const { anchorEl } = this.state;

    let columns = [];

    columnData.map((n, index) => {

      const {
        id,
        label,
        description,
        hidden,
      } = n;


      if (hidden === undefined) {
        return;
      }

      const textPrimary = label || id;

      const checked = hidden === true ? false : true;

      columns.push(<ListItem
        key={index}
        dense
        button
        onClick={(event) => toggleColumnVisibility(event, !checked, index)}
      >
        {/* <ListItemIcon>
          <WifiIcon />
        </ListItemIcon> */}
        <Switch
          // onChange={(event, checked) => toggleColumnVisibility(event, checked, index)}
          checked={checked}
        />
        <ListItemText
          primary={textPrimary}
          secondary={description}
        />

      </ListItem>);

    })

    if (!columns || !columns.length) {
      return null;
    }


    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
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
          {/* <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
              {option}
            </MenuItem> */}

          {columns}
        </Menu>
      </div>
    );

    return (
      <Tooltip title="Выбрать колонки">
        <IconButton
        // aria-label="AddPlace"
        // onClick={addObject}
        >
          <ChoseColumnsIcon />
        </IconButton>
      </Tooltip>
    );
  }
}


export default withStyles(styles)(props => <TableViewChoseColumns
  {...props}
/>);