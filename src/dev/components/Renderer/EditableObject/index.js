import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditableView from "../../../../DataView/Object/Editable";
import TextField from 'material-ui/TextField';

class DevEditableObject extends EditableView {


  render() {


    return <Fragment>

      {super.render()}


      {this.renderField(<TextField
        label="Логин"
        name="username"
      />)}

      {this.renderField(<TextField
        label="Емейл"
        name="email"
      />)}


    </Fragment>

  }

}

export default DevEditableObject;