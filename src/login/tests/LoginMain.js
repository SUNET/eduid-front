import React from "react";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy } from "expect";

import { Spinner } from "spin.js";
import SplashContainer from "containers/Splash";
import Header from "containers/Header";
import Footer from "containers/Footer";
import LoginMainContainer from "login/LoginMain/LoginMain_container";
import Notifications from "containers/Notifications";

import loginReducer from "login/LoginMain/LoginMain_reducer";
import * as actions from "login/LoginMain/LoginMain_actions";
import * as sagas from "login/LoginMain/LoginMain_sagas";

import * as chpassActions from "actions/ChangePassword";

import { setupComponent, getState } from "./common";

describe("Login Main Component", () => {

  it("Renders the <SplashContainer/>", () => {
    const wrapper = setupComponent(<LoginMainContainer/>);
    const splash = wrapper.find(SplashContainer);
    expect(splash.exists()).toEqual(true);
  });

  it("Renders the <Header/> and <Footer/>", () => {
    const wrapper = setupComponent(<LoginMainContainer/>);
    const header = wrapper.find(Header);
    const footer = wrapper.find(Footer);
    expect(header.exists()).toEqual(true);
    expect(footer.exists()).toEqual(true);
  });

  it("The <Notifications/> component renders", () => {
    const wrapper = setupComponent(<LoginMainContainer/>);
    const notifications = wrapper.find(Notifications);
    expect(notifications.exists()).toEqual(true);
  });
});


describe("Main Login reducer", () => {

  it("Receives an appLoaded action", () => {
    const state = getState();
    const action = actions.appLoaded();
    const newState = loginReducer(state.config, action);
    expect(newState.is_app_loaded).toEqual(true);
  });

  it("Receives an newCsrfToken action", () => {
    const state = getState();
    const action = actions.newCsrfToken('dummy-token');
    const newState = loginReducer(state.config, action);
    expect(newState.csrf_token).toEqual('dummy-token');
  });

  it("Receives a configuration success action", () => {
    const state = getState();
    const action = {
      type: "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS",
      payload: {
        dummy_key: 'dummy-value'
      }
    };
    const newState = loginReducer(state.config, action);
    expect(newState.dummy_key).toEqual('dummy-value');
  });

  it("Receives a configuration from code success action", () => {
    const state = getState();
    const action = {
      type: "POST_RESET_PASSWORD_RESET_CONFIG_SUCCESS",
      payload: {
        dummy_key: 'dummy-value'
      }
    };
    const newState = loginReducer(state.config, action);
    expect(newState.dummy_key).toEqual('dummy-value');
  });

  it("Receives a configuration from code failure action", () => {
    const state = getState();
    const action = actions.postCodeFail("dummy-error");
    const newState = loginReducer(state.config, action);
    expect(newState.error).toEqual(true);
  });

  it("Receives an zxcvbn module", () => {
    const state = getState();
    const action = chpassActions.setZxcvbn("dummy-module");
    const newState = loginReducer(state.config, action);
    expect(newState.zxcvbn_module).toEqual('dummy-module');
  });
});

describe("Async component", () => {

  it("Sagas requestLoginConfig", () => {
    const generator = sagas.requestLoginConfig();

    next = generator.next();
    const config = state => state.config;
    const credentials = generator.next(config);
    expect(credentials.value).toEqual(call(fetchCredentials, config));

    const action = {
      type: actions.GET_LOGIN_CONFIG_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        password_service_url: "dummy-url",
        password_entropy: "25",
        password_length: "12"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas requestConfigFromCode", () => {
    const generator = sagas.requestConfigFromCode();

    next = generator.next();
    const config = state => state.config;
    const credentials = generator.next(config);
    expect(credentials.value).toEqual(call(fetchCredentials, config));

    const action = {
      type: actions.GET_LOGIN_CONFIG_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        suggested_password: 'dummy-suggested',
        email_code: 'dummy-code',
        email_address: 'dummy@example.com',
        extra_security: [],
        password_service_url: "dummy-url",
        password_entropy: "25",
        password_length: "12",
        zxcvbn_terms: ["dummy", "terms"],
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});
