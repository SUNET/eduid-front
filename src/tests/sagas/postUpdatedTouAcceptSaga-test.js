import expect from "expect";
import { put, call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postUpdatedTouAcceptSaga } from "../../login/redux/sagas/login/postUpdatedTouAcceptSaga";

describe("API call to /tou fires", () => {
  const fakeState = {
    config: {
      csrf_token: "csrf-token",
    },
    login: {
      ref: "dummy-ref",
      next_page: "TOU",
    },
  };

  it("postUpdatedTouAcceptSaga posts the expected data", () => {
    const action = {
      type: "POST_UPDATED_TOU_ACCEPT",
      payload: {
        user_accepts: "2016-v1",
      },
    };

    const generator = postUpdatedTouAcceptSaga(action);
    generator.next();
    generator.next(fakeState);
    generator.next();

    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
      user_accepts: action.payload.user_accepts,
    };
    const url = "https://idp.eduid.docker/tou";
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
    let next = generator.next();
    next = generator.next(fakeState);
    next = generator.next();

   const dataToSend = {
     ref: "dummy-ref",
     csrf_token: "csrf-token",
     user_accepts: action.payload.user_accepts,
   };
    const url = "https://idp.eduid.docker/tou";
    const resp = generator.next(fakeState).value;
    expect(resp).toEqual(call(postRequest, url, dataToSend));

    action = {
      type: "POST_IDP_TOU_SUCCESS",
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
