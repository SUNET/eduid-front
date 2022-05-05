import EduIDButton from "components/EduIDButton";
import { translate } from "login/translation";
import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import DataTable from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
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
  const [confirmingPhone, setConfirmingPhone] = useState<string | undefined>();
  const dispatch = useDashboardAppDispatch();
  const phones = useDashboardAppSelector((state) => state.phones);
  const default_country_code = useDashboardAppSelector((state) => state.config.default_country_code);

  function handlePhoneForm() {
    setShowPhoneForm(true);
    // rendering focus on input, setTimeout for 200 milliseconds to recognize the form
    setTimeout(() => {
      (document.getElementById("number") as HTMLInputElement).focus();
    }, 200);
  }

  async function handleAdd(values: PhoneFormData) {
    let value = values.number;
    if (!value) {
      return;
    }
    if (value.startsWith("0")) {
      value = "+" + default_country_code + value.substring(1);
    }
    const response = await dispatch(postNewPhone({ number: value }));
    if (postNewPhone.fulfilled.match(response)) {
      // phone number form closed when user have successfully added phone number
      return setShowPhoneForm(false);
    }
    return setShowPhoneForm(true);
  }

  function handleResend(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (confirmingPhone) dispatch(requestResendPhoneCode({ number: confirmingPhone }));
  }

  function handleStartConfirmation(event: React.MouseEvent<HTMLElement>) {
    dispatch(clearNotifications());
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number");
    const number = dataNode && dataNode.getAttribute("data-object");
    if (number) setConfirmingPhone(number);
  }

  function handleStopConfirmation() {
    setConfirmingPhone(undefined);
  }

  function handleConfirm() {
    const codeValue = document.getElementById("confirmation-code-area");
    const data = {
      code: codeValue && (codeValue.querySelector("input") as HTMLInputElement).value.trim(),
    };
    if (data.code && confirmingPhone) dispatch(requestVerifyPhone({ code: data.code, number: confirmingPhone }));
    setConfirmingPhone(undefined);
  }

  function handleRemove(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number");
    const number = dataNode && dataNode.getAttribute("data-object");
    if (number) {
      dispatch(requestRemovePhone({ number: number }));
    }
  }

  function handleMakePrimary(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number"),
      data = {
        phone: dataNode && dataNode.getAttribute("data-object"),
      };
    if (data.phone) dispatch(requestMakePrimaryPhone({ number: data.phone }));
  }

  function handleCancel() {
    setShowPhoneForm(false);
  }

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
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
    { phone: confirmingPhone }
  );

  function validatePhonesInForm(value: string): string | undefined {
    const errors: PhoneFormData = {};
    let phone = value;

    if (!phone) {
      return "required";
    }
    if (!phone.startsWith("0") && !phone.startsWith("+")) {
      return "phones.invalid";
    }
    const patternWithCountryCode = /^\+[1-9]\d[0-9]{6,20}$/;
    const startWithZeroPattern = /0([-\s]?\d)[0-9]{6,20}/;
    if (!patternWithCountryCode.test(phone) && !startWithZeroPattern.test(phone)) {
      return "phones.invalid";
    }
    if (phone.startsWith("0")) {
      phone = phone.substring(1);
    }
    if (phone.startsWith("+46")) {
      phone = phone.substring(3);
    }
    const is_duplicate = phones.phones.find((x) => x.number.substring(3) === phone);

    if (is_duplicate) {
      return "phones.duplicated";
    }
    return errors.number;
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
                    placeholder={placeholder}
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
        modalId="phoneConfirmDialog"
        id="phoneConfirmDialogControl"
        title={title}
        resendLabel={translate("cm.enter_code")}
        resendHelp={translate("cm.lost_code")}
        resendText={translate("cm.resend_code")}
        placeholder={placeholder}
        showModal={Boolean(confirmingPhone)}
        closeModal={handleStopConfirmation}
        handleResend={handleResend}
        handleConfirm={handleConfirm}
        validationPattern={shortCodePattern}
        validationError={"confirmation.code_invalid_format"}
      />
    </article>
  );
}

export default Phones;
