import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { useAppSelector } from "eduid-hooks";
import React, { ReactNode } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import Select, { SingleValue } from "react-select";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import EuFlag from "../../../img/flags/EuFlag.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";
import GlobalFlag from "../../../img/flags/GlobalFlag.svg";
import type { AuthMethod } from "./../../apis/helpers/types";

interface RecoveryOptions {
  swedish_eid?: boolean;
  freja_eid?: boolean;
  eidas?: boolean;
}

const IconWithText = ({ icon, text }: { icon: ReactNode; text: ReactNode }) => {
  return (
    <React.Fragment>
      {icon}
      <span className="select-option-text">{text}</span>
    </React.Fragment>
  );
};

export function RecoveryOptions({
  recoveryAvailable,
}: {
  readonly recoveryAvailable: RecoveryOptions;
}): React.JSX.Element {
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

  interface SelectOptions {
    value: string;
    label: React.JSX.Element;
    available?: boolean;
  }

  const allOptions: SelectOptions[] = [
    {
      value: "Bank ID",
      label: (
        <IconWithText
          icon={<img height="35" className="circle-icon bankid-icon" alt="BankID" src={BankIdFlag} />}
          text={<FormattedMessage defaultMessage={`BankID`} />}
        />
      ),
      available: recoveryAvailable.swedish_eid,
    },
    {
      value: "Freja+",
      label: (
        <IconWithText
          icon={<img className="circle-icon" height="35" alt="Freja+" src={FrejaFlag} />}
          text={<FormattedMessage defaultMessage={`Freja+`} />}
        />
      ),
      available: recoveryAvailable.swedish_eid,
    },
    {
      value: "eIDAS",
      label: (
        <IconWithText
          icon={<img className="circle-icon" height="35" alt="eIDAS" src={EuFlag} />}
          text={<FormattedMessage defaultMessage={`eIDAS`} />}
        />
      ),
      available: recoveryAvailable.eidas,
    },
    {
      value: "Freja eID",
      label: (
        <IconWithText
          icon={<img className="circle-icon" height="35" alt="Freja eID" src={GlobalFlag} />}
          text={<FormattedMessage defaultMessage={`Freja eID`} />}
        />
      ),
      available: recoveryAvailable.freja_eid,
    },
  ];

  const options = allOptions.filter((option) => option.available);

  async function handleAuthenticate(method: AuthMethod) {
    const authenticate = method === "bankid" ? bankIDMfaAuthenticate : eidasMfaAuthenticate;
    const response = await authenticate({
      method: method,
      frontend_action: frontend_action,
      frontend_state: frontend_state,
    });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        globalThis.location.assign(response.data.payload.location);
      }
    }
  }

  async function handleOnClickFrejaeID() {
    const response = await eidasMfaAuthenticate({
      method: "freja",
      frontend_action: frontend_action,
      frontend_state: frontend_state,
    });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        globalThis.location.assign(response.data.payload.location);
      }
    }
  }

  async function handleOnClickEidas() {
    const response = await eidasMfaAuthenticate({
      method: "eidas",
      frontend_action: frontend_action,
      frontend_state: frontend_state,
    });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        window.location.assign(response.data.payload.location);
      }
    }
  }

  function handleOnChange(newValue: SingleValue<SelectOptions>): void {
    if (newValue?.value === "Bank ID") {
      handleAuthenticate("bankid");
    } else if (newValue?.value === "Freja+") {
      handleAuthenticate("freja");
    } else if (newValue?.value === "eIDAS") {
      handleAuthenticate("eidas");
    } else if (newValue?.value === "Freja eID") {
      handleAuthenticate("freja_eid");
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
                isDisabled={!recoveryAvailable.swedish_eid && !recoveryAvailable.freja_eid && !recoveryAvailable.eidas}
              />
            </form>
          )}
        />
        {!recoveryAvailable.swedish_eid && !recoveryAvailable.freja_eid && !recoveryAvailable.eidas && (
          <p className="help-text">
            <FormattedMessage
              description="MFA recovery help text"
              defaultMessage="Requires a confirmed Swedish national identity, coordination number, European identity, or Freja eID."
            />
          </p>
        )}
      </div>
    </React.Fragment>
  );
}
