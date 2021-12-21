import { useAppDispatch } from "login/app_init/hooks";
import { LoginAppDispatch } from "login/app_init/initStore";
import { callUsernamePasswordSaga } from "login/redux/sagas/login/postUsernamePasswordSaga";
import React from "react";
import { connect } from "react-redux";
import Form from "reactstrap/lib/Form";
import { reduxForm, submit } from "redux-form";
import emptyValueValidation from "../../../app_utils/validation/emptyValueValidation";
import { validate as validateEmail } from "../../../app_utils/validation/validateEmail";
import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";

interface UsernamePwFormData {
  email?: string;
  "current-password"?: string;
}

export const submitUsernamePassword = (values: UsernamePwFormData, dispatch: LoginAppDispatch) => {
  const { email, "current-password": currentPassword } = values;
  if (email && currentPassword) {
    dispatch(callUsernamePasswordSaga({ email, currentPassword }));
  }
};

export const validateLoginForm = (values: UsernamePwFormData, ownProps: { pristine: boolean }): UsernamePwFormData => {
  const { "current-password": currentPassword } = values;
  let errors: UsernamePwFormData = {};
  if (!ownProps.pristine) {
    // prevent activation of validation when input is empty
    errors = { ...errors, ...validateEmail(values) };
  }
  errors = {
    ...errors,
    ...emptyValueValidation({
      ["current-password"]: currentPassword,
    }),
  };

  return errors;
};

function UsernamePwForm() {
  const dispatch = useAppDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.which === 13) {
      // e.which === 13, event is to click the enter button
      e.preventDefault();
      dispatch(submit("usernamePwForm"));
    }
  };

  return (
    <Form id="login-form" aria-label="login form" onKeyDown={(e) => handleKeyDown(e)}>
      <EmailInput autoFocus={true} required={true} />
      <PasswordInput />
    </Form>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UsernamePwFormProps {}

const ReduxUsernamePwForm = reduxForm<UsernamePwFormData, UsernamePwFormProps>({
  form: "usernamePwForm",
  validate: validateLoginForm,
  onSubmit: submitUsernamePassword,
})(UsernamePwForm);

const ConnectedUsernamePwForm = connect(() => ({
  initialValues: {
    email: "",
    ["current-password"]: "",
  },
  destroyOnUnmount: false,
  touchOnChange: true,
}))(ReduxUsernamePwForm);

export default ConnectedUsernamePwForm;
