import expect from "expect";
import { call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
// first call to '/tou'
import { postTouVersionsSaga } from "../../login/redux/sagas/login/postTouVersionsSaga";
import { postTouVersionsFail } from "../../login/redux/actions/postTouVersionsActions";
// second call to '/tou'
import { postUpdatedTouAcceptSaga } from "../../login/redux/sagas/login/postUpdatedTouAcceptSaga";
import { updateTouAcceptFail } from "../../login/redux/actions/postUpdatedTouAcceptActions";

const fakeState = {
  config: {
    csrf_token: "csrf-token",
  },
  login: {
    ref: "dummy-ref",
  },
};
const versionsAction = {
  type: "POST_UPDATED_TOU_ACCEPT",
  payload: {
    versions: ["2016-v1", "2021-v1"],
  },
};
const acceptsAction = {
  type: "POST_UPDATED_TOU_ACCEPT",
  payload: {
    user_accepts: "2016-v1",
  },
};
const url = "https://idp.eduid.docker/tou";

describe("first API call to /tou behaves as expected on _SUCCESS", () => {
  const generator = postTouVersionsSaga(versionsAction);
  let next = generator.next();
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      versions: versionsAction.payload.versions.toString(),
    };
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
    expect(next.value.PUT.action.type).toEqual("POST_IDP_TOU_SUCCESS");
  });
  it("done after 'POST_IDP_TOU_SUCCESS'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("first API call to /tou behaves as expected on _FAIL", () => {
  const generator = postTouVersionsSaga(versionsAction);
  let next = generator.next();
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      versions: "1997-v3",
    };
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
    expect(failResponse).toEqual(postTouVersionsFail("error"));
  });
  it("done after 'POST_IDP_TOU_FAIL'", () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});

describe("second API call to /tou behaves as expected on _SUCCESS", () => {
  const generator = postUpdatedTouAcceptSaga(acceptsAction);
  let next = generator.next();
  it("saga posts the expected data", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      user_accepts: acceptsAction.payload.user_accepts,
    };
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
  const generator = postUpdatedTouAcceptSaga(acceptsAction);
  let next = generator.next();
  it("saga posts unexpected data", () => {
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      user_accepts: "1997-v3",
    };
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
