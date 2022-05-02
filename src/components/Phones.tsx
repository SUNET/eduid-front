import EduIDButton from "components/EduIDButton";
import { translate } from "login/translation";
import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import TableList from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import "../login/styles/index.scss";
import { isValid } from "redux-form";
import {
  makePrimary,
  postMobile,
  startResendMobileCode,
  startConfirmation,
  stopConfirmation,
  startVerify,
  startRemove,
} from "actions/Mobile";
import { clearNotifications } from "reducers/Notifications";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { postNewPhone } from "apis/eduidPhone";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

interface PhoneFormData {
  number?: string;
}

const validate = (values: any) => {
  let phone = values.number;
  if (!phone) {
    return { number: "required" };
  }
  phone = phone.replace(/ /g, "");
  if (phone.startsWith("00")) {
    return { number: "phone.e164_format" };
  }
  if (phone.startsWith("0")) {
    phone = "+" + 46 + phone.substr(1);
  }
  const pattern = /^\+[1-9]\d{6,20}$/;
  if (!pattern.test(phone)) {
    return { number: "phone.phone_format" };
  }
};

// const PhoneForm = (props: any) => {
//   const intl = useIntl();
//   // placeholder can't be an Element, we need to get the actual translated string here
//   const placeholder = intl.formatMessage({
//     id: "placeholder.phone",
//     defaultMessage: "Phone number",
//     description: "placeholder text for phone input",
//   });

//   return (
//     // <Form id="phonesview-form" role="form" onSubmit={props.handleAdd} className="single-input-form">
//     //   <fieldset id="phone-form" className="tabpane">
//     //     <Field
//     //       label={translate("profile.phone_display_title")}
//     //       component={CustomInput}
//     //       componentClass="input"
//     //       type="text"
//     //       name="number"
//     //       placeholder={placeholder}
//     //       helpBlock={translate("phones.input_help_text")}
//     //     />
//     //   </fieldset>
//     //   <EduIDButton id="mobile-button" buttonstyle="primary" disabled={!props.valid_phone} onClick={props.handleAdd}>
//     //     {translate("mobile.button_add")}
//     //   </EduIDButton>
//     // </Form>
//   );
// };

// const DecoratedPhoneForm = reduxForm({
//   form: "phones",
//   // validate,
// })(PhoneForm);

// const FinalePhoneForm = connect((state) => ({
//   initialValues: { number: "" },
//   enableReinitialize: true,
// }))(DecoratedPhoneForm);

function Phones(props: any) {
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const dispatch = useDashboardAppDispatch();
  const phones = useDashboardAppSelector((state) => state.phones);
  // const confirming = useDashboardAppSelector((state) => state.phones.confirming);
  // const resending = useDashboardAppSelector((state) => state.phones.resending);
  // const default_country_code = useDashboardAppSelector((state) => state.config.default_country_code);

  function handleMobileForm() {
    setShowPhoneForm(true);
    // rendering focus on input, setTimeout for 200 milliseconds to recognize the form
    setTimeout(() => {
      (document.getElementById("number") as HTMLInputElement).focus();
    }, 200);
  }

  async function handleAdd(values: PhoneFormData) {
    if (values.number) {
      const response = await dispatch(postNewPhone({ number: values.number }));
      if (postNewPhone.fulfilled.match(response)) {
        // phone number form closed when user have successfully added an email
        return setShowPhoneForm(false);
      }
    } else setShowPhoneForm(true);
  }

  function handleResend(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    dispatch(startResendMobileCode());
    dispatch(stopConfirmation());
  }

  function handleStartConfirmation(event: React.MouseEvent<HTMLElement>) {
    dispatch(clearNotifications());
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number"),
      data = {
        identifier: dataNode && dataNode.getAttribute("data-identifier"),
        phone: dataNode && dataNode.getAttribute("data-object"),
      };

    dispatch(startConfirmation(data));
  }

  function handleStopConfirmation() {
    dispatch(stopConfirmation());
  }

  function handleConfirm() {
    const codeValue = document.getElementById("confirmation-code-area");
    const data = {
      code: codeValue && (codeValue.querySelector("input") as HTMLInputElement).value.trim(),
    };
    dispatch(startVerify(data));
    dispatch(stopConfirmation());
  }

  function handleRemove(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number"),
      data = {
        phone: dataNode && dataNode.getAttribute("data-object"),
      };
    dispatch(startRemove(data));
  }

  function handleMakePrimary(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.number"),
      data = {
        phone: dataNode && dataNode.getAttribute("data-object"),
      };
    dispatch(makePrimary(data));
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
    }
    // { phone: confirming }
  );

  return (
    <article className="phone-view-form-container" id="phone">
      <div className="intro">
        <h3>{translate("phones.main_title")}</h3>
        <p>{translate("phones.long_description")}</p>
      </div>
      <div id="phone-display">
        <TableList
          // data={phones.phones}
          handleStartConfirmation={handleStartConfirmation}
          handleRemove={handleRemove}
          handleMakePrimary={handleMakePrimary}
        />
        {/* <div className={formClass}> */}
        {showPhoneForm ? (
          <FinalForm<any>
            onSubmit={handleAdd}
            initialValues={{
              number: "",
            }}
            validate={validate}
            render={({ handleSubmit, pristine, invalid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FinalField
                    label={translate("profile.phone_display_title")}
                    component={CustomInput}
                    componentClass="input"
                    type="text"
                    name="number"
                    placeholder={placeholder}
                    helpBlock={translate("phones.input_help_text")}
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
          //   <Form id="phonesview-form" role="form" onSubmit={handleAdd} className="single-input-form">
          //   <fieldset id="phone-form" className="tabpane">
          //     <Field
          //       label={translate("profile.phone_display_title")}
          //       component={CustomInput}
          //       componentClass="input"
          //       type="text"
          //       name="number"
          //       placeholder={placeholder}
          //       helpBlock={translate("phones.input_help_text")}
          //     />
          //   </fieldset>
          //   <EduIDButton id="mobile-button" buttonstyle="primary"  type="submit"
          //   disabled={invalid || pristine}
          //   // disabled={!valid_phone}
          //   onClick={handleAdd}>
          //     {translate("mobile.button_add")}
          //   </EduIDButton>
          // </Form>
          <EduIDButton id="add-more-button" buttonstyle="link" className={" lowercase"} onClick={handleMobileForm}>
            {translate("phones.button_add_more")}
          </EduIDButton>
        )}

        {/* </div> */}
      </div>
      <ConfirmModal
        modalId="phoneConfirmDialog"
        id="phoneConfirmDialogControl"
        title={title}
        resendLabel={translate("cm.enter_code")}
        resendHelp={translate("cm.lost_code")}
        resendText={translate("cm.resend_code")}
        placeholder={placeholder}
        // showModal={Boolean(confirming)}
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
