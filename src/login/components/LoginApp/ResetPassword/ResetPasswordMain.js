import React, {useEffect} from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useSelector, useDispatch,  } from 'react-redux';
import { getResetPassword, postEmailLink } from "../../../redux/actions/resetPasswordActions"
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import { connect } from "react-redux";

let EmailForm = (props) => (
  <Form id="reset-password-form" role="form" onSubmit={props.sendLink}>
    <Field
      type="email"
      name="email"
      label={props.translate("signup.registering-input")}
      componentClass="input"
      id="email-input"
      component={CustomInput}
      translate={props.translate}
      placeholder="example@email.com"
    />
    <EduIDButton
      className="settings-button"
      id="reset-password-button"
      disabled={props.invalid}
      onClick={props.sendLink}
    >
      {props.translate("resetpw.send-link")}
    </EduIDButton>
  </Form>
);

EmailForm = reduxForm({
  form: "emailForm",
  validate,
})(EmailForm);

EmailForm = connect(() => ({
  enableReinitialize: true,
  destroyOnUnmount: false,
}))(EmailForm);

const ResetPasswordMain = (props) => {
  const dispatch = useDispatch();
  const csrf_token = useSelector(state => state.config.csrf_token);

  const sendLink = () => {
    const email = document.querySelector("input[name='email']").value;
    dispatch(postEmailLink(email));
  };
  
  useEffect( () => {
    dispatch(getResetPassword());
  }, [csrf_token])

  return (
    <>
      <p className="heading">{props.translate("resetpw.heading-add-email")}</p>
      <EmailForm sendLink={sendLink} {...props} />
      <div className="return-login-link">
        <a href={"/login"}>
          {props.translate("resetpw.return-login")}
        </a>
      </div>
    </>
  );
}

ResetPasswordMain.propTypes = {
};

export default i18n(withRouter(ResetPasswordMain));