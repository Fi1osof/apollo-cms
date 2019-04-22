import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'

import * as queryFragments from "@prisma-cms/front/lib/schema/generated/api.fragments";

import Renderer from "./components/Renderer";

export default class App extends Component {

  static propTypes = {
    queryFragments: PropTypes.object.isRequired,
  }
  
  static defaultProps = {
    queryFragments,
    // lang: "ru",
    Renderer,
  }

  render() {

    const {
      queryFragments,
      ...other
    } = this.props;

    return <PrismaCmsApp
      queryFragments={queryFragments}
      {...other}
    />
  }
}

