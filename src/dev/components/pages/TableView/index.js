import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import Button from "material-ui/Button";

import {
  styles,
  TableView,
} from "../../../../DataView/List/Table";

import withStyles from 'material-ui/styles/withStyles'




export const edges = [
  {
    "node": {
      "id": "cjn27lkhv08sp0950dcfp61c3",
      "username": "Test",
      "fullname": "",
      "image": null,
      "sudo": false,
      "email": "test@localhost",
      "__typename": "User"
    },
    "__typename": "UserEdge"
  },
  {
    "node": {
      "id": "cjn29andg08zb0950gba9l3yo",
      "username": "test",
      "fullname": null,
      "image": null,
      "sudo": false,
      "__typename": "User"
    },
    "__typename": "UserEdge"
  },
];

export const count = edges.length;

export const limit = 1;

export const data = {
  "variables": {
    "first": 10,
    "skip": 0,
    "orderBy": "username_ASC",
    "where": null
  },
  "loading": false,
  "networkStatus": 7,
  // "objectsConnection": {
  //   "pageInfo": {
  //     "hasNextPage": false,
  //     "hasPreviousPage": false,
  //     "startCursor": "cjn27lkhv08sp0950dcfp61c3",
  //     "endCursor": "cjn29b63508zn09504gf24kde",
  //     "__typename": "PageInfo"
  //   },
  //   "aggregate": {
  //     "count": count,
  //     "__typename": "AggregateUser"
  //   },
  //   "edges": edges,
  //   "__typename": "UserConnection"
  // },
  "objects": edges.map(({ node }) => node),
};



export class DevTableView extends TableView {


  static defaultProps = {
    ...TableView.defaultProps,
    data,
    title: "Test",
    limit,

  }



  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      columnData: [
        {
          id: "id",
          key: "id",
          label: "ID",
          hidden: true,
        },
        {
          id: "username",
          key: "username",
          label: "Username",
          description: "Unique username",
          hidden: false,
          renderer: (value) => {
            return <span
              className="username"
            >
              {value}
            </span>
          },
        },
        {
          id: "email",
          key: "email",
          label: "Email",
          hidden: false,
          renderer: (value) => {
            return value ? <a
              href={`mailto:${value}`}
            >
              {value}
            </a> : null
          },
        },
      ],
    };
  }


  renderFilters() {

    const {
      // getFilters,
      // setFilters,
      // cleanFilters,
    } = this.props;


    const {
      query,
      advantages_not,
      with_employes,
    } = this.getFilters() || {};

    const filters = <Grid
      container
      spacing={8}
      alignItems="center"
    >
      <Grid
        item
      >
        <TextField
          label="Поиск"
          style={{
            marginLeft: 10,
            width: 200,
          }}
          name="query"
          value={query || ""}
          onChange={event => {
            const {
              value,
            } = event.target;

            this.setFilters({
              query: value,
            });
          }}
          inputProps={{
            className: "searchInput",
          }}
        />

      </Grid>

      <Grid
        item
      >

        <Grid
          container
          alignItems="center"
        >

          <Grid
            item
          >
            <Checkbox
              checked={advantages_not === null ? true : false}
              bool="true"
              onChange={(event, checked) => {
                // const {
                //   value,
                // } = event.target;

                this.setFilters({
                  advantages_not: checked ? null : undefined,
                });
              }}
            />
          </Grid>

          <Grid
            item
          >
            С преимуществами
          </Grid>

        </Grid>

      </Grid>

      <Grid
        item
      >

        <Grid
          container
          alignItems="center"
        >

          <Grid
            item
          >
            <Checkbox
              checked={with_employes === true ? true : false}
              bool="true"
              onChange={(event, checked) => {
                this.setFilters({
                  with_employes: checked ? true : undefined,
                });
              }}
            />
          </Grid>

          <Grid
            item
          >
            С сотрудниками
          </Grid>

        </Grid>

      </Grid>

      <Grid
        item
      >

        <Button
          onClick={event => this.cleanFilters({
            // where: null,
            // extraWhere: null,
          })}
        >
          Сброс
      </Button>

      </Grid>



    </Grid>;

    return filters;

  }


  getColumns() {

    const {
      columnData,
    } = this.state;

    return columnData || [];

  }


}


export {
  styles,
  DevTableView as TableView,
};

export default withStyles(styles)(props => <DevTableView
  {...props}
/>);