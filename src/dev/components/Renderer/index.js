
import React, { Fragment } from "react";

import PropTypes from "prop-types";

import { Renderer as PrismaCmsRenderer } from "@prisma-cms/front";

import TableView from "../pages/TableView";

import withStyles from "material-ui/styles/withStyles";
import EditableView from "../../../DataView/Object/Editable";

export const styles = theme => {

  return {

  }
}

class DevRenderer extends PrismaCmsRenderer {

  getRoutes() {

    let routers = super.getRoutes();

    routers.unshift({
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
    });

    return routers;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);