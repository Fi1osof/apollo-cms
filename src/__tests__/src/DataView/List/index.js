import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import Component from '../../../../DataView/List'

describe('DataView List', () => {
  let node

  let name = 'Test'
  let newName = 'Test dirty'

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check content is not empty', () => {
    render(
      <Component
        data={{
          object: {
            name,
          },
        }}
        _dirty={{
          name: newName,
        }}
      />,
      node,
      () => {
        return true
      }
    )
  })
})
