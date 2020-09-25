import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import * as actions from "actions/Eidas";
import eidasReducer from "reducers/Eidas";
import Eidas from "components/Eidas";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import EidasContainer from "containers/Eidas";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

describe("Eidas Actions", () => {
  it("should create an action to trigger modal window", () => {
    const expectedAction = {
      type: actions.SHOW_EIDAS_MODAL
    };
    expect(actions.showEidasModal()).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    eidas_sp_freja_idp_url: "",
    showModal: false
  };

  it("Receives a SHOW_EIDAS_MODAL action", () => {
    expect(
      eidasReducer(mockState, {
        type: actions.SHOW_EIDAS_MODAL
      })
    ).toEqual({
      eidas_sp_freja_idp_url: "",
      showModal: true
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      eidasReducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({
      eidas_sp_freja_idp_url: "",
      showModal: false
    });
  });
});

const state = {
  config: {
    eidas_url: "http://eidas.localhost",
    token_verify_idp: "http://idp.localhost",
    csrf_token: "csrf-token"
  },
  intl: {
    locale: "en",
    messages: messages
  }
};
