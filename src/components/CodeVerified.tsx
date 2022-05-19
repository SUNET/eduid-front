import EduIDButton from "components/EduIDButton";
import React from "react";
import { FormattedMessage } from "react-intl";

interface CodeVerifiedProps {
  dashboard_url: string;
  email: string;
  password: string;
}

function CodeVerified(props: CodeVerifiedProps) {
  return (
    <form method="GET" action={props.dashboard_url} className="vertical-content-margin content">
      <h1 className="register-header">
        <FormattedMessage
          defaultMessage="You have completed the registration for eduID."
          description="Registration complete"
        />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="These are your login details for eduID."
          description="Registration finished"
        />
      </p>
      <div id="email-display">
        <fieldset>
          <label>
            <FormattedMessage defaultMessage="Email address" description="Email label" />
          </label>
          <div id="user-email" className="register-header display-data">
            {props.email}
          </div>
        </fieldset>
        <fieldset>
          <label>
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="register-header registered-email display-data">
            <mark id="user-password" className="force-select-all">
              {props.password}
            </mark>
          </div>
        </fieldset>
      </div>
      <div className="buttons">
        <EduIDButton id="gotit-button" buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to my eduid" description="go to eudID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}

export default CodeVerified;
