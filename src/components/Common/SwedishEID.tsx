import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { useAppSelector } from "eduid-hooks";
import React from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";

interface SwedishEIDProps {
  readonly recoveryAvailable?: boolean;
}

const IconWithText = ({ icon, text }: any) => {
  return (
    <React.Fragment>
      {icon}
      <span className="select-option-text">{text}</span>
    </React.Fragment>
  );
};

export function SwedishEID({ recoveryAvailable }: SwedishEIDProps): JSX.Element {
  const intl = useIntl();
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const ref = useAppSelector((state) => state.login.ref);
  const frontend_action = location.pathname.includes("login") ? "loginMfaAuthn" : "resetpwMfaAuthn";
  const frontend_state = location.pathname.includes("login") ? ref : email_code;
  const [bankIDMfaAuthenticate] = bankIDApi.useLazyBankIDMfaAuthenticateQuery();
  const [eidasMfaAuthenticate] = eidasApi.useLazyEidasMfaAuthenticateQuery();

  const placeholder = intl.formatMessage({
    id: "placeholder.recovery_option",
    defaultMessage: "Show other options",
    description: "placeholder text for recovery option",
  });

  const options = [
    {
      value: "Bank ID",
      label: (
        <IconWithText
          icon={<img height="35" className="circle-icon bankid-icon" alt="BankID" src={BankIdFlag} />}
          text={<FormattedMessage defaultMessage={`BankID`} />}
        />
      ),
    },
    {
      value: "Freja+",
      label: (
        <IconWithText
          icon={<img className="circle-icon" height="35" alt="Freja+" src={FrejaFlag} />}
          text={<FormattedMessage defaultMessage={`Freja+`} />}
        />
      ),
    },
  ];

  async function handleOnClickBankID() {
    const response = await bankIDMfaAuthenticate({ method: "bankid", frontend_action: frontend_action, frontend_state: frontend_state });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        window.location.assign(response.data.payload.location);
      }
    }
  }

  async function handleOnClickFrejaeID() {
    const response = await eidasMfaAuthenticate({ method: "freja", frontend_action: frontend_action, frontend_state: frontend_state });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        window.location.assign(response.data.payload.location);
      }
    }
  }

  function handleOnChange(newValue: any): void {
    if (newValue?.value === "Bank ID") {
      handleOnClickBankID();
    } else if (newValue?.value === "Freja+") {
      handleOnClickFrejaeID();
    }
  }

  return (
    <React.Fragment>
      <div className="or-container">
        <div className="line" />
        <span>
          <FormattedMessage defaultMessage="Having issues using a security key?" />
        </span>
        <div className="line" />
      </div>
      <div className="option-wrapper">
        <FinalForm
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Select
                options={options}
                onChange={handleOnChange}
                placeholder={placeholder}
                isSearchable={false}
                className="mfa-select"
                classNamePrefix="react-select"
                isDisabled={!recoveryAvailable}
              />
            </form>
          )}
        />
        {!recoveryAvailable && (
          <p className="help-text">
            <FormattedMessage
              description="MFA Freja help text"
              defaultMessage="Requires a confirmed Swedish national identity or coordination number."
            />
          </p>
        )}
      </div>
    </React.Fragment>
  );
}
