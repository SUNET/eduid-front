import React from "react";
// import { Provider } from "react-intl-redux";
// import { mount } from "enzyme";
import jest from "jest";
import expect from "expect";
import { put, call } from "redux-saga/effects";

import { genSetupComponent, getState } from "tests/ActionMain-test";
import MainContainer from "./component";
import { actionReducer } from "./store";
import * as actions from "actions/ActionMain";
import { postCompleteWebauthn, requestCompleteWebauthn } from "./root-saga";

const mockCredentials = {
  get: () => {},
  create: () => {},
};

global.navigator.credentials = mockCredentials;

const pluginState = {
  webauthn_assertion: {},
};

const setupComponent = genSetupComponent(pluginState);

describe("Some Component", () => {
  it("Renders the splash screen", () => {
    const wrapper = setupComponent({
        component: <MainContainer />,
        overrides: { config: { is_app_loaded: false } },
      }),
      splash = wrapper.find("div#eduid-splash-screen");

    expect(splash.length).toEqual(1);
  });

  it("Renders", () => {
    const wrapper = setupComponent({ component: <MainContainer /> }),
      splash = wrapper.find("div#eduid-splash-screen"),
      title = wrapper.find("div.webauthn-title"),
      subtitle = wrapper.find("div.webauthn-subtitle"),
      animation = wrapper.find("div.key-animation"),
      fallback = wrapper.find("div#mfa-try-another-way");

    expect(splash.length).toEqual(0);
    expect(title.length).toEqual(1);
    expect(subtitle.length).toEqual(1);
    expect(animation.length).toEqual(1);
    // expect(title.text()).toEqual("Two-factor authentication");
    expect(fallback.length).toEqual(1);
  });

  it("Renders no webauthn", () => {
    const creds = window.navigator.credentials;
    Object.defineProperty(window.navigator, "credentials", {
      value: undefined,
      configurable: true,
    });

    const wrapper = setupComponent({ component: <MainContainer /> }),
      splash = wrapper.find("div#eduid-splash-screen"),
      title = wrapper.find("div.webauthn-title"),
      fallback = wrapper.find("div#mfa-try-another-way"),
      animation = wrapper.find("div.key-animation");

    expect(splash.length).toEqual(0);
    expect(title.length).toEqual(1);
    expect(fallback.length).toEqual(1);
    expect(animation.length).toEqual(0);
    expect(title.text()).toEqual("No support for security keys");

    Object.defineProperty(window.navigator, "credentials", {
      value: creds,
      configurable: true,
    });
  });
});

describe("Some action reducer", () => {
  const mockState = {
    webauthn_assertion: {},
  };

  it("Receives plugin config loaded action", () => {
    expect(
      actionReducer(mockState, {
        type: "WEBAUTHN_CREDS_GOT",
        payload: {
          dummy: "assertion",
        },
      })
    ).toEqual({
      ...mockState,
      webauthn_assertion: { dummy: "assertion" },
    });
  });
});

describe("Some plugin async actions", () => {
  it("Tests post webauthn response saga", () => {
    const assertion = {
        rawId: "dummy-id",
        response: {
          authenticatorData: new ArrayBuffer("dummy authn data"),
          clientDataJSON: new ArrayBuffer("dummy json"),
          signature: new ArrayBuffer("dummy signature"),
        },
      },
      state = getState({
        config: {
          csrf_token: "dummy-token",
          webauthn_options: "",
        },
        plugin: {
          webauthn_assertion: assertion,
        },
      });
    const data = {
      csrf_token: Buffer.from(
        String.fromCharCode.apply(null, new Uint8Array(assertion.rawId)),
        "base64"
      ),
      authenticatorData: Buffer.from(
        String.fromCharCode.apply(
          null,
          new Uint8Array(assertion.response.authenticatorData)
        ),
        "base64"
      ),
      clientDataJSON: Buffer.from(
        String.fromCharCode.apply(
          null,
          new Uint8Array(assertion.response.clientDataJSON)
        ),
        "base64"
      ),
      signature: Buffer.from(
        String.fromCharCode.apply(
          null,
          new Uint8Array(assertion.response.signature)
        ),
        "base64"
      ),
    };
    const generator = postCompleteWebauthn();
    generator.next();
    let resp = generator.next(state);
    expect(resp.value).toEqual(call(requestCompleteWebauthn, data));
    const action = {
      type: actions.POST_ACTIONS_ACTION_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };
    generator.next(action);
    delete action.payload.csrf_token;
    resp = generator.next();
    expect(resp.value).toEqual(put(action));
  });
});
