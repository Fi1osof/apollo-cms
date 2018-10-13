import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom'

import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'


export const userFragment = `
  fragment user on User {
    id
    username
  }
`;

export const queryFragments = {
  UserNoNestingFragment: userFragment
}


let options;

let testURL;

try {
  options = JSON.parse(process.env.npm_config_argv);

  const {
    original,
  } = options;

  testURL = original && original.find(n => /--testURL=/.test(n));

  testURL = testURL && testURL.replace(/--testURL=/, '') || "";

}
catch (error) {
  console.error(error);
}


let endpoint = testURL || "http://localhost";




export default class TestApp extends Component {

  static propTypes = {
    // Renderer: PropTypes.func.isRequired,
    endpoint: PropTypes.string.isRequired,
    queryFragments: PropTypes.object.isRequired,
  }
  
  static defaultProps = {
    // Renderer,
    endpoint,
    queryFragments,
  }

  render() {

    const {
      Renderer,
      queryFragments,
      ...other
    } = this.props;

    return <PrismaCmsApp
      lang="ru"
      Renderer={Renderer}
      queryFragments={queryFragments}
      {...other}
    />
  }
}



describe('Test App', () => {
  let node
 

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Test App mount', () => {
    render(<TestApp 
    />, node, () => {

      // console.log("node", node);
 
      return true;
    })
  })
})