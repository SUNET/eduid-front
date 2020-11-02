import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import * as actions from "actions/DashboardConfig";
import configReducer from "reducers/DashboardConfig";
import { requestConfig, fetchConfig } from "../sagas/DashboardConfig";
import { put, call } from "redux-saga/effects";

describe("Config Actions", () => {
  it("should create an action to trigger fetching the configuration", () => {
    const expectedAction = {
      type: actions.GET_JSCONFIG_CONFIG
    };
    expect(actions.getConfig()).toEqual(expectedAction);
  });

  it("should create an action to signal an error fetching the configuration", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_JSCONFIG_CONFIG_FAIL,
      error: true,
      payload: {
        message: "Bad error"
      }
    };
    expect(actions.getConfigFail(err)).toEqual(expectedAction);
  });
});

describe("Config reducers", () => {
  const mockState = {
    csrf_token: "",
    //is_fetching: false,
    param1: "old value"
  };

  it("Receives a GET_CONFIG action", () => {
    expect(
      configReducer(mockState, {
        type: actions.GET_JSCONFIG_CONFIG
      })
    ).toEqual({
      csrf_token: "",
      param1: "old value",
      //is_fetching: true,
      is_configured: false,
    });
  });

  it("Receives a GET_CONFIG_SUCCESS action", () => {
    expect(
      configReducer(mockState, {
        type: actions.GET_JSCONFIG_CONFIG_SUCCESS,
        payload: {
          csrf_token: "",
          param1: "new value"
        }
      })
    ).toEqual({
      csrf_token: "",
      param1: "new value",
      //is_fetching: false,
      is_configured: true
    });
  });

  it("Receives a GET_CONFIG_FAIL action", () => {
    expect(
      configReducer(mockState, {
        type: actions.GET_JSCONFIG_CONFIG_FAIL,
        error: true,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      csrf_token: "",
      param1: "old value",
      //is_fetching: false,
      is_configured: false
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      configReducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({
      csrf_token: "",
      //is_fetching: false,
      param1: "old value"
    });
  });
});

const mockState = {
  personal_data: {
    //is_fetching: false,
    given_name: "",
    surname: "",
    display_name: "",
    language: ""
  },
  config: {
    csrf_token: "",
    is_configured: false,
    //is_fetching: false,
    personal_data_url: "http://localhost/services/personal-data/user"
  }
};
const getState = () => mockState;

describe("Async component", () => {
  it("Sagas requestConfig", () => {
    const generator = requestConfig(getState);

    const url = "/services/jsconfig/config";
    let next = generator.next(url);
    expect(next.value).toEqual(call(fetchConfig, url));

    const config = next.value;
    next = generator.next(next.value);
    expect(next.value).toEqual(put(config));
  });
});
