import { bankIDMfaAuthenticate } from "apis/eduidBankid";
import { eidasMfaAuthenticate } from "apis/eduidEidas";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";

interface SingleValueProps {
  value: string;
}

export function SwedishEID(): JSX.Element {
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  // TODO: when backend is updated to swedish_eid, we should be able to rename this.
  const notAvailable = !authn_options.freja_eidplus;
  const [selected, setSelected] = useState();

  const IconWithText = ({ icon, text }: any) => {
    return (
      <>
        {icon}
        <span className="select-option-text">{text}</span>
      </>
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
      <div className="option-wrapper">
        <div className="or-container">
          <div className="line" />
          <span>
            <FormattedMessage defaultMessage="or use recovery mode" />
          </span>
          <div className="line" />
        </div>

        <FinalForm
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <fieldset>
                <Select
                  // isDisabled={fetchFailed}
                  options={options}
                  onChange={handleOnChange}
                  value={selected}
                  placeholder={"Select recovery option"}
                  isSearchable={false}
                  className="mfa-select"
                  classNamePrefix="react-select"
                  // menuIsOpen={true}
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
