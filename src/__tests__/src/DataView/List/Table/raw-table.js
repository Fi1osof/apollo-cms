

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import chalk from "chalk";

import PropTypes from "prop-types";

import {
  styles,
  TableView,
} from '../../../../../DataView/List/Table'

import withStyles from 'material-ui/styles/withStyles'

// import createDOM from "../../../../utils/createDOM";


import App from "../../../../App";

// createDOM();


const TestTableView = withStyles(styles)(TableView);


class Renderer extends Component {


  static propTypes = { 
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


  render() {

    const {
      resolve,
      ...other
    } = this.props;

    return <TestTableView
      {...other}
      columnData={[]}
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


  it('Render TableView without data', () => {

    // return undefined;

    return new Promise(async (resolve, reject) => {


      render(<App
        Renderer={Renderer}
        resolve={resolve}
        data={{}}
        title="Test table"
        limit={2}
      >
      </App>
        , node, () => {

          // resolve();
          // return undefined;

          jest.useFakeTimers();

          // console.log(chalk.green("Table node"), node);
          // console.log(chalk.green("Table node.innerHTML"), node.innerHTML);


          setTimeout(() => {

            expect(node.innerHTML === "").toBe(true); 

          }, 1000);


          jest.runAllTimers();

          // return true;
        })


    });

  })
})


