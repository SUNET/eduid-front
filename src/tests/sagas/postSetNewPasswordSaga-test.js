import expect from "expect";
import { call } from "redux-saga/effects";
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postSetNewPassword } from "../../login/redux/sagas/resetpassword/postSetNewPasswordSaga";
import { setNewPasswordFail } from "../../login/redux/actions/postResetNewPasswordActions";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
    reset_password_url: "https://idp.eduid.docker/services/reset-password/",
  },
  resetPassword: {
    email_code: "f11e2b93-0285-40f9-9081-133b055c60f8",
    new_password: "fake password" 
  },
};

describe(`API call to "new-password/" behaves as expected on _SUCCESS`, () => {
  const generator = postSetNewPassword();
  let next = generator.next();

  it("saga posts the expected data", () => {
    const data = {
      email_code: fakeState.resetPassword.email_code,
      csrf_token: fakeState.config.csrf_token,
      password: fakeState.resetPassword.new_password,
    };

    const url = fakeState.config.reset_password_url + "new-password/";
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, data));
  });
  
  it("_SUCCESS response is followed by the expected action types", () => {
   const successResponse = {
      type: "POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS",
      payload: {
        csrf_token: fakeState.config.csrf_token,
        message: "success",
      },
    };
  next = generator.next(successResponse);
  expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
  next = generator.next();
  expect(next.value.PUT.action.type).toEqual("POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS");
  });
});

describe(`first API call to "new-password/" behaves as expected on _FAIL`, () => {
  const generator = postSetNewPassword();
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const data = {
      email_code: "state not found",
      csrf_token: fakeState.config.csrf_token,
      password: "fake password"
    };
    const url = fakeState.config.reset_password_url +"new-password/";
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, data));
  });
  it("_FAIL response is followed by the expected action types", () => {
    const failResponse = {
      type: "POST_RESET_PASSWORD_NEW_PASSWORD_FAIL",
      error: true,
      payload: {
        csrf_token: fakeState.config.csrf_token,
        message: "error",
      },
    };
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_RESET_PASSWORD_NEW_PASSWORD_FAIL");
    expect(failResponse).toEqual(setNewPasswordFail("error"));
  });
  it(`done after "POST_RESET_PASSWORD_NEW_PASSWORD_FAIL"`, () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});