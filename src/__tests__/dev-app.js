import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import App from '../dev'

import createDOM from './utils/createDOM'

createDOM()

describe('Apollo-cms dev App', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Dev App', () => {
    render(
      <App
      // endpoint="http://localhost/"
      />,
      node,
      () => {
        // expect(node.innerHTML).toContain('wefd')
        return true
      }
    )
  })
})
