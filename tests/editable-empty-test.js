

import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Component from 'src/DataView/Object/Editable'

describe('Editable without object', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check content is empty', () => {
    render(<Component
    />, node, () => {
      expect(node.innerHTML).toContain('')
      return true;
    })
  })
})


