/* eslint-disable react/jsx-no-bind */
import React, { Fragment } from 'react'

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import TableView from '../pages/TableView'

// import withStyles from 'material-ui/styles/withStyles'
import EditableView from './EditableObject'
import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'

// export const styles = (theme) => {
//   return {}
// }

class DevRenderer extends PrismaCmsRenderer {
  constructor(props: any) {
    super(props)

    this.state = {
      ...this.state,
      mutation: gql`
        mutation updateUserProcessor($data: UserUpdateInput!) {
          response: updateUserProcessor(data: $data) {
            success
            message
            errors {
              key
              message
            }
            data {
              id
              username
              fullname
            }
          }
        }
      `,
    }
  }

  renderMenu(): JSX.Element {
    return (
      <AppBar color="inherit">
        <Grid container spacing={8}>
          <Grid item>
            <Link to="/">TableView</Link>
          </Grid>
          <Grid item>
            <Link to="/editable">EditableObject</Link>
          </Grid>
        </Grid>
      </AppBar>
    )
  }

  getRoutes(): Record<string, any>[] {
    const routers = super.getRoutes()

    const { mutation } = this.state

    const { mutate } = this.props

    // console.log("mutate", mutate);
    // console.log("mutation", mutation);
    // console.log("this.props", this.props);
    // console.log("this.context", this.context);

    return [
      {
        exact: true,
        path: '/',
        component: TableView,
        // render: (props) => {

        //   return <EditableView
        //     data={{
        //       object: {
        //         name: "SFDgdsf",
        //       }
        //     }}
        //     locales={{
        //       en: {
        //         values: {
        //           aa: "SDfsdfds",
        //           bb: "SDfsdfds",
        //         },
        //       },
        //       ru: {
        //         values: {

        //           aa: "SDfsdfds",
        //         },
        //       },
        //     }}
        //   />
        // }
      },
      {
        exact: true,
        path: '/editable',
        render: () => {
          return (
            <EditableView
              data={{
                object: {
                  username: 'test',
                },
              }}
              cacheKey="test_object"
              _dirty={
                {
                  // password: '',
                }
              }
              mutate={mutate}
              mutation={!mutate ? mutation : undefined}
              onSave={() => {
                // console.log("onSave result", result);

                // const {
                //   router: { history },
                // } = this.context

                // history.push(decodeURIComponent('/'))

                alert('Saved success')
              }}
              locales={{
                en: {
                  values: {
                    aa: 'SDfsdfds',
                    bb: 'SDfsdfds',
                  },
                },
                ru: {
                  values: {
                    aa: 'SDfsdfds',
                  },
                },
              }}
            >
              <Typography color="error">
                Дочерние компоненты не должный выводиться
              </Typography>
            </EditableView>
          )
        },
      },
    ].concat(routers)
  }

  renderWrapper(): JSX.Element {
    return (
      <Fragment>
        {this.renderMenu()}
        {super.renderWrapper()}
      </Fragment>
    )
  }
}

// const Renderer = graphql(gql`
//   mutation updateUserProcessor {
//     response: updateUserProcessor(
//       data: { Groups: { connect: { id: "cjq4l53962thz0860n7nfsniw" } } }
//     ) {
//       success
//       message
//       errors {
//         key
//         message
//       }
//       data {
//         id
//         username
//       }
//     }
//   }
// `)(DevRenderer)

// export default withStyles(styles)(props => <Renderer
//   {...props}
// />);

// export default withStyles(styles)((props) => <DevRenderer {...props} />)

export default DevRenderer
