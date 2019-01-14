import React from 'react'
import PropTypes from 'prop-types'

import Context from "@prisma-cms/context";

export default class ApolloCmsRenderer extends React.Component {

  // static propTypes = {
  // }

  static contextType = Context;

  render() {

    const {
      children,
    } = this.props;

    return children || null;
  }
}