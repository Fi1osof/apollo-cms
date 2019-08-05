
import React, { Fragment } from "react";

import PropTypes from "prop-types";

import { Renderer as PrismaCmsRenderer } from "@prisma-cms/front";

import TableView from "../pages/TableView";

import withStyles from "material-ui/styles/withStyles";
import EditableView from "./EditableObject";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Typography from "material-ui/Typography";

export const styles = theme => {

  return {

  }
}




class DevRenderer extends PrismaCmsRenderer {



  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      mutation: gql`
        mutation updateUserProcessor(
          $data: UserUpdateInput!
        ){
          response: updateUserProcessor ( 
            data: $data
          ){
            success
            message
            errors{
              key
              message
            }
            data{
              id
              username
              fullname
            }
          }
        }
      `,
    }

  }


  getRoutes() {

    let routers = super.getRoutes();


    const {
      mutation,
    } = this.state;

    const {
      mutate,
    } = this.props;

    // console.log("mutate", mutate);
    // console.log("mutation", mutation);
    // console.log("this.props", this.props);
    // console.log("this.context", this.context);

    return [
      {
        exact: true,
        path: "/",
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
        path: "/editable",
        render: (props) => {

          return <EditableView
            data={{
              object: {
                name: "SFDgdsf",
              }
            }}
            _dirty={{
              password: "",
            }}
            mutate={mutate}
            mutation={!mutate ? mutation : undefined}
            onSave={result => {

              // console.log("onSave result", result);

              const {
                router: {
                  history,
                },
              } = this.context;

              history.push(decodeURIComponent("/"));

            }}
            locales={{
              en: {
                values: {
                  aa: "SDfsdfds",
                  bb: "SDfsdfds",
                },
              },
              ru: {
                values: {

                  aa: "SDfsdfds",
                },
              },
            }}
          >
            <Typography
              color="error"
            >
              Дочерние компоненты не должный выводиться
            </Typography>
          </EditableView>
        },
      },
    ].concat(routers);

  }


  renderWrapper() {

    return <Fragment>
      {this.renderMenu()}
      {super.renderWrapper()}
    </Fragment>
  }
}


const Renderer = graphql(gql`
  mutation updateUserProcessor{
    response: updateUserProcessor ( 
      data:{ 
        Groups:{
          connect:{
            id:"cjq4l53962thz0860n7nfsniw"
          }
        }
      }
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        id
        username
      }
    }
  }
  `)(DevRenderer);



// export default withStyles(styles)(props => <Renderer
//   {...props}
// />);

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);

