import expect from "expect";
import { put, call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postRefLoginSaga } from "../../login/redux/sagas/login/postRefLoginSaga";
import { postRefFail } from "../../login/redux/actions/postRefLoginActions";

const fakeState = {
  config: {
    next_url: "http://localhost/next",
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
    next_page: "USERNAMEPASSWORD",
  },
};

describe("initial API call to /next fires", () => {
  it("postRefLoginSaga posts the expected data", () => {
    const generator = postRefLoginSaga();
    generator.next();
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
    };
    const url = fakeState.config.next_url;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));
  });

  it("postRefLoginSaga SUCCESS response is followed by 'NEW_CSRF_TOKEN'", () => {
    const generator = postRefLoginSaga();
    let next = generator.next();
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
    };
    const url = fakeState.config.next_url;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));

    // mock _SUCCESS response
    const response = {
      type: "POST_IDP_NEXT_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success",
      },
    };
    next = generator.next(response);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value).toEqual(put(response));
    // remove notifications on _SUCCESS
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("RM_ALL_NOTIFICATION");
  });
});

describe("incorrect user details leads to an error response", () => {
  const generator = postRefLoginSaga();
  let next = generator.next();
  it("_FAIL response from backend when ref incorrect", () => {
    const url = fakeState.config.next_url;
    const dataToSend = {
      ref: "incorrect-ref",
      csrf_token: "csrf-token",
    };
    const apiCall = generator.next(fakeState).value;
    // sending incorrect-ref does not result in the same values as saga
    expect(apiCall).not.toEqual(call(postRequest, url, dataToSend));
    // mock _FAIL response
    const response = {
      type: "POST_IDP_NEXT_FAIL",
      error: true,
      payload: {
        csrf_token: "csrf-token",
        message: "error",
      },
    };
    next = generator.next(response);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    // mock _FAIL response is equal to _FAIL action
    expect(response).toEqual(postRefFail("error"));
    expect(next.value.PUT.action.type).toEqual("POST_IDP_NEXT_FAIL");
  });
});
