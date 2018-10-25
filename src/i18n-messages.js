
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

    'required': (
        <FormattedMessage
            id="required"
            defaultMessage={`Required`} />),

    'error_in_form': (
        <FormattedMessage
            id="error_in_form"
            defaultMessage={`Check the form below for errors.`} />),

    'Error: NOT FOUND': (
        <FormattedMessage
            id="Error: NOT FOUND"
            defaultMessage={`There was an error (404) servicing your request. The administrator has been alerted. Please try again later.`} />),

    'Error: Internal Server Error': (
        <FormattedMessage
            id="Error: Internal Server Error"
            defaultMessage={`There was an error (500) servicing your request. The administrator has been alerted. Please try again later.`} />),

    'Error: Service Unavailable': (
        <FormattedMessage
            id="Error: Service Unavailable"
            defaultMessage={`Service Unavailable. Check your internet connection.`} />),

    'unexpected-problem': (
        <FormattedMessage
            id="unexpected-problem"
            defaultMessage={`There was an unexpected problem. Please try again.`} />),

    'Temporary technical problems': (
        <FormattedMessage
            id="Temporary technical problems"
            defaultMessage={`Temporary technical problems, please try again later`} />),

    'user-out-of-sync': (
        <FormattedMessage
            id="user-out-of-sync"
            defaultMessage={`User data is out of sync. Reload page to re-sync.`} />),

    'unexpected-success': (
        <FormattedMessage
            id="unexpected-success"
            defaultMessage={`Success`} />),

    'csrf.try-again': (
        <FormattedMessage
          id="csrf.try-again"
          defaultMessage={`There was a problem with your submission, please try again`} />),

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

    'email.invalid_email': (
        <FormattedMessage
            id="email.invalid_email"
            defaultMessage={`The entered email is invalid`} />),

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

    'created.back_to_signup': (
        <FormattedMessage
            id="created.back_to_signup"
            defaultMessage={`Back to signup`} />),

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

    'tou.must-accept': (
        <FormattedMessage
            id="tou.must-accept"
            defaultMessage={`You must accept the new terms of use before continuing`} />),

    'tou.not-tou': (
        <FormattedMessage
            id="tou.not-tou"
            defaultMessage={`There were problems retrieving the current ToU, please contact the site administrators.`} />),

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

    'finish.sites-accept': (
        <FormattedMessage
            id="finish.sites-accept"
            defaultMessage={`Your account is now ready for use with sites that accept`} />),

    'finish.unconfirmed-identities': (
        <FormattedMessage
            id="finish.unconfirmed-identities"
            defaultMessage={`unconfirmed identities`} />),

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

    'resend.title': (
        <FormattedMessage
            id="resend.title"
            defaultMessage={`Registration not complete`} />),

    'resend.subtitle': (
        <FormattedMessage
            id="resend.subtitle"
            defaultMessage={`Send a new verification email to this address`} />),

    'resend.button': (
        <FormattedMessage
            id="resend.button"
            defaultMessage={`Resend verification email`} />),

    'signup.registering-address-used': (
        <FormattedMessage
            id="signup.registering-address-used"
            defaultMessage={`The email address you entered is already in use`} />),

    'signup.registering-new': (
        <FormattedMessage
            id="signup.registering-new"
            defaultMessage={`Email address successfully registered`} />),

    'signup.recaptcha-not-verified': (
        <FormattedMessage
            id="signup.recaptcha-not-verified"
            defaultMessage={`There was a problem verifying that you are a human. Please try again`} />),

    'signup.verification-resent': (
        <FormattedMessage
            id="signup.verification-resent"
            defaultMessage={`Verification email resent`} />),

    'signup.registering-resend-code': (
        <FormattedMessage
            id="signup.registering-resend-code"
            defaultMessage={`Verification email resent`} />),

    'code.unknown-code': (
        <FormattedMessage
            id="code.unknown-code"
            defaultMessage={`Unknown verification code`} />),

    'used.email-in-use': (
        <FormattedMessage
            id="used.email-in-use"
            defaultMessage={`Email address already in use`} />),

    'used.forgot-password': (
        <FormattedMessage
            id="used.forgot-password"
            defaultMessage={`Forgot your password?`} />),

    'used.reset-password': (
        <FormattedMessage
            id="used.reset-password"
            defaultMessage={`RESET YOUR PASSWORD`} />),

    'mfa.two-factor-authn': (
        <FormattedMessage
            id="mfa.two-factor-authn"
            defaultMessage={`Two-factor authentication`} />),

    'mfa.extra-security-enabled': (
        <FormattedMessage
            id="mfa.extra-security-enabled"
            defaultMessage={`Extra security enabled for this account`} />),

    'mfa.login-tapit': (
        <FormattedMessage
            id="mfa.login-tapit"
            defaultMessage={`Use your Security Key to log in. If it has a button, tap it.`} />),

    'mfa.fake-authn': (
        <FormattedMessage
            id="mfa.fake-authn"
            defaultMessage={`Fake authn while testing`} />),

    'actions.action-completed': (
        <FormattedMessage
            id="actions.action-completed"
            defaultMessage={`Success`} />),

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
