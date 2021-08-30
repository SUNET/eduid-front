import expect from "expect";
import { call } from "redux-saga/effects";
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postEmailLink } from "../../login/redux/sagas/resetpassword/postResetPasswordSaga";
import { postEmailLinkFail } from "../../login/redux/actions/postResetPasswordActions";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
    reset_password_url: "https://idp.eduid.docker/services/reset-password/",
  },
  resetPassword: {
    email_address: "test@test.se",
  },
};

describe(`API call to "/" behaves as expected on _SUCCESS`, () => {
  const generator = postEmailLink();
  let next = generator.next();
  it("saga posts the expected data", () => {
    const data = {
      email: fakeState.resetPassword.email_address,
      csrf_token: fakeState.config.csrf_token
    };
    const url = fakeState.config.reset_password_url;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, data));
  });
  it("_SUCCESS response is followed by the expected action types", () => {
    const successResponse = {
      type: "POST_RESET_PASSWORD_SUCCESS",
      payload: {
        csrf_token: fakeState.config.csrf_token,
        message: "success",
        email_address: fakeState.resetPassword.email_address
      },
    };
  next = generator.next(successResponse);
  expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
  next = generator.next();
  expect(next.value.PUT.action.type).toEqual("POST_RESET_PASSWORD_SUCCESS");
  });
});

describe(`first API call to "/" behaves as expected on _FAIL`, () => {
  const generator = postEmailLink();
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const data = {
      email: "not found user",
      csrf_token: fakeState.config.csrf_token
    };
    const url = fakeState.config.reset_password_url;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, data));
  });
  it("_FAIL response is followed by the expected action types", () => {
    const failResponse = {
      type: "POST_RESET_PASSWORD_FAIL",
      error: true,
      payload: {
        csrf_token: fakeState.config.csrf_token,
        message: "error",
      },
    };
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_RESET_PASSWORD_FAIL");
    expect(failResponse).toEqual(postEmailLinkFail("error"));
  });
  it("done after 'POST_RESET_PASSWORD_FAIL'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});