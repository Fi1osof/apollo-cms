import React from 'react'

import Context from '@prisma-cms/context'

export default class ApolloCmsRenderer extends React.Component {
  static contextType = Context

  render(): React.ReactNode {
    const { children } = this.props

    return children
  }
}
