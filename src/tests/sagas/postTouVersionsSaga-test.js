import expect from "expect";
import { call } from "redux-saga/effects";
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postTouVersionsSaga } from "../../login/redux/sagas/login/postTouVersionsSaga";
import loginSlice from "../../login/redux/slices/loginSlice";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
    post_to: "https://idp.eduid.docker/tou",
  },
};
const testTouVersions = ["2016-v1", "2021-v1"];
const action = loginSlice.actions.postTouVersions(testTouVersions);

describe("first API call to /tou behaves as expected on _SUCCESS", () => {
  const generator = postTouVersionsSaga(action);
  let next = generator.next();
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: fakeState.login.ref,
      csrf_token: fakeState.config.csrf_token,
      versions: testTouVersions.toString(), // TODO: backend should be changed to expect an array, and toString removed
    };
    const url = fakeState.login.post_to;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));
  });
  it("_SUCCESS response is followed by the expected action types", () => {
    const successResponse = {
      type: "POST_IDP_TOU_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        version: "2016-v1",
        finished: false,
      },
    };
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("login/postIdpTouSuccess");
  });
  it("done", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("first API call to /tou behaves as expected on _FAIL", () => {
  const generator = postTouVersionsSaga(action);
  let next = generator.next();
  it("saga posts the unexpected data", () => {
    const dataToSend = {
      ref: fakeState.login.ref,
      csrf_token: fakeState.config.csrf_token,
      versions: "1997-v3",
    };
    const url = fakeState.login.post_to;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, dataToSend));
  });
  it("_FAIL response is followed by the expected action types", () => {
    const failResponse = {
      type: "POST_IDP_TOU_FAIL",
      error: true,
      payload: {
        csrf_token: "csrf-token",
        message: "error",
      },
    };
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action).toEqual(failResponse);
  });
  it("done", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
