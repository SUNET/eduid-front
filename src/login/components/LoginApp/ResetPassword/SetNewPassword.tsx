import React, { useEffect, useState, useRef } from "react";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import EduIDButton from "../../../../components/EduIDButton";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { emptyStringPattern } from "../../../app_utils/validation/regexPatterns";
import Splash from "../../../../containers/Splash";
import ButtonSecondary from "../../Buttons/ButtonSecondary";
import { getFormValues } from "redux-form";
import { ExtraSecurityType } from "../../../redux/slices/resetPasswordSlice";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

interface NewPasswordFormData {
  newPassword?: string;
}

interface NewPasswordFormProps {
  clickSetNewPassword: (event: React.FormEvent<HTMLFormElement>) => void;
  translate(msg: string): string;
  extra_security?: ExtraSecurityType;
  emailCode: string;
  invalid: boolean;
  suggested_password: string | undefined;
  newPassword: string;
  errors: string;
}

interface valueProps {
  [key: string]: string;
}

const validateNewPassword = (values: valueProps, props: NewPasswordFormProps) => {
  const newPassword = "new-password";
  const errors: { [key: string]: string } = {};

  if (!values[newPassword] || emptyStringPattern.test(values[newPassword])) {
    errors[newPassword] = "required";
  } else if (values[newPassword] !== props.suggested_password) {
    errors[newPassword] = "chpass.different-repeat";
  }
  return errors;
};

const NewPasswordForm = (props: NewPasswordFormProps): JSX.Element => {
  const formValues: { [key: string]: string } = useAppSelector((state) => getFormValues("new-password-form")(state));
  const history = useHistory();
  return (
    <Form
      autoComplete="on"
      id="new-password-form"
      role="form"
      aria-label="new-password form"
      onSubmit={props.clickSetNewPassword}
    >
      <input
        autoComplete="new-password"
        type="password"
        name="display-none-new-password"
        id="display-none-new-password"
        defaultValue={formValues["new-password"] && formValues["new-password"]}
      />
      <Field
        id="new-password"
        type="text"
        name="new-password"
        component={CustomInput}
        required={true}
        label={<FormattedMessage defaultMessage="Repeat new password" description="Set new password" />}
        placeholder="xxxx xxxx xxxx"
      />

      <div className="new-password-button-container">
        {props.extra_security && Object.keys(props.extra_security).length > 0 && (
          <ButtonSecondary
            className="secondary"
            id="go-back-button"
            onClick={() => history.push(`/reset-password/extra-security/${props.emailCode}`)}
          >
            <FontAwesomeIcon icon={faArrowLeft as IconProp} />
            <FormattedMessage defaultMessage="go back" description="Set new password (go back to eduID button)" />
          </ButtonSecondary>
        )}
        <EduIDButton className="settings-button" id="new-password-button" disabled={props.invalid}>
          <FormattedMessage defaultMessage="accept password" description="Set new password (accept button)" />
        </EduIDButton>
      </div>
    </Form>
  );
};

const SetNewPasswordForm = reduxForm<NewPasswordFormData, NewPasswordFormProps>({
  form: "new-password-form",
  validate: validateNewPassword,
})(NewPasswordForm);

const ConnectedNewPasswordForm = connect(() => ({
  enableReinitialize: true,
  initialValues: {
    newPassword: "",
  },
  destroyOnUnmount: false,
  touchOnChange: true,
}))(SetNewPasswordForm);

function SetNewPassword(props: NewPasswordFormProps): JSX.Element {
  const history = useHistory();
  const url = document.location.href;
  const emailCode = url.split("/").reverse()[0];
  const dispatch = useAppDispatch();
  const suggested_password = useAppSelector((state) => state.resetPassword.suggested_password);
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [toolTipText, setToolTipText] = useState<object>({
    id: "resetpw.copy-to-clipboard",
    defaultMessage: "Copy to clipboard",
  });
  const ref = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  useEffect(() => {
    setPassword(suggested_password);
    dispatch(resetPasswordSlice.actions.saveLinkCode(emailCode));
  }, [suggested_password, dispatch]);

  // Change path to extra-security without selected option on reload
  useEffect(() => {
    if (selected_option === undefined) {
      history.push(`/reset-password/extra-security/${emailCode}`);
    }
  }, [selected_option]);

  const copyToClipboard = () => {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setToolTipText({ id: "resetpw.copied-in-clipboard", defaultMessage: "Copied!" });
      (document.getElementById("icon-copy") as HTMLInputElement).style.display = "none";
      (document.getElementById("icon-check") as HTMLInputElement).style.display = "inline";
      setTimeout(() => {
        (document.getElementById("icon-copy") as HTMLInputElement).style.display = "inline";
        (document.getElementById("icon-check") as HTMLInputElement).style.display = "none";
        setToolTipText({ id: "resetpw.copy-to-clipboard", defaultMessage: "Copy to clipboard" });
      }, 1000);
    }
  };

  const clickSetNewPassword = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const newPassword = target && target["new-password"].value;
    dispatch(resetPasswordSlice.actions.storeNewPassword(newPassword));
    if (!selected_option || selected_option === "without") {
      dispatch(resetPasswordSlice.actions.setNewPassword());
    } else if (selected_option === "phoneCode") {
      dispatch(resetPasswordSlice.actions.setNewPasswordExtraSecurityPhone());
    } else if (selected_option === "securityKey") {
      dispatch(resetPasswordSlice.actions.setNewPasswordExtraSecurityToken());
    } else if (selected_option === "freja") {
      dispatch(resetPasswordSlice.actions.setNewPasswordExtraSecurityExternalMfa());
    }
  };

  return (
    <>
      {!password && <Splash />}
      <p className="heading">
        <FormattedMessage defaultMessage="Set your new password" description="Set new password" />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="A strong password has been generated for you. To proceed you will need to copy the password in to the Repeat new password field and click Accept Password."
          description="Set new password"
        />
      </p>
      <div className="reset-password-input">
        <label>
          <FormattedMessage defaultMessage="New password" description="Set new password" />
        </label>
        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={password && password}
          readOnly={true}
        />
        <button id="clipboard" className="icon copybutton" onClick={copyToClipboard}>
          <FontAwesomeIcon id={"icon-copy"} icon={faCopy as IconProp} />
          <FontAwesomeIcon id={"icon-check"} icon={faCheck as IconProp} />
          <div className="tool-tip-text" id="tool-tip">
            {intl.formatMessage(toolTipText)}
          </div>
        </button>
      </div>
      <ConnectedNewPasswordForm
        {...props}
        suggested_password={suggested_password}
        clickSetNewPassword={clickSetNewPassword}
        emailCode={emailCode}
        extra_security={extra_security}
      />
    </>
  );
}

export default SetNewPassword;
