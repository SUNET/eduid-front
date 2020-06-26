const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { mount } from "enzyme";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";

import { genSetupComponent, getState } from "tests/ActionMain-test";
import MainContainer from "./component";
import { actionReducer } from "./store";
import * as actions from "actions/ActionMain";
import { requestPostAcceptTOU, postAcceptTOU } from "./root-saga";

const pluginState = {
  tous: {
    en: "Testing ToU",
    sv: "Testa ToU"
  },
  version: "test-version"
};

const setupComponent = genSetupComponent(pluginState);

describe("ToU Component", () => {
  it("Renders the splash screen", () => {
    const wrapper = setupComponent({
        component: <MainContainer />,
        overrides: { config: { is_app_loaded: false } }
      }),
      splash = wrapper.find("div#eduid-splash-screen");

    expect(splash.length).toEqual(1);
  });

  it("Renders", () => {
    const wrapper = setupComponent({ component: <MainContainer /> }),
      splash = wrapper.find("div#eduid-splash-screen"),
      tou = wrapper.find("div#eduid-tou"),
      buttonAccept = wrapper.find("button#accept-tou-button");
      // buttonReject = wrapper.find("button#reject-tou-button");

    expect(splash.length).toEqual(0);
    expect(tou.length).toEqual(1);
    expect(buttonAccept.length).toEqual(1);
    // expect(buttonReject.length).toEqual(1);
    expect(tou.text()).toEqual("Testing ToU");
  });

  it("Renders Svenska", () => {
    const wrapper = setupComponent({
        component: <MainContainer />,
        overrides: { intl: { locale: "sv" } }
      }),
      tou = wrapper.find("div#eduid-tou");

    expect(tou.length).toEqual(1);
    expect(tou.text()).toEqual("Testa ToU");
  });
});

describe("ToU action reducer", () => {
  const mockState = {
    tous: {},
    version: ""
  };

  it("Receives plugin config loaded action", () => {
    const newTous = { en: "en", sv: "sv" },
      newVersion = "test-version";
    expect(
      actionReducer(mockState, {
        type: actions.GET_ACTIONS_CONFIG_SUCCESS,
        payload: {
          tous: newTous,
          version: newVersion
        }
      })
    ).toEqual({
      ...mockState,
      tous: newTous,
      version: newVersion
    });
  });
});

describe("ToU plugin async actions", () => {
  it("Tests the post ToU accepted saga", () => {
    const state = getState({
      config: {
        csrf_token: "dummy-token"
      },
      plugin: {
        version: "dummy version"
      }
    });
    const data = {
      accept: true,
      version: state.plugin.version,
      csrf_token: state.config.csrf_token
    };
    const generator = postAcceptTOU();
    generator.next();
    let resp = generator.next(state);
    expect(resp.value).toEqual(call(requestPostAcceptTOU, data));

    const action = {
      type: actions.POST_ACTIONS_ACTION_SUCCESS,
      payload: {
        csrf_token: "csrf-token"
      }
    };
    generator.next(action);
    delete action.payload.csrf_token;
    resp = generator.next();
    expect(resp.value).toEqual(put(action));
  });
});
