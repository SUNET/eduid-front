import expect from "expect";
import { call } from "redux-saga/effects";
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
  },
};

describe("API call to /next behaves as expected on _SUCCESS", () => {
  const generator = postRefLoginSaga();
  let next = generator.next();
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
    };
    const url = fakeState.config.next_url;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));
  });

  it("_SUCCESS response is followed by the expected action types", () => {
    const successResponse = {
      type: "POST_IDP_NEXT_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success",
      },
    };
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_NEXT_SUCCESS");
  });
  it("_SUCCESS response removes success notification", () => {
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("RM_ALL_NOTIFICATION");
  });
  it("done after 'RM_ALL_NOTIFICATION'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("API call to /next behaves as expected on _FAIL", () => {
  const generator = postRefLoginSaga();
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const url = fakeState.config.next_url;
    const dataToSend = {
      ref: "incorrect-ref",
      csrf_token: "csrf-token",
    };
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, dataToSend));
  });
  it("_FAIL response is followed by the expected action types", () => {
    const failResponse = {
      type: "POST_IDP_NEXT_FAIL",
      error: true,
      payload: {
        csrf_token: "csrf-token",
        message: "error",
      },
    };
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_NEXT_FAIL");
    expect(failResponse).toEqual(postRefFail("error"));
  });
  it("done after 'POST_IDP_NEXT_FAIL'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
