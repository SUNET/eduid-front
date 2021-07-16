import expect from "expect";
import { put, call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postUsernamePasswordSaga } from "../../login/redux/sagas/login/postUsernamePasswordSaga";

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
  it("postUsernamePasswordSaga posts the expected data", () => {
    const action = {
      type: "POST_USERNAME_PASSWORD,",
      payload: {
        username: "username",
        password: "password",
      },
    };

    const generator = postUsernamePasswordSaga(action);
    generator.next();
    generator.next(fakeState);

    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      username: action.payload.username,
      password: action.payload.password,
    };
    const url = "https://idp.eduid.docker/pw_auth";
    const resp = generator.next(fakeState).value;
    expect(resp).toEqual(call(postRequest, url, dataToSend));
  });

  it("postUsernamePasswordSaga SUCCESS response is followed by 'NEW_CSRF_TOKEN", () => {
    let action = {
      type: "POST_USERNAME_PASSWORD,",
      payload: {
        username: "username",
        password: "password",
      },
    };

    const generator = postUsernamePasswordSaga(action);
    let next = generator.next();
    next = generator.next(fakeState);

    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      username: "username",
      password: "password",
    };
    const url = "https://idp.eduid.docker/pw_auth";
    const resp = generator.next(fakeState).value;
    expect(resp).toEqual(call(postRequest, url, dataToSend));

    action = {
      type: "POST_IDP_PW_AUTH_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success",
      },
    };

    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});

describe("incorrect user details leads to an error response", () => {
  let action = {
    type: "POST_USERNAME_PASSWORD,",
    payload: {
      username: "username",
      password: "password",
    },
  };

  const generator = postUsernamePasswordSaga(action);
  let next = generator.next();
  next = generator.next(fakeState);
  it("_FAIL response from backend when missing username", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      username: "",
      password: "password",
    };
    const url = "https://idp.eduid.docker/pw_auth";
    const resp = generator.next(fakeState).value;
    expect(resp).not.toEqual(call(postRequest, url, dataToSend));

    action = {
      type: "POST_IDP_PW_AUTH_FAIL",
      error: true,
      payload: {
        message: "error",
      },
    };

    next = generator.next(action);
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_PW_AUTH_FAIL");
  });
});
