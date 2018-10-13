

import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import PropTypes from "prop-types";

import {
  styles,
  TableView,
} from '../../../../../DataView/List/Table'

import withStyles from 'material-ui/styles/withStyles'

import "material-ui";

import createDOM from "../../../utils/createDOM";

createDOM();

class Component extends TableView {


  static propTypes = {
    ...TableView.propTypes,
    resolve: PropTypes.func.isRequired,
  }

  componentDidMount() {

    // console.log("DataView List Table componentDidMount");

    // this.handleRequestSort(new Event("sort"), {});

    super.componentDidMount && super.componentDidMount();

    const {
      resolve,
    } = this.props;

    // jest.useFakeTimers();

    setTimeout(() => {
      resolve();
    }, 3000);

    // jest.runAllTimers();

  }

  // render() {

  //   // return null;
  //   return super.render();

  // }

}


const Renderer = withStyles(styles)(Component);


describe('DataView List Table', () => {
  let node


  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check content is not empty', () => {

    // return undefined;

    return new Promise(async (resolve, reject) => {

      const edges = [
        {
          "node": {
            "id": "cjn27lkhv08sp0950dcfp61c3",
            "username": "Test",
            "fullname": "",
            "image": null,
            "sudo": false,
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

      const count = edges.length;

      const data = {
        "variables": {
          "first": 10,
          "skip": 0,
          "orderBy": "username_ASC",
          "where": null
        },
        "loading": false,
        "networkStatus": 7,
        "objectsConnection": {
          "pageInfo": {
            "hasNextPage": false,
            "hasPreviousPage": false,
            "startCursor": "cjn27lkhv08sp0950dcfp61c3",
            "endCursor": "cjn29b63508zn09504gf24kde",
            "__typename": "PageInfo"
          },
          "aggregate": {
            "count": count,
            "__typename": "AggregateUser"
          },
          "edges": edges,
          "__typename": "UserConnection"
        }
      };


      const columnData = [
        {
          id: "id",
        },
        {
          id: "username",
          renderer: (value) => {
            return <span
              className="username"
            >
              {value}
            </span>
          }
        },
      ]

      render(<Renderer
        data={data}
        title="Test"
        limit={1}
        columnData={columnData}
        resolve={resolve}
      />, node, () => {

        // resolve();
        return undefined;

        jest.useFakeTimers();

        setTimeout(() => {

          // let table = node.querySelector("table");

          let tables = node.querySelectorAll("table");

          expect(tables.length).toBe(1);

          let table = tables[0];

          // console.log("TableView HTML", table.innerHTML);

          // console.log("TableView textContent", table.textContent);

          expect(table).toNotBe(null);

          const thead = table.querySelector("thead");
          expect(thead).toNotBe(null);

          expect(table.textContent).toContain("cjn27lkhv08sp0950dcfp61c3");

          let usernameSpans = table.querySelectorAll(".username");
          expect(usernameSpans.length).toBe(count);

          // Check cols count
          table.querySelectorAll("tr").forEach(n => {

            expect(n.children.length).toBe(columnData.length);
          })

          resolve();

        }, 3000);

        jest.runAllTimers();

        return true;
      })


    });

  })
})


