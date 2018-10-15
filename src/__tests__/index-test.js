import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

// import Component from '../App'

describe('Index App', () => {
  let node

  beforeEach(() => {
  })
  
  afterEach(() => {
    unmountComponentAtNode(node)
  })
  
  it('Test main App', () => {
    
    node = document.createElement('div')

    node.id = "root";

    global.document.body.append(node);

    require('../');

    // render(<Component
    //   endpoint="http://localhost/"
    // />, node, () => {
    //   // expect(node.innerHTML).toContain('wefd')
    //   return true;
    // })
  })
})
