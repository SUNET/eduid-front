const mock = require("jest-mock");
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import * as actions from "actions/LookupMobileProofing";
import lookupMobileProofingReducer from "reducers/LookupMobileProofing";
import LookupMobileProofing from "components/LookupMobileProofing";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import LookupMobileProofingContainer from "containers/LookupMobileProofing";

const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

describe("lookup mobile proofing Actions", () => {
  it("should create an action to trigger checking a mobile phone", () => {
    const expectedAction = {
      type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING
    };
    expect(actions.postLookupMobile()).toEqual(expectedAction);
  });

  it("should create an action to signal an error checking a mobile phone", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
      error: true,
      payload: {
        error: "Bad error",
        message: "Bad error"
      }
    };
    expect(actions.postLookupMobileFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    failed: false,
    error: ""
  };

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING
      })
    ).toEqual({
      failed: false,
      error: ""
    });
  });

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS
      })
    ).toEqual({
      failed: false
    });
  });

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      failed: true,
      error: "Bad error"
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({
      failed: false,
      error: ""
    });
  });
});

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

const fakeState = {
  lookup_mobile: {
    failed: false,
    error: ""
  },
  config: {
    LOOKUP_MOBILE_PROOFING_URL: "http://localhost/lookup-mobile",
    csrf_token: "dummy-token"
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

function setupComponent(store) {
  const props = {
    handleLookupMobile: mock.fn()
  };

  const wrapper = mount(
    <Provider store={store}>
      <LookupMobileProofingContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

describe("LookupMobileProofing Component", () => {
  it("Renders", () => {
    const store = fakeStore(fakeState),
      { wrapper, props } = setupComponent(store),
      form = wrapper.find("form"),
      fieldset = wrapper.find("fieldset"),
      button = wrapper.find("EduIDButton");

    expect(form.hasClass("form-horizontal")).toBeTruthy();
    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.contains(button.get(0))).toBeTruthy();

    expect(form.props()).toMatchObject({ role: "form" });
    expect(store.dispatch.mock.calls.length).toEqual(0);
    button.props().onClick();
    expect(store.dispatch.mock.calls.length).toEqual(1);
  });
});

describe("LookupMobileProofing Container", () => {
  let fulltext, mockProps, wrapper, dispatch;

  beforeEach(() => {
    const store = fakeStore(fakeState);

    wrapper = mount(
      <Provider store={store}>
        <LookupMobileProofingContainer />
      </Provider>
    );

    fulltext = wrapper.find(LookupMobileProofingContainer).text();
    dispatch = store.dispatch;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Clicks", () => {
    fetchMock.post("http://localhost/lookup-mobile", {
      type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS,
      payload: {}
    });

    expect(dispatch.mock.calls.length).toEqual(0);
    wrapper
      .find("Button")
      .props()
      .onClick();
    expect(dispatch.mock.calls.length).toEqual(1);
  });
});

import {
  requestLookupMobileProof,
  fetchLookupMobileProof
} from "../sagas/LookupMobileProofing";
import { put, call, select } from "redux-saga/effects";

describe("Async component", () => {
  it("Sagas requestLookupMobileProof", () => {
    const generator = requestLookupMobileProof();

    let next = generator.next();
    next = generator.next(fakeState);

    const action = {
      type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS,
      payload: {
        csrf_token: "dummy-token"
      }
    };

    generator.next(action);
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});
