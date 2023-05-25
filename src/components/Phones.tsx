import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getCaptchaRequest,
  postNewPhone,
  requestMakePrimaryPhone,
  requestRemovePhone,
  requestResendPhoneCode,
  requestSendPhoneCode,
  requestVerifyPhone,
  sendCaptchaResponse,
} from "apis/eduidPhone";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect, useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import DataTable from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModal";
import "../login/styles/index.scss";

interface PhoneFormData {
  number?: string;
}

function Phones() {
  /* When the user clicks "+ add more", the "phone form" is shown, allowing the user to add another phone number */
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  /* selectedPhoneNumber is used when confirming a phone number. The user clicks "confirm"
   * next to a number and that number gets set in this state variable. Whenever this state
   * variable has a value, the ConfirmModal is shown to allow the user to enter the <code className="
   */
  const [completeCaptcha, setCompleteCaptcha] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | undefined>();
  const dispatch = useDashboardAppDispatch();
  const phones = useDashboardAppSelector((state) => state.phones);
  const default_country_code = useDashboardAppSelector((state) => state.config.default_country_code);
  const error = useDashboardAppSelector((state) => state.notifications.error);
  const [img, setImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (error?.message === "phone.captcha-already-completed") {
      dispatch(clearNotifications());
    }
  }, [error]);

  async function getNewCaptcha() {
    const promise = await getCaptcha().then((img) => setImg(img));
    return promise;
  }

  async function getCaptcha() {
    const res = await dispatch(getCaptchaRequest());
    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload.captcha_img;
    }
  }

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
    (async () => {
      const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number");
      const phoneNumber = dataNode?.getAttribute("data-object");
      if (phoneNumber) setSelectedPhoneNumber(phoneNumber);
      try {
        await getCaptcha().then((img) => {
          if (img) {
            setImg(img);
            setCompleteCaptcha(true);
          }
        });
      } catch (err) {}
    })();
  }

  function handleStopConfirmation() {
    setSelectedPhoneNumber(undefined);
  }

  function handleStopCaptcha() {
    setCompleteCaptcha(false);
    setSelectedPhoneNumber(undefined);
  }

  function sendCaptcha(values: { [key: string]: string }) {
    (async () => {
      try {
        const captchaValue = values["phone-captcha-modal"];
        const res = await dispatch(sendCaptchaResponse({ internal_response: captchaValue }));
        if (sendCaptchaResponse.fulfilled.match(res)) {
          setCompleteCaptcha(false);
          if (selectedPhoneNumber) {
            dispatch(requestSendPhoneCode({ number: selectedPhoneNumber }));
          }
        } else {
          setCompleteCaptcha(false);
          setSelectedPhoneNumber(undefined);
        }
      } catch (err) {}
    })();
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
    defaultMessage: "Code",
    description: "placeholder text for phone code input",
  });

  function validatePhonesInForm(value: string): string | undefined {
    const number = toE164Number(value, default_country_code);

    if (!number.startsWith("+")) {
      // value was not valid, and 'number' is a validation error string
      return number;
    }

    const is_duplicate = phones.phones?.find((x) => toE164Number(x.number, default_country_code) == number);

    if (is_duplicate) {
      return "phones.duplicated";
    }

    // value is valid
    return undefined;
  }

  return (
    <article className="phone-view-form-container" id="phone">
      <h2>
        <FormattedMessage defaultMessage="Mobile phone numbers" description="Phones main title" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`You can connect one or more mobile phone numbers to your eduID,
            but one has to be set as primary.`}
          description="Phones long description"
        />
      </p>
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
                  <div className="buttons">
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
          <EduIDButton
            id="phone-number-add-more-button"
            buttonstyle="link"
            className=" lowercase"
            onClick={handlePhoneForm}
          >
            <FormattedMessage defaultMessage=" + add more" description="button add more" />
          </EduIDButton>
        )}
      </div>

      {/* Captcha modal */}
      <ConfirmModal
        id="phone-captcha-modal"
        captchaImage={img}
        title={
          <FormattedMessage
            defaultMessage={`To receive code, complete below captcha.`}
            description="captcha modal title"
          />
        }
        placeholder={""}
        showModal={Boolean(completeCaptcha)}
        closeModal={handleStopCaptcha}
        handleConfirm={sendCaptcha}
        modalFormLabel={
          <FormattedMessage description="phones modal form label" defaultMessage={`Enter the code from the image`} />
        }
        resendMarkup={
          <div className="icon-text">
            <button type="button" className="icon-only" aria-label="name-check" disabled={!img} onClick={getNewCaptcha}>
              <FontAwesomeIcon icon={faRedo as IconProp} />
            </button>
            <label htmlFor="name-check" className="hint">
              <FormattedMessage defaultMessage="Generate a new captcha image" description="captcha img change" />
            </label>
          </div>
        }
        submitButtonText={<FormattedMessage defaultMessage="Continue" description="Captcha button" />}
      />

      <ConfirmModal
        id="phone-confirm-modal"
        title={
          <FormattedMessage
            defaultMessage={`Enter the code sent to {phone}`}
            description="Title for phone code input"
            values={{ phone: selectedPhoneNumber }}
          />
        }
        placeholder={modalPlaceholder}
        showModal={Boolean(selectedPhoneNumber) && !completeCaptcha}
        closeModal={handleStopConfirmation}
        handleConfirm={handleConfirm}
        modalFormLabel={<FormattedMessage description="phones modal form label" defaultMessage={`Code`} />}
        resendMarkup={
          <div className="resend-code-container">
            <a href="#" onClick={handleResend}>
              <FormattedMessage description="resend code" defaultMessage={`Send a new code`} />
            </a>
          </div>
        }
        validationError={"confirmation.code_invalid_format"}
        validationPattern={shortCodePattern}
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
