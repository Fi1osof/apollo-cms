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


export default class TestApp extends Component {

  static propTypes = {
    // Renderer: PropTypes.func.isRequired,
    queryFragments: PropTypes.object.isRequired,
  }

  static defaultProps = {
    // Renderer,
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