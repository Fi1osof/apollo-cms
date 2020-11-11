import React, { Fragment } from 'react'

import EditableView from '../../../../DataView/Object/Editable'
// import TextField from 'material-ui/TextField'

class DevEditableObject extends EditableView {
  render(): JSX.Element | null {
    const { Grid } = this.context

    return (
      <Fragment>
        {super.render()}

        <Grid container spacing={8}>
          <Grid item>
            {/* {this.renderField(<TextField label="Логин" name="username" />)} */}
            {this.getEditor({
              name: 'username',
              label: 'Логин',
            })}
          </Grid>

          <Grid item>
            {/* {this.renderField(<TextField label="Емейл" name="email" />)} */}
            {this.getEditor({
              name: 'email',
              label: 'Емейл',
            })}
          </Grid>

          <Grid item>
            {/* {this.renderField(<TextField label="Fake" name="fake" />)} */}
            {this.getEditor({
              name: 'fake',
              label: 'Fake',
            })}
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default DevEditableObject
