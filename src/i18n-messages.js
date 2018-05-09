
// Inspired by react-intl's `injectIntl()` HOC factory function implementation:
// https://github.com/yahoo/react-intl

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import invariant from 'invariant';
import { intlShape, defineMessages, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

function invariantIntlContext({intl} = {}) {
    invariant(intl,
        '[React Intl] Could not find required `intl` object. ' +
        '<IntlProvider> needs to exist in the component ancestry.'
    );
}

export default function i18n(WrappedComponent, options = {}) {
    const {
        intlPropName = 'intl',
        l10nPropName = 'l10n',
        withRef      = false,
    } = options;

    //WrappedComponent.propTypes['l10n'] = PropTypes.func;

    class InjectIntl extends Component {
        constructor(props, context) {
            super(props, context);
            invariantIntlContext(context);
        }

        getWrappedInstance() {
            invariant(withRef,
                '[React Intl] To access the wrapped instance, ' +
                'the `{withRef: true}` option must be set when calling: ' +
                '`i18n()`'
            );

            return this.refs.wrappedInstance;
        }

        render() {

            const l10n = (msgid, values) => {
                if (msgs[msgid] !== undefined) {
                    if (values !== undefined) {
                        return msgs[msgid](values);
                    } else {
                        return msgs[msgid];
                    }
                } else if (unformatted[msgid] !== undefined) {
                    return this.context.intl.formatMessage(unformatted[msgid], values);
                } else {
                    return 'UNKNOWN MESSAGE ID (' + msgid + ')';
                }
            };

            return (
                <WrappedComponent
                    {...this.props}
                    {...{[intlPropName]: this.context.intl}}
                    {...{[l10nPropName]: l10n}}
                    ref={withRef ? 'wrappedInstance' : null}
                />
            );
        }
    }

    InjectIntl.displayName = `InjectIntl(${getDisplayName(WrappedComponent)})`;

    InjectIntl.contextTypes = {
        intl: intlShape,
        l10n: PropTypes.func
    };

    InjectIntl.WrappedComponent = WrappedComponent;
    return InjectIntl;
}


const msgs = {
    /************************/
    /* Generic Messages *****/
    /************************/

    'error_in_form': (
        <FormattedMessage
            id="error_in_form"
            defaultMessage={`Check the form below for errors.`} />),

    'main.welcome': (
        <FormattedMessage
            id="main.welcome"
            defaultMessage={`Welcome to eduID!`} />),

    'main.create-account': (
        <FormattedMessage
            id="main.create-account"
            defaultMessage={`Create an account for use with Swedish Universities.`} />),

    'email.sign-up-email': (
        <FormattedMessage
            id="email.sign-up-email"
            defaultMessage={`Sign up with your email address`} />),

    'captcha.one-step-left': (
        <FormattedMessage
            id="captcha.one-step-left"
            defaultMessage={`Only one more step left!`} />),

    'captcha.verify-human': (
        <FormattedMessage
            id="captcha.verify-human"
            defaultMessage={`eduID needs to verify that you are a human and not a machine.`} />),

    'captcha.submit': (
        <FormattedMessage
            id="captcha.submit"
            defaultMessage={`Submit`} />),

    'captcha.cancel': (
        <FormattedMessage
            id="captcha.cancel"
            defaultMessage={`Cancel`} />),

    'footer.copyright': (
        <FormattedMessage
            id="footer.copyright"
            defaultMessage={` SUNET 2013-2018`} />),

};

const unformatted = defineMessages({

    'choose-language': {
          id: "pd.choose-language",
          defaultMessage: `Choose language`
    },
});
