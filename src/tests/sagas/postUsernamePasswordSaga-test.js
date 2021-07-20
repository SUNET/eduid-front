import expect from "expect";
import { call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postUsernamePasswordSaga } from "../../login/redux/sagas/login/postUsernamePasswordSaga";
import { postUsernamePasswordFail } from "../../login/redux/actions/postUsernamePasswordActions"

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

const action = {
  type: "POST_USERNAME_PASSWORD,",
  payload: {
    username: "username",
    password: "password",
  },
};

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
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      username: action.payload.username,
      password: action.payload.password,
    };
    const url = "https://idp.eduid.docker/pw_auth";
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).toEqual(call(postRequest, url, dataToSend));
  });
  it("_SUCCESS response is followed by the expected action types", () => {
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_PW_AUTH_SUCCESS");
  });
  it("{finished: true} fires api call to /next loop ", () => {
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_LOGIN_REF_TO_NEXT");
  });
  it("done after 'LOAD_DATA_COMPLETE'", () => {
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("LOAD_DATA_COMPLETE");
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
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      username: "incorrect-username",
      password: action.payload.password,
    };
    const url = "https://idp.eduid.docker/pw_auth";
    const apiCall = generator.next(fakeState).value;
    expect(apiCall).not.toEqual(call(postRequest, url, dataToSend));
  });
  it("_FAIL response is followed by the expected action types", () => {
    next = generator.next(failResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_PW_AUTH_FAIL");
    expect(failResponse).toEqual(postUsernamePasswordFail("error"));
  });
  it("done after 'LOAD_DATA_COMPLETE'", () => {
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("LOAD_DATA_COMPLETE");
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
