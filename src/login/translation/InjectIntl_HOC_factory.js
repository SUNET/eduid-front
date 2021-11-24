// Inspired by react-intl's `injectIntl()` HOC factory function implementation:
// https://github.com/yahoo/react-intl

import React, { Component } from "react";
import PropTypes from "prop-types";

import { translate } from ".";

function getReactComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}

/*
 * Adds the 'translate' function as a prop, for legacy reasons... better is to just import it.
 */
export default function InjectIntl(WrappedComponent) {
  class InjectIntl extends Component {
    render() {
      return <WrappedComponent {...this.props} {...{ translate: translate }} />;
    }
  }

  // creates a string of InjectIntl() and whatever wrapped components are returned from
  // getReactComponentDisplayName() and makes this the .displayName (ReactComponent property) of InjectIntl
  InjectIntl.displayName = `InjectIntl(${getReactComponentDisplayName(WrappedComponent)})`;

  // run-time type checking in development mode
  InjectIntl.contextTypes = {
    translation: PropTypes.func,
  };

  return InjectIntl;
}
