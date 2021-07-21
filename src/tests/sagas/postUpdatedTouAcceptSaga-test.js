import expect from "expect";
import { put, call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postUpdatedTouAcceptSaga } from "../../login/redux/sagas/login/postUpdatedTouAcceptSaga";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
    next_page: "TOU",
    post_to: "https://idp.eduid.docker/tou",
  },
};

describe("API call to /tou fires", () => {
  it("postUpdatedTouAcceptSaga posts the expected data", () => {
    const action = {
      type: "POST_UPDATED_TOU_ACCEPT",
      payload: {
        user_accepts: "2016-v1",
      },
    };

    const generator = postUpdatedTouAcceptSaga(action);
    generator.next(fakeState);

    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      user_accepts: action.payload.user_accepts,
    };
    const url = fakeState.login.post_to;
    const resp = generator.next(fakeState).value;
    expect(resp).toEqual(call(postRequest, url, dataToSend));
  });

  it("postUpdatedTouAcceptSaga SUCCESS response is followed by 'NEW_CSRF_TOKEN'", () => {
    let action = {
      type: "POST_UPDATED_TOU_ACCEPT",
      payload: {
        user_accepts: "2016-v1",
      },
    };

    const generator = postUpdatedTouAcceptSaga(action);
    let next = generator.next(fakeState);

    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      user_accepts: action.payload.user_accepts,
    };
    const url = fakeState.login.post_to;
    const resp = generator.next(fakeState).value;
    expect(resp).toEqual(call(postRequest, url, dataToSend));

    action = {
      type: "POST_IDP_TOU_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success",
      },
    };

    // next = generator.next(action);
    // expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});

describe("incorrect user details leads to an error response", () => {
  //  it("postUpdatedTouAcceptSaga posts the expected data", () => {
  let action = {
    type: "POST_UPDATED_TOU_ACCEPT",
    payload: {
      user_accepts: "2016-v1",
    },
  };

  const generator = postUpdatedTouAcceptSaga(action);
  let next = generator.next(fakeState);

  it("_FAIL response from backend when missing user_accepts", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      user_accepts: "",
    };
    const url = fakeState.login.post_to;
    const resp = generator.next(fakeState).value;
    expect(resp).not.toEqual(call(postRequest, url, dataToSend));

    action = {
      type: "POST_IDP_TOU_FAIL",
      error: true,
      payload: {
        message: "error",
      },
    };

    next = generator.next(action);
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_TOU_FAIL");
  });
});
