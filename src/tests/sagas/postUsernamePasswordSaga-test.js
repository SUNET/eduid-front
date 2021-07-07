import expect from "expect";
import { call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postUsernamePasswordSaga } from "../../login/redux/sagas/login/postUsernamePasswordSaga";

describe("initial API call to /next fires", () => {
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

  it("postUsernamePasswordSaga SUCCESS response is followed by 'NEW_CSRF_TOKEN' and 'LOAD_DATA_COMPLETE'", () => {
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
    expect(next.value.PUT.action.type).toEqual("LOAD_DATA_COMPLETE");
  });
});
