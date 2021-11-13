// Inspired by react-intl's `injectIntl()` HOC factory function implementation:
// https://github.com/yahoo/react-intl

import React, { Component } from "react";
import PropTypes from "prop-types";

import invariant from "invariant";
import { intlShape } from "react-intl";

import { formattedMessages, unformattedMessages } from "./messageIndex";

// console.log("this is formattedMessages:", formattedMessages);
function getReactComponentDisplayName(Component) {
  // console.log("this is Component.name:", Component.name);
  // console.log("this is Component.displayName:", Component.displayName);
  return Component.displayName || Component.name || "Component";
}

function invariantIntlContext({ intl } = {}) {
  // console.log("this is  intl:", intl);
  // console.log("this is  invariant:", invariant);
  invariant(
    intl,
    "[React Intl] Could not find required `intl` object. " + "<IntlProvider> needs to exist in the component ancestry."
  );
}

// This is a function that wraps whatever is exported in the container in an InjectIntl() and loads it with props each component needs for translation.
// InjectIntl is the standard name for a component that deals with translation, but it is unclear to me why this is not a separate component loaded with the needed props in the index.js
export default function InjectIntl(WrappedComponent, options = {}) {
  // console.log("this is WrappedComponent:", <WrappedComponent />);
  const { intlPropName = "intl", translatePropName = "translate", withRef = false } = options;
  //WrappedComponent.propTypes['translate'] = PropTypes.func;

  // make a class for the component InjectIntl and load it with the props intl and i10n
  class InjectIntl extends Component {
    constructor(props, context) {
      super(props, context);
      // get the intl context (seems to be what end up being intl from store, an object ready to take on info)
      invariantIntlContext(context);
    }

    getWrappedInstance() {
      invariant(
        withRef,
        "[React Intl] To access the wrapped instance, " +
          "the `{withRef: true}` option must be set when calling: " +
          "`InjectIntl()`"
      );
      return this.refs.wrappedInstance;
    }

    render() {
      // this is a function available as a props that needs to be passed from parent
      const translation = (messageId, values) => {
        // if messageId is found in message variable
        // console.log(
        //   " this is messages[messageId] ",
        //   formattedMessages[messageId]
        // );
        if (formattedMessages[messageId] !== undefined) {
          // if values is not undefined (I have never seen it be defined)
          if (values !== undefined) {
            // ?
            return formattedMessages[messageId](values);
          } else {
            // return blob with a props object containing the id and defaultMessage (actual message string)
            return formattedMessages[messageId];
          }
          // if messageId is in the unformatted variable
        } else if (unformattedMessages[messageId] !== undefined) {
          return this.context.intl.formatMessage(unformattedMessages[messageId], values);
          // if messageId cannot be found anywhere in the InjectIntl_HOC_factory file print error message
        } else {
          return "UNKNOWN MESSAGE ID (" + messageId + ")";
        }
      };

      return (
        // console.log("this.props in WrappedComponent :", this.props),
        <WrappedComponent
          {...this.props}
          {...{ [intlPropName]: this.context.intl }}
          {...{ [translatePropName]: translation }}
          ref={withRef ? "wrappedInstance" : null}
        />
      );
    }
  }

  // creates a string of InjectIntl() and whatever wrapped components are returned from
  // getReactComponentDisplayName() and makes this the .displayName (ReactComponent property) of InjectIntl
  InjectIntl.displayName = `InjectIntl(${getReactComponentDisplayName(WrappedComponent)})`;

  // context types for InjectIntl
  InjectIntl.contextTypes = {
    intl: intlShape,
    translation: PropTypes.func,
  };

  // this is undefined (?)
  // InjectIntl.WrappedComponent = WrappedComponent;

  return InjectIntl;
}
