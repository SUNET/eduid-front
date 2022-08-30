import { storeCsrfToken } from "commonConfig";
import expect from "expect";
import { call } from "redux-saga/effects";
import {
  callUsernamePasswordSaga,
  postUsernamePasswordSaga,
} from "../../login/redux/sagas/login/postUsernamePasswordSaga";
import postRequest from "../../login/redux/sagas/postDataRequest";
import loginSlice from "../../login/redux/slices/loginSlice";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
    post_to: "https://idp.eduid.docker/pw_auth",
  },
};

const testUsername = "test_username";
const testPassword = "test_password";
const action = callUsernamePasswordSaga(testUsername, testPassword);

const successResponse = {
  type: "POST_IDP_PW_AUTH_SUCCESS",
  payload: {
    csrf_token: "csrf-token",
    message: "success",
    finished: true,
  },
};

const failResponse = {
  type: "POST_IDP_PW_AUTH_FAIL",
  error: true,
  payload: {
    csrf_token: "csrf-token",
    message: "error",
  },
};

describe("API call to /pw_auth behaves as expected on _SUCCESS", () => {
  const generator = postUsernamePasswordSaga(action);
  let next = generator.next();
  next = generator.next(fakeState);
  expect(next.value.PUT.action.type).toEqual("LOAD_DATA_REQUEST");
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: fakeState.login.ref,
      csrf_token: fakeState.config.csrf_token,
      username: action.payload.testUsername,
      password: action.payload.testPassword,
    };
    const url = fakeState.login.post_to;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));
  });
  it("_SUCCESS response is followed by the expected action types", () => {
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual(storeCsrfToken.type);
  });
  it("{finished: true} fires api call to /next loop ", () => {
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual(loginSlice.actions.callLoginNext.toString());
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("LOAD_DATA_COMPLETE");
  });
  it("done", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("API call to /pw_auth behaves as expected on _FAIL", () => {
  const generator = postUsernamePasswordSaga(action);
  let next = generator.next();
  next = generator.next(fakeState);
  expect(next.value.PUT.action.type).toEqual("LOAD_DATA_REQUEST");
  it("saga posts unexpected data", () => {
    const dataToSend = {
      ref: fakeState.login.ref,
      csrf_token: fakeState.config.csrf_token,
      username: "incorrect-username",
      password: action.payload.password,
    };
    const url = fakeState.login.post_to;
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, dataToSend));
  });
  it("_FAIL response is followed by the expected action types", () => {
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual(storeCsrfToken.type);
    next = generator.next();
    expect(next.value.PUT.action).toEqual(failResponse);
  });
  it("done", () => {
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("LOAD_DATA_COMPLETE");
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
