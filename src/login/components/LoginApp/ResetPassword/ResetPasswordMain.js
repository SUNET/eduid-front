import React, {useEffect} from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useSelector, useDispatch,  } from 'react-redux';
import {getResetPassword, postResetPassword} from "../../../redux/actions/resetPasswordActions"
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import { connect } from "react-redux";

const ResetPasswordMain = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.config.csrf_token);

  let EmailForm = () => (
    <Form id="reset-password-form" role="form" onSubmit={props.handleEmail}>
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
        id="register-button"
        disabled={props.invalid}
        onClick={()=> dispatch(postResetPassword())}
      >
        {props.translate("resetpass.send-link")}
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

  useEffect( () => {
    dispatch(getResetPassword());
  }, [state])

  return (
    <>
      <EmailForm {...props} />
    </>
  );
}

ResetPasswordMain.propTypes = {
};

export default i18n(withRouter(ResetPasswordMain));