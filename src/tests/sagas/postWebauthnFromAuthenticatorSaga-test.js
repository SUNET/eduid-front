import expect from "expect";
import { call } from "redux-saga/effects";
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postWebauthnFromAuthenticatorSaga } from "../../login/redux/sagas/login/postWebauthnFromAuthenticatorSaga";
import { postWebauthnFromAuthenticatorFail } from "../../login/redux/actions/postWebauthnFromAuthenticatorActions";
import { safeEncode } from "../../login/app_utils/helperFunctions/authenticatorAssertion";

/* safeEncode() relies on the DOM, uncomment below to run test in file */
// import { JSDOM } from "jsdom";
// const mockDom = `<!doctype html><html><body></body></html>`;
// const { document } = new JSDOM(mockDom).window;
// global.window = document.defaultView;

const fakeState = {
  config: {
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
    post_to: "https://idp.eduid.docker/mfa_auth",
    mfa: {
      webauthn_assertion: {
        rawId: "dummy-rawId",
        response: {
          authenticatorData: "dummy-authenticatorData",
          clientDataJSON: "dummy-clientDataJSON",
          signature: "dummy-signature",
        },
      },
    },
  },
};

describe("second API call to /mfa_auth behaves as expected on _SUCCESS", () => {
  const generator = postWebauthnFromAuthenticatorSaga();
  let next = generator.next();
  it("saga posts the expected data", () => {
    const url = fakeState.login.post_to;
    const assertion = fakeState.login.mfa.webauthn_assertion;
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      webauthn_response: {
        credentialId: safeEncode(assertion.rawId),
        authenticatorData: safeEncode(assertion.response.authenticatorData),
        clientDataJSON: safeEncode(assertion.response.clientDataJSON),
        signature: safeEncode(assertion.response.signature),
      },
    };
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));
  });
  it("_SUCCESS response is followed by the expected action types", () => {
    const successResponse = {
      type: "POST_IDP_MFA_AUTH_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success",
        finished: true,
      },
    };
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_MFA_AUTH_SUCCESS");
  });
  // it("{finished: true} fires api call to /next loop ", () => {
  //   next = generator.next();
  //   expect(next.value.PUT.action.type).toEqual("POST_LOGIN_REF_TO_NEXT");
  // });
  it("done after 'POST_IDP_MFA_AUTH_SUCCESS'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("second API call to /mfa behaves as expected on _FAIL", () => {
  const generator = postWebauthnFromAuthenticatorSaga();
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const dataToSend = {
      ref: "incorrect-dummy-ref",
      csrf_token: "csrf-token",
      webauthn_response: {
        credentialId: safeEncode("incorrect-id"),
        authenticatorData: safeEncode("incorrect-authenticatorData"),
        clientDataJSON: safeEncode("incorrect-clientDataJSON"),
        signature: safeEncode("incorrect-signature"),
      },
    };
    const url = fakeState.login.post_to;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, dataToSend));
  });
  it("_FAIL response is followed by the expected action types", () => {
    const failResponse = {
      type: "POST_WEBAUTHN_ASSERTION_FAIL",
      error: true,
      payload: {
        csrf_token: "csrf-token",
        message: "error",
      },
    };
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_WEBAUTHN_ASSERTION_FAIL");
    expect(failResponse).toEqual(postWebauthnFromAuthenticatorFail("error"));
  });
  it("done after 'POST_WEBAUTHN_ASSERTION_FAIL'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
