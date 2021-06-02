const mock = require("jest-mock");
const messages = require("../../login/translation/messageIndex");
import React from "react";
import expect from "expect";
import { put, call } from "redux-saga/effects";
import { addLocaleData } from "react-intl";
addLocaleData("react-intl/locale-data/en");
import postRequest from "../../login/redux/sagas/postDataRequest";
import { postRefLoginSaga } from "../../login/redux/sagas/login/postRefLoginSaga";

const baseState = {
  login: {
    ref: null,
    next_page: null,
    message: "",
    payload: "",
  },
  form: [],
  intl: {
    locale: "en",
    messages: messages,
  },
};

const fakeStore = (fakeState) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...fakeState }),
});

function getFakeState(newState) {
  if (newState === undefined) {
    newState = {};
  }
  return Object.assign(baseState, newState);
}

describe("Async component", () => {
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

  it("postRefLoginSaga posts the expected data", () => {
    const generator = postRefLoginSaga();
    let next = generator.next();
    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
    };

    const url = fakeState.config.next_url;
    const resp = generator.next(fakeState);
    expect(resp.value).toEqual(call(postRequest, url, dataToSend));
  });

  it("postRefLoginSaga SUCCESS response is followed by 'NEW_CSRF_TOKEN'", () => {
    const generator = postRefLoginSaga();
    let next = generator.next();

    const dataToSend = {
      ref: "dummy-ref",
      csrf_token: "csrf-token",
    };

    const url = fakeState.config.next_url;
    const resp = generator.next(fakeState);
    expect(resp.value).toEqual(call(postRequest, url, dataToSend));

    const action = {
      type: "POST_IDP_NEXT_SUCCESS",
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
