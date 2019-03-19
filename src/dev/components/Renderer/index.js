
import React, { Fragment } from "react";

import PropTypes from "prop-types";

import { Renderer as PrismaCmsRenderer } from "@prisma-cms/front";

import TableView from "../pages/TableView";

import withStyles from "material-ui/styles/withStyles";

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
    });

    return routers;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);