import { bankIDMfaAuthenticate } from "apis/eduidBankid";
import { eidasMfaAuthenticate } from "apis/eduidEidas";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";

export function SwedishEID(): JSX.Element {
  const intl = useIntl();
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  // TODO: when backend is updated to swedish_eid, we should be able to rename this.
  const notAvailable = !authn_options.freja_eidplus;

  const placeholder = intl.formatMessage({
    id: "placeholder.recovery_option",
    defaultMessage: "Show recovery options",
    description: "placeholder text for recovery option",
  });

  const IconWithText = ({ icon, text }: any) => {
    return (
      <React.Fragment>
        {icon}
        <span className="select-option-text">{text}</span>
      </React.Fragment>
    );
  };

  const options = [
    {
      value: "Bank ID",
      label: (
        <IconWithText
          icon={<img height="35" alt="BankID" src={BankIdFlag} />}
          text={<FormattedMessage defaultMessage={`Bank ID`} />}
        />
      ),
    },
    {
      value: "Freja+",
      label: (
        <IconWithText
          icon={<img className="freja" height="35" alt="Freja+" src={FrejaFlag} />}
          text={<FormattedMessage defaultMessage={`Freja+`} />}
        />
      ),
    },
  ];
  async function handleOnClickBankID() {
    const response = await dispatch(
      bankIDMfaAuthenticate({ method: "bankid", frontend_action: "loginMfaAuthn", frontend_state: ref })
    );
    if (bankIDMfaAuthenticate.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  async function handleOnClickFrejaeID() {
    const response = await dispatch(
      eidasMfaAuthenticate({ method: "freja", frontend_action: "loginMfaAuthn", frontend_state: ref })
    );
    if (eidasMfaAuthenticate.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
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
    <>
      <div className="or-container">
        <div className="line" />
        <span>
          <FormattedMessage defaultMessage="or use recovery mode" />
        </span>
        <div className="line" />
      </div>
      <div className="option-wrapper">
        <FinalForm
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <fieldset>
                <Select
                  options={options}
                  onChange={handleOnChange}
                  placeholder={placeholder}
                  isSearchable={false}
                  className="mfa-select"
                  classNamePrefix="react-select"
                  isDisabled={notAvailable}
                />
              </fieldset>
            </form>
          )}
        />
        {notAvailable && (
          <p className="help-text">
            <FormattedMessage
              description="MFA Freja help text"
              defaultMessage="Requires a confirmed Swedish national identity number."
            />
          </p>
        )}
      </div>
    </>
  );
}
