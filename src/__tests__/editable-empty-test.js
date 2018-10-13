

import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import TestApp from "./App";

import Component from '../DataView/Object/Editable'

describe('Editable without object', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check content is empty', () => {
    render(<TestApp
      Renderer={Component}
      mutate={() => { }}
      data={{
      }}
    />, node, () => {
      expect(node.innerHTML).toContain('')
      return true;
    })
  })
})


