import expect from "expect";
import { call } from "redux-saga/effects";
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postUpdatedTouAcceptSaga } from "../../login/redux/sagas/login/postUpdatedTouAcceptSaga";
import { updateTouAcceptFail } from "../../login/redux/actions/postUpdatedTouAcceptActions";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
    post_to: "https://idp.eduid.docker/tou",
  },
};

const action = {
  type: "POST_UPDATED_TOU_ACCEPT",
  payload: {
    user_accepts: "2016-v1",
  },
};

describe("second API call to /tou behaves as expected on _SUCCESS", () => {
  const generator = postUpdatedTouAcceptSaga(action);
  let next = generator.next();
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: fakeState.login.ref,
      csrf_token: fakeState.config.csrf_token,
      user_accepts: action.payload.user_accepts,
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
        message: "success",
        finished: true,
      },
    };
    next = generator.next(successResponse);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_IDP_TOU_SUCCESS");
  });
  it("{finished: true} fires api call to /next loop ", () => {
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual("POST_LOGIN_REF_TO_NEXT");
  });
  it("done after 'POST_LOGIN_REF_TO_NEXT'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("second API call to /tou behaves as expected on _FAIL", () => {
  const generator = postUpdatedTouAcceptSaga(action);
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const dataToSend = {
      ref: fakeState.login.ref,
      csrf_token: fakeState.config.csrf_token,
      user_accepts: "1997-v3",
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
    expect(next.value.PUT.action.type).toEqual("POST_IDP_TOU_FAIL");
    expect(failResponse).toEqual(updateTouAcceptFail("error"));
  });
  it("done after 'POST_IDP_TOU_FAIL'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
