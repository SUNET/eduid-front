import { ToUs } from "helperFunctions/ToUs";
import React from "react";
import { FormattedMessage } from "react-intl";
import EduIDButton from "./EduIDButton";

interface CommonToUProps {
  version: string;
  handleAccept(e: React.MouseEvent<HTMLElement>): void;
  handleCancel(e: React.MouseEvent<HTMLElement>): void;
}

/**
 * Show a specified version of the Terms of Use, and two buttons to either accept or reject them.
 *
 */
export function CommonToU(props: CommonToUProps): JSX.Element {
  return (
    <React.Fragment>
      {ToUs[props.version]}

      <p tabIndex={0}>
        <strong>
          <FormattedMessage
            defaultMessage={`Any person found violating or suspected of violating these rules can be disabled
          from eduID.se for investigation. Furthermore, legal action can be taken.`}
            description="Terms of use (common footer)"
          />
        </strong>
      </p>

      <div className="buttons">
        <EduIDButton id="cancel-button" buttonstyle="secondary" onClick={props.handleCancel}>
          <FormattedMessage defaultMessage="Cancel" description="ToU button cancel" />
        </EduIDButton>
        <EduIDButton type="submit" buttonstyle="primary" onClick={props.handleAccept} id="accept-button">
          <FormattedMessage defaultMessage="I accept" description="Terms of use (accept button text)" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}
