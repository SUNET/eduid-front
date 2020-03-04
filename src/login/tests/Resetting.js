import React from "react";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";
import fetchMock from "fetch-mock";

import { setupComponent, getState } from "./common";
import ResettingContainer from "login/Resetting/Resetting_container";
import * as actions from "login/Resetting/Resetting_actions";
import resettingReducer from "login/Resetting/Resetting_reducer";
import * as sagas from "login/Resetting/Resetting_sagas";

import EduIDButton from "components/EduIDButton";
import EduIDTextInput from "components/EduIDTextInput";


describe("Resetting Container", () => {
  let setup;

  beforeEach(() => {
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Does render default button", () => {
    const component = (<ResettingContainer/>);
    setup = setupComponent(component);
    expect(setup.wrapper.find(EduIDButton).length).toEqual(1);
  });

  it("Does render 2 buttons", () => {
    const overrides = {
      config: {
        extra_security: {
          phone_numbers: [
          {index: "0", number: '+33666666666'}
        ]
        }
      }
    };
    const component = (<ResettingContainer/>);
    setup = setupComponent(component, overrides);
    expect(setup.wrapper.find(EduIDButton).length).toEqual(2);
  });

  it("Does render 3 buttons", () => {
    const overrides = {
      config: {
        extra_security: {
          phone_numbers: [
          {index: "0", number: '+33666666666'},
          {index: "0", number: '+33777777777'}
        ]
        }
      }
    };
    const component = (<ResettingContainer/>);
    setup = setupComponent(component, overrides);
    expect(setup.wrapper.find(EduIDButton).length).toEqual(3);
  });
});

describe("Resetting reducer", () => {

  it("Receives an CHOOSE_EXTRA_SECURITY_NONE action", () => {
    const state = getState();
    const action = actions.chooseExtraSecurityNone();
    const newState = resettingReducer(state.resetting, action);
    expect(newState.choose_extrasec).toEqual('none');
    expect(newState.extrasec_phone_index).toEqual(-1);
  });

  it("Receives an CHOOSE_EXTRA_SECURITY_PHONE action", () => {
    const state = getState();
    const action = actions.chooseExtraSecurityPhone("0");
    const newState = resettingReducer(state.resetting, action);
    expect(newState.choose_extrasec).toEqual('phone');
    expect(newState.extrasec_phone_index).toEqual('0');
  });

  it("Receives an CHOOSE_EXTRA_SECURITY_TOKEN action", () => {
    const state = getState();
    const action = actions.chooseExtraSecurityToken();
    const newState = resettingReducer(state.resetting, action);
    expect(newState.choose_extrasec).toEqual('token');
    expect(newState.extrasec_phone_index).toEqual(-1);
  });
});
