

import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import Component from 'src/DataView/Object/Editable'

describe('Editable with dirty object', () => {
  let node

  let name = "Test";
  let newName = "Test dirty";

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
      _dirty={{
        name: newName,
      }}
    />, node, () => {

      // console.log("node", node);

      expect(node.querySelector('h2').textContent).toContain(newName)
      return true;
    })
  })
})


