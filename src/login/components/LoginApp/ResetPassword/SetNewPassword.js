import React, { useEffect, useState, useRef } from "react";
import Form from "reactstrap/lib/Form";
import { useDispatch } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CustomInput from "../../Inputs/CustomInput";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import EduIDButton from "../../../../components/EduIDButton";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { emptyStringPattern } from "../../../app_utils/validation/regexPatterns";
import PropTypes from "prop-types";
import Splash from "../../../../containers/Splash";
import ButtonSecondary from "../../Buttons/ButtonSecondary";
import { getFormValues } from "redux-form";

const validateNewPassword = (values, props) => {
  const newPassword = "new-password";
  const errors = {};
  if (!values[newPassword] || emptyStringPattern.test(values[newPassword])) {
    errors[newPassword] = "required";
  } else if (values[newPassword] !== props.suggested_password) {
    errors[newPassword] = "chpass.different-repeat";
  }
  return errors;
};

let NewPasswordForm = (props) => {
  const formValues = useSelector((state) => getFormValues("new-password-form")(state));
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
        label={props.translate("chpass.form_custom_password_repeat")}
        placeholder="xxxx xxxx xxxx"
      />

      <div className="new-password-button-container">
        {props.extra_security && Object.keys(props.extra_security).length > 0 && (
          <ButtonSecondary
            className="secondary"
            id="go-back-button"
            onClick={() => history.push(`/reset-password/extra-security/${props.emailCode}`)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {props.translate("resetpw.go-back")}
          </ButtonSecondary>
        )}
        <EduIDButton className="settings-button" id="new-password-button" disabled={props.invalid}>
          {props.translate("resetpw.accept-password")}
        </EduIDButton>
      </div>
    </Form>
  );
};

NewPasswordForm = reduxForm({
  form: "new-password-form",
})(NewPasswordForm);

NewPasswordForm = connect(() => ({
  enableReinitialize: true,
  initialValues: {
    "new-password": "",
  },
  destroyOnUnmount: false,
  touchOnChange: true,
  validate: validateNewPassword,
}))(NewPasswordForm);
function SetNewPassword(props) {
  const history = useHistory();
  const url = document.location.href;
  const emailCode = url.split("/").reverse()[0];
  const dispatch = useDispatch();
  const suggested_password = useSelector((state) => state.resetPassword.suggested_password);
  const selected_option = useSelector((state) => state.resetPassword.selected_option);
  const extra_security = useSelector((state) => state.resetPassword.extra_security);
  const [password, setPassword] = useState(null);
  const [toolTipText, setToolTipText] = useState("resetpw.copy-to-clipboard");
  const ref = useRef(null);

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
    ref.current.select();
    document.execCommand("copy");
    setToolTipText("resetpw.copied-in-clipboard");
    document.getElementById("icon-copy").style.display = "none";
    document.getElementById("icon-check").style.display = "inline";
    setTimeout(() => {
      document.getElementById("icon-copy").style.display = "inline";
      document.getElementById("icon-check").style.display = "none";
      setToolTipText("resetpw.copy-to-clipboard");
    }, 1000);
  };

  const clickSetNewPassword = (e) => {
    e.preventDefault();
    const newPassword = e.target["new-password"].value;
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
      <p className="heading">{props.translate("resetpw.set-new-password-heading")}</p>
      <p>{props.translate("resetpw.set-new-password-description")}</p>
      <div className="reset-password-input">
        <label>{props.translate("resetpw.new-password")}</label>
        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={password && password}
          readOnly={true}
        />
        <button id="clipboard" className="icon copybutton" onClick={copyToClipboard}>
          <FontAwesomeIcon id={"icon-copy"} icon={faCopy} />
          <FontAwesomeIcon id={"icon-check"} icon={faCheck} />
          <div className="tool-tip-text" id="tool-tip">
            {props.translate(toolTipText)}
          </div>
        </button>
      </div>
      <NewPasswordForm
        {...props}
        suggested_password={suggested_password}
        clickSetNewPassword={clickSetNewPassword}
        emailCode={emailCode}
        extra_security={extra_security}
      />
    </>
  );
}

SetNewPassword.propTypes = {
  translate: PropTypes.func,
  suggested_password: PropTypes.string,
  invalid: PropTypes.bool,
};

export default InjectIntl(SetNewPassword);
