import React from "react";
import { FormattedMessage } from "react-intl";

export const login = {
  // --- USERNAME & PASSWORD --- //
  "login.usernamePw.h2-heading": <FormattedMessage id="login.usernamePw.h2-heading" defaultMessage={`Log in`} />,
  "login.usernamePw.password-input": (
    <FormattedMessage id="login.usernamePw.password-input" defaultMessage={`Password`} />
  ),
  "login.usernamePw.submit-button-idle": (
    <FormattedMessage id="login.usernamePw.submit-button-idle" defaultMessage={`Log in`} />
  ),
  "login.usernamePw.submit-button-busy": (
    <FormattedMessage id="login.usernamePw.submit-button-busy" defaultMessage={`Logging in`} />
  ),
  "login.usernamePw.reset-password-link": (
    <FormattedMessage id="login.usernamePw.reset-password-link" defaultMessage={`Forgot your password?`} />
  ),
  "login.usernamePw.register-prompt": (
    <FormattedMessage id="login.usernamePw.register-prompt" defaultMessage={`Don't have eduID?`} />
  ),
  "login.usernamePw.register-link": (
    <FormattedMessage id="login.usernamePw.register-link" defaultMessage={`Register here.`} />
  ),

  // --- MFA --- //
  "login.mfa.h2-heading": (
    <FormattedMessage id="login.mfa.h2-heading" defaultMessage={`Log in: Extra level of security`} />
  ),
  "login.mfa.paragraph": (
    <FormattedMessage
      id="login.mfa.paragraph"
      defaultMessage={`You need to choose a second method to authenticate yourself. This helps guarantee that only you can access your eduID.`}
    />
  ),
  // security key
  "login.mfa.primary-option.title": (
    <FormattedMessage id="login.mfa.primary-option.title" defaultMessage={`Security key`} />
  ),
  "login.mfa.primary-option.button": (
    <FormattedMessage id="login.mfa.primary-option.button" defaultMessage={`Use security key`} />
  ),
  // freja eid+
  "login.mfa.secondary-option.title": (
    <FormattedMessage id="login.mfa.secondary-option.title" defaultMessage={`Freja eID+`} />
  ),
  "login.mfa.secondary-option.button": (
    <FormattedMessage
      id="login.mfa.secondary-option.button"
      defaultMessage={`Use my <span class="verbatim">Freja&nbsp;eID+</span>`}
    />
  ),
  "login.mfa.primary-option.hint": (
    <FormattedMessage
      id="login.mfa.primary-option.hint"
      defaultMessage={`If your security key has a button, don’t forget to tap it.`}
    />
  ),
};

export const tou = {
  // --- TOU --- //
  "login.tou.h2-heading": <FormattedMessage id="login.tou.h2-heading" defaultMessage={`Log in: Terms of use`} />,
  "login.tou.paragraph": (
    <FormattedMessage
      id="login.tou.paragraph"
      defaultMessage={`We need an updated acceptance from you of the eduID terms of use.`}
    />
  ),
  "login.tou.legal-title": (
    <FormattedMessage id="login.tou.legal-title" defaultMessage={`General rules for eduID users:`} />
  ),
  // --- TOU: 2016-V1--- //
  "login.tou.version.2016-v1": (
    <FormattedMessage
      id="login.tou.version.2016-v1"
      defaultMessage={`<ul tabIndex="0">
      <p>The following generally applies:</p>
      <li>
        <p>
          that all usage of user accounts follow Sweden&apos;s laws and by-laws,
        </p>
      </li>
      <li>
        <p>
          that all personal information that you provide, such as name and
          contact information shall be truthful,
        </p>
      </li>
      <li>
        <p>
          that user accounts, password and codes are individual and shall only
          be used by the intended individual,
        </p>
      </li>
      <li>
        <p>
          that SUNET&apos;s ethical rules regulate the &ldquo;other&ldquo;
          usage.
        </p>
      </li>
    </ul>
    <ul tabIndex="0">
      <p>SUNET judges unethical behaviour to be when someone:</p>
      <li>
        <p>
          attempts to gain access to network resources that they do not have the
          right
        </p>
      </li>
      <li>
        <p>attempts to conceal their user identity</p>
      </li>
      <li>
        <p>
          attempts to interfere or disrupt the intended usage of the network
        </p>
      </li>
      <li>
        <p>
          clearly wastes available resources (personnel, hardware or software)
        </p>
      </li>
      <li>
        <p>attempts to disrupt or destroy computer-based information</p>
      </li>
      <li>
        <p>infringes on the privacy of others</p>
      </li>
      <li>
        <p>attempts to insult or offend others</p>
      </li>
    </ul>`}
    />
  ),
  // --- TOU: 2021-V1--- //
  "login.tou.version.2021-v1": (
    <FormattedMessage
      id="login.tou.version.2021-v1"
      defaultMessage={`<ul tabIndex="0">
       <p>The following generally applies:</p>
      <li>
        <p>
          This a test version of terms of use version 1 from 2021,
        </p>
      </li>
      <li>
        <p>
          The versioning allows us to update terms if needed and keep parallel versions at the same time,
        </p>
      </li>
      <li>
        <p>
          And still ensure that we serve the correct version a specific users need to acccept,
        </p>
      </li>
    </ul>`}
    />
  ),
  "login.tou.legal-warning": (
    <FormattedMessage
      id="login.tou.legal-warning"
      defaultMessage={`Any person found violating or suspected of violating these rules can be disabled from eduID.se for investigation. Furthermore, legal action can be taken.`}
    />
  ),
  "login.tou.button": <FormattedMessage id="login.tou.button" defaultMessage={`I accept`} />,
};
