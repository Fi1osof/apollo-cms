// import expect from 'expect'
// import React from 'react'
import { unmountComponentAtNode } from 'react-dom'

// import Component from '../App'

describe('Index App', () => {
  let node

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {})

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Test main App', () => {
    node = document.createElement('div')

    node.id = 'root'

    global.document.body.append(node)

    require('../')

    // render(<Component
    //   endpoint="http://localhost/"
    // />, node, () => {
    //   // expect(node.innerHTML).toContain('wefd')
    //   return true;
    // })
  })
})
