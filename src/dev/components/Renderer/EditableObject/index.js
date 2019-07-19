import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditableView from "../../../../DataView/Object/Editable";
import TextField from 'material-ui/TextField';

class DevEditableObject extends EditableView {


  render() {

    const {
      Grid,
    } = this.context;


    return <Fragment>

      {super.render()}


      <Grid
        container
        spacing={8}
      >

        <Grid
          item

        >
          {this.renderField(<TextField
            label="Логин"
            name="username"
          />)}

        </Grid>

        <Grid
          item

        >

          {this.renderField(<TextField
            label="Емейл"
            name="email"
          />)}

        </Grid>

        <Grid
          item

        >
          {this.renderField(<TextField
            label="Fake"
            name="fake"
          />)}

        </Grid>

      </Grid>




    </Fragment>

  }

}

export default DevEditableObject;