import React from 'react'
import styled from 'styled-components'
import { EditableObject as Component } from 'src'

import { render } from 'dev/tests/utils'

const border = '1px solid green'

const ComponentStyled = styled(Component)`
  color: ${({ theme }) => theme.colors.primary};

  border: ${border};
`

describe('Component', () => {
  it('Render default', () => {
    const tree = render(
      <Component
        object={{
          name: 'Test object',
        }}
      />
    )
    expect(tree.container).toMatchSnapshot()
  })

  it('Render styled', () => {
    const tree = render(<ComponentStyled object={null} />)
    const node = tree.container.children[0]
    expect(tree.container).toMatchSnapshot()
    expect(node).toMatchSnapshot()
    expect(node).toBeUndefined()
  })
})
