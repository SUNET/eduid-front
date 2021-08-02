import expect from "expect";
import { call, put } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postRefForWebauthnChallengeSaga } from "../../login/redux/sagas/login/postRefForWebauthnChallengeSaga";
import { postRefForWebauthnChallengeFail } from "../../login/redux/actions/postRefForWebauthnChallengeActions";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
    post_to: "https://idp.eduid.docker/mfa_auth",
  },
};

describe("first API call to /mfa_auth behaves as expected on _SUCCESS", () => {
  const generator = postRefForWebauthnChallengeSaga();
  let next = generator.next();
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
    };
    const url = fakeState.login.post_to;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));
  });
  it("_SUCCESS response is followed by the expected action types", () => {
    const successResponse = {
      type: "POST_IDP_MFA_AUTH_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success",
        finished: false,
      },
    };
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_MFA_AUTH_SUCCESS");
  });
  it("done after 'POST_IDP_MFA_AUTH_SUCCESS'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("first API call to /mfa behaves as expected on _FAIL", () => {
  const generator = postRefForWebauthnChallengeSaga();
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const dataToSend = {
      ref: "incorrect-dummy-ref",
      csrf_token: "csrf-token",
    };
    const url = fakeState.login.post_to;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, dataToSend));
  });
  it("_FAIL response is followed by the expected action types", () => {
    const failResponse = {
      type: "POST_IDP_MFA_AUTH_FAIL",
      error: true,
      payload: {
        csrf_token: "csrf-token",
        message: "error",
      },
    };
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_MFA_AUTH_FAIL");
    expect(failResponse).toEqual(postRefForWebauthnChallengeFail("error"));
  });
  it("done after 'POST_IDP_MFA_AUTH_FAIL'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
