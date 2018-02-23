import React from 'react'
import PropTypes from 'prop-types'


export default class ApolloCmsRenderer extends React.Component {

  static propTypes = {
  }

  static contextTypes = {
    user: PropTypes.object,
  }

  render() {

    const {
      children,
      ...other
    } = this.props;

    return children 
      ? 
        <children.type
          {...children.props}
          {...other}
        /> 
      : 
    null;
  }
}
