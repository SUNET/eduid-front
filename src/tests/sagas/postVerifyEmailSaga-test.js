import expect from "expect";
import { call } from "redux-saga/effects";
import postRequest from "../../login/redux/sagas/postDataRequest";
import { requestLinkCode } from "../../login/redux/sagas/resetpassword/postVerifyEmailSaga";
import resetPasswordSlice from "../../login/redux/slices/resetPasswordSlice";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
    reset_password_url: "https://idp.eduid.docker/services/reset-password/",
  },
  resetPassword: {
    email_code: "f11e2b93-0285-40f9-9081-133b055c60f8",
  },
};

describe("API call to /verify-email/ behaves as expected on _SUCCESS", () => {
  const generator = requestLinkCode();
  let next = generator.next();
  it("saga posts the expected data", () => {
    const data = {
      email_code: fakeState.resetPassword.email_code,
      csrf_token: fakeState.config.csrf_token,
    };
    const url = fakeState.config.reset_password_url + "verify-email/";
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, data));
  });
  it("_SUCCESS response is followed by the expected action types", () => {
    const successResponse = {
      type: resetPasswordSlice.actions.resetPasswordVerifyEmailSuccess.toString(),
      payload: {
        csrf_token: fakeState.config.csrf_token,
        message: "success",
        email_code: fakeState.resetPassword.email_code,
      },
    };
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual(successResponse.type);
  });
  it("done", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe(`first API call to "/verify-email/" behaves as expected on _FAIL`, () => {
  const generator = requestLinkCode();
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const data = {
      email_code: "state not found",
      csrf_token: fakeState.config.csrf_token,
    };
    const url = fakeState.config.reset_password_url;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, data));
  });
  it("_FAIL response is followed by the expected action types", () => {
    const failResponse = {
      type: "POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL",
      error: true,
      payload: {
        csrf_token: fakeState.config.csrf_token,
        message: "error",
      },
    };
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual(
      "POST_RESET_PASSWORD_VERIFY_EMAIL_FAIL"
    );
  });
  it("done", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
