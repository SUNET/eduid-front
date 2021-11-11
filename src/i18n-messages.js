// Inspired by react-intl's `injectIntl()` HOC factory function implementation:
// https://github.com/yahoo/react-intl

import React, { Component } from "react";
import PropTypes from "prop-types";

import invariant from "invariant";
import { intlShape } from "react-intl";

import {
  formattedMessages,
  unformattedMessages,
} from "./login/translation/messageIndex";

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}

function invariantIntlContext({ intl } = {}) {
  invariant(
    intl,
    "[React Intl] Could not find required `intl` object. " +
      "<IntlProvider> needs to exist in the component ancestry."
  );
}

export default function i18n(WrappedComponent, options = {}) {
  const {
    intlPropName = "intl",
    l10nPropName = "l10n",
    withRef = false,
  } = options;

  //WrappedComponent.propTypes['l10n'] = PropTypes.func;

  class InjectIntl extends Component {
    constructor(props, context) {
      super(props, context);
      invariantIntlContext(context);
    }

    getWrappedInstance() {
      invariant(
        withRef,
        "[React Intl] To access the wrapped instance, " +
          "the `{withRef: true}` option must be set when calling: " +
          "`i18n()`"
      );

      return this.refs.wrappedInstance;
    }

    render() {
      const l10n = (msgid, values) => {
        if (formattedMessages[msgid] !== undefined) {
          if (values !== undefined) {
            return formattedMessages[msgid](values);
          } else {
            return formattedMessages[msgid];
          }
        } else if (unformattedMessages[msgid] !== undefined) {
          return this.context.intl.formatMessage(
            unformattedMessages[msgid],
            values
          );
        } else {
          return "UNKNOWN MESSAGE ID (" + msgid + ")";
        }
      };

      return (
        <WrappedComponent
          {...this.props}
          {...{ [intlPropName]: this.context.intl }}
          {...{ [l10nPropName]: l10n }}
          ref={withRef ? "wrappedInstance" : null}
        />
      );
    }
  }

  InjectIntl.displayName = `InjectIntl(${getDisplayName(WrappedComponent)})`;

  InjectIntl.contextTypes = {
    intl: intlShape,
    translate: PropTypes.func,
  };

  InjectIntl.WrappedComponent = WrappedComponent;
  return InjectIntl;
}
