
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

    'created.account-created': (
        <FormattedMessage
            id="created.account-created"
            defaultMessage={`Account created successfully`} />),

    'created.confirm-registration': (
        <FormattedMessage
            id="created.confirm-registration"
            defaultMessage={`Confirm registration`} />),

    'tou.header': (
        <FormattedMessage
            id="tou.header"
            defaultMessage={`General rules for usage of user accounts at eduID.se`} />),

    'tou.reject': (
        <FormattedMessage
            id="tou.reject"
            defaultMessage={`Reject`} />),

    'tou.accept': (
        <FormattedMessage
            id="tou.accept"
            defaultMessage={`Accept`} />),

    'header.student': (
        <FormattedMessage
            id="header.student"
            defaultMessage={`STUDENT`} />),

    'header.technician': (
        <FormattedMessage
            id="header.technician"
            defaultMessage={`TECHNICIAN`} />),

    'header.staff': (
        <FormattedMessage
            id="header.staff"
            defaultMessage={`STAFF`} />),

    'header.faq': (
        <FormattedMessage
            id="header.faq"
            defaultMessage={`FAQ`} />),

    'header.signup': (
        <FormattedMessage
            id="header.signup"
            defaultMessage={`SIGN UP`} />),

    'header.signin': (
        <FormattedMessage
            id="header.signin"
            defaultMessage={`SIGN IN`} />),

    'finish.write-password': (
        <FormattedMessage
            id="finish.write-password"
            defaultMessage={`Write down this password and store it in a safe place.`} />),

    'finish.got-it': (
        <FormattedMessage
            id="finish.got-it"
            defaultMessage={`OK, got it`} />),

    'finish.can-now-login': (
        <FormattedMessage
            id="finish.can-now-login"
            defaultMessage={`You can now log in`} />),

    'finish.accept-unconfirmed': (
        <FormattedMessage
            id="finish.accept-unconfirmed"
            defaultMessage={`Your account is now ready for use with sites that accept <strong>unconfirmed identities</strong>.`} />),

    'finish.finish': (
        <FormattedMessage
            id="finish.finish"
            defaultMessage={`FINISH`} />),

    'finish.access-more': (
        <FormattedMessage
            id="finish.access-more"
            defaultMessage={`Access more`} />),

    'finish.to-dashboard': (
        <FormattedMessage
            id="finish.to-dashboard"
            defaultMessage={`To get access to additional sites that require a confirmed identity, proceed to the dashboard.`} />),

    'finish.confirm-identity': (
        <FormattedMessage
            id="finish.confirm-identity"
            defaultMessage={`CONFIRM IDENTITY`} />),

// messages with parameters

    'created.email-sent': (values) => (
        <FormattedMessage
            id="created.email-sent"
            defaultMessage={`An email with instructions on how to proceed has been sent to {email}`}
            values={values} />),

    'finish.registration-complete': (values) => (
        <FormattedMessage
            id="finish.registration-complete"
            defaultMessage={`Registration of {email} completed`}
            values={values} />),
};

const unformatted = defineMessages({

    'choose-language': {
          id: "pd.choose-language",
          defaultMessage: `Choose language`
    },
});
