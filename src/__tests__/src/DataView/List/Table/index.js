

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import PropTypes from "prop-types";

// import {
//   styles,
//   TableView,
// } from '../../../../../DataView/List/Table'

import withStyles from 'material-ui/styles/withStyles'
 

// import createDOM from "../../../../utils/createDOM";

import {
  data,
  columnData,
  count,
  styles,
  TableView,
} from "../../../../../dev/components/pages/TableView";

import App from "../../../../App";

// createDOM();

class CustomTableView extends TableView {


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
    }, 1000);

    // jest.runAllTimers();

  }

  // render() {

  //   // return null;
  //   return super.render();

  // }

}

const TestTableView = withStyles(styles)(props => <CustomTableView 
  {...props}
/>);


class Renderer extends Component {

  render() {

    const {
      // resolve,
      children,
      ...other
    } = this.props;

    return <TestTableView
      {...other}
      data={data}
      title="Test"
      limit={1}
      columnData={columnData}
    />;
  }
}




describe('DataView List Table', () => {
  let node


  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  
  it('Render TableView with data', () => {

    // return undefined;

    return new Promise(async (resolve, reject) => {


      render(<App
        Renderer={Renderer}
        resolve={resolve}
      >
      </App>
        , node, () => {

          // resolve();
          // return undefined;

          jest.useFakeTimers();

          setTimeout(() => {

            // let table = node.querySelector("table");

            // console.log("Table node", node.innerHTML);

            // return;

            let tables = node.querySelectorAll("table");

            expect(tables.length).toBe(1);

            let table = tables[0];

            // console.log("TableView HTML", table.innerHTML);

            // console.log("TableView textContent", table.textContent);

            expect(table).toNotBe(null);

            const thead = table.querySelector("thead");
            expect(thead).toNotBe(null);

            expect(table.textContent).toContain("UsernameEmailTesttest@localhosttest");

            let usernameSpans = table.querySelectorAll(".username");
            expect(usernameSpans.length).toBe(count);

            // Check cols count
            table.querySelectorAll("tr").forEach(n => {

              expect(n.children.length).toBe(columnData.length);
            })



            const searchInput = node.querySelector("input.searchInput");

            // console.log("Table searchInput", searchInput);

            expect(searchInput).toNotBe(null);


            // resolve();

          }, 1000);

          jest.runAllTimers();

          // return true;
        })


    });

  })
})


