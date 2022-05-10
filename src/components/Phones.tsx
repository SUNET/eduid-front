import EduIDButton from "components/EduIDButton";
import { translate } from "login/translation";
import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import DataTable from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModal";
import "../login/styles/index.scss";
import { clearNotifications } from "reducers/Notifications";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import {
  postNewPhone,
  requestMakePrimaryPhone,
  requestVerifyPhone,
  requestResendPhoneCode,
  requestRemovePhone,
} from "apis/eduidPhone";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

interface PhoneFormData {
  number?: string;
}

function Phones() {
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | undefined>();
  const dispatch = useDashboardAppDispatch();
  const phones = useDashboardAppSelector((state) => state.phones);
  const default_country_code = useDashboardAppSelector((state) => state.config.default_country_code);

  function handlePhoneForm() {
    setShowPhoneForm(true);
  }

  async function handleAdd(values: PhoneFormData) {
    const number = toE164Number(values.number, default_country_code);

    if (number.startsWith("+")) {
      const response = await dispatch(postNewPhone({ number: number }));
      if (postNewPhone.fulfilled.match(response)) {
        // phone number form closed when user have successfully added phone number
        return setShowPhoneForm(false);
      }
      return setShowPhoneForm(true);
    }
  }

  function handleResend(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (selectedPhoneNumber) dispatch(requestResendPhoneCode({ number: selectedPhoneNumber }));
  }

  function handleStartConfirmation(event: React.MouseEvent<HTMLElement>) {
    dispatch(clearNotifications());
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number");
    const phoneNumber = dataNode?.getAttribute("data-object");
    if (phoneNumber) setSelectedPhoneNumber(phoneNumber);
  }

  function handleStopConfirmation() {
    setSelectedPhoneNumber(undefined);
  }

  function handleConfirm() {
    const confirmationCode = document.getElementById("confirmation-code-area");
    const code = confirmationCode?.querySelector("input");
    if (code && selectedPhoneNumber) {
      const trimmed = code.value.trim();
      if (trimmed) dispatch(requestVerifyPhone({ code: trimmed, number: selectedPhoneNumber }));
      setSelectedPhoneNumber(undefined);
    }
  }

  function handleRemove(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number");
    const phoneNumber = dataNode?.getAttribute("data-object");
    if (phoneNumber) {
      dispatch(requestRemovePhone({ number: phoneNumber }));
    }
  }

  function handleMakePrimary(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number");
    const phoneNumber = dataNode?.getAttribute("data-object");
    if (phoneNumber) dispatch(requestMakePrimaryPhone({ number: phoneNumber }));
  }

  function handleCancel() {
    setShowPhoneForm(false);
  }

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const phonePlaceholder = intl.formatMessage({
    id: "placeholder.phone",
    defaultMessage: "Phone number",
    description: "placeholder text for phone input",
  });

  const modalPlaceholder = intl.formatMessage({
    id: "mobile.confirm_mobile_placeholder",
    defaultMessage: "Phone confirmation code",
    description: "placeholder text for phone code input",
  });

  const title = intl.formatMessage(
    {
      id: "mobile.confirm_title",
      defaultMessage: "Enter the code sent to {phone}",
      description: "Title for phone code input",
    },
    { phone: selectedPhoneNumber }
  );

  function validatePhonesInForm(value: string): string | undefined {
    const number = toE164Number(value, default_country_code);

    if (!number.startsWith("+")) {
      // value was not valid, and 'number' is a validation error string
      return number;
    }

    const is_duplicate = phones.phones.find((x) => toE164Number(x.number, default_country_code) == number);

    if (is_duplicate) {
      return "phones.duplicated";
    }

    // value is valid
    return undefined;
  }

  return (
    <article className="phone-view-form-container" id="phone">
      <div className="intro">
        <h3>
          <FormattedMessage defaultMessage="Mobile phone numbers" description="Phones main title" />
        </h3>
        <p>
          <FormattedMessage
            defaultMessage={`You can connect one or more mobile phone numbers to your eduID,
            but one has to be set as primary.`}
            description="Phones long description"
          />
        </p>
      </div>
      <div id="phone-display">
        <DataTable
          data={phones.phones}
          handleStartConfirmation={handleStartConfirmation}
          handleRemove={handleRemove}
          handleMakePrimary={handleMakePrimary}
        />
        {showPhoneForm ? (
          <FinalForm<PhoneFormData>
            onSubmit={handleAdd}
            initialValues={{
              number: "",
            }}
            render={({ handleSubmit, pristine, invalid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FinalField
                    label={<FormattedMessage defaultMessage="Phone number" description="Phone display title" />}
                    component={CustomInput}
                    componentClass="input"
                    type="text"
                    name="number"
                    validate={validatePhonesInForm}
                    placeholder={phonePlaceholder}
                    helpBlock={
                      <FormattedMessage
                        defaultMessage="Phone number starting with 0 or +"
                        description="Phones input help text"
                      />
                    }
                  />
                  <div className="flex-buttons">
                    <EduIDButton id="cancel-adding-mobile" buttonstyle="secondary" onClick={handleCancel}>
                      <FormattedMessage defaultMessage="Cancel" description="button cancel" />
                    </EduIDButton>
                    <EduIDButton
                      id="add-mobile"
                      buttonstyle="primary"
                      type="submit"
                      disabled={invalid || pristine}
                      onClick={handleSubmit}
                    >
                      <FormattedMessage defaultMessage="Add" description="button add" />
                    </EduIDButton>
                  </div>
                </form>
              );
            }}
          />
        ) : (
          <EduIDButton id="add-more-button" buttonstyle="link" className=" lowercase" onClick={handlePhoneForm}>
            <FormattedMessage defaultMessage=" + add more" description="button add more" />
          </EduIDButton>
        )}
      </div>
      <ConfirmModal
        id="phoneConfirmDialog"
        title={title}
        modalFormLabel={<FormattedMessage id="enter confirmation code" defaultMessage={`Confirmation code`} />}
        resendMarkup={
          <div className="resend-code-container">
            <a href="#" onClick={handleResend}>
              <FormattedMessage id="resend code" defaultMessage={`Send a new confirmation code`} />
            </a>
          </div>
        }
        placeholder={modalPlaceholder}
        showModal={Boolean(selectedPhoneNumber)}
        closeModal={handleStopConfirmation}
        handleConfirm={handleConfirm}
        validationPattern={shortCodePattern}
        validationError={"confirmation.code_invalid_format"}
      />
    </article>
  );
}

/**
 * Ensure a number is in E.164 format (starting with + and a country code).
 * The return value is valid if it starts with "+", and a validation error string otherwise.
 *
 * @param number Phone number, possibly not in E.164 format
 */
function toE164Number(number: string | undefined, default_country_code: string): string {
  if (!number) {
    return "required";
  }

  const patternWithCountryCode = /^\+[1-9]\d{6,20}$/;

  if (patternWithCountryCode.test(number)) {
    // Already a valid E.164 number.
    return number;
  }

  if (number.startsWith("+")) {
    // This must be either the string "+" or a string starting with "+0". No country code begins with "0".
    return "phones.invalid_phone";
  }

  const oneLeadingZero = /^0[1-9]\d{6,20}$/;
  if (oneLeadingZero.test(number)) {
    // Replace a single leading zero with the default country code and call it valid.
    return "+" + default_country_code + number.substring(1);
  }

  // If we got here, the number was not valid (too short or long, or contained an alphabetic character probably).
  return "phones.invalid_phone";
}

export default Phones;
