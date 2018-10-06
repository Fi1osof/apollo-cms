

import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import Component from 'src/DataView/Object/Editable'

describe('Editable with object', () => {
  let node

  let name = "Test";

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check content is not empty', () => {
    render(<Component
      data={{
        object: {
          name,
        }
      }}
    />, node, () => {

      // console.log("node", node);

      expect(node.querySelector('h2').textContent).toContain(name)
      return true;
    })
  })
})


