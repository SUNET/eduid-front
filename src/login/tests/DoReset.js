import React from "react";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";
import fetchMock from "fetch-mock";

import Modal from "reactstrap/lib/Modal";
import ConfirmModal from "components/ConfirmModal";
import ChangePasswordForm from "components/ChangePasswordForm";
import { setupComponent, getState } from "./common";
import DoResetContainer from "login/DoReset/DoReset_container";
import * as actions from "login/DoReset/DoReset_actions";
import doResetReducer from "login/DoReset/DoReset_reducer";
import * as sagas from "login/DoReset/DoReset_sagas";

import EduIDButton from "components/EduIDButton";
import EduIDTextInput from "components/EduIDTextInput";


describe("Resetting Container", () => {
  let setup;

  afterEach(() => {
    fetchMock.restore();
  });

  it("Does render change password form", () => {
    const component = (<DoResetContainer/>);
    setup = setupComponent(component);
    expect(setup.wrapper.find(ChangePasswordForm).length).toEqual(1);
  });

  it("Does render the modal", () => {
    const overrides = {
      do_reset: {
        password_chosen_sms: true
      }
    };
    const component = (<DoResetContainer/>);
    setup = setupComponent(component, overrides);
    expect(setup.wrapper.find(Modal).props().isOpen).toEqual(true);
  });

  it("Does not render the modal", () => {
    const overrides = {
      do_reset: {
        password_chosen_sms: false
      }
    };
    const component = (<DoResetContainer/>);
    setup = setupComponent(component, overrides);
    expect(setup.wrapper.find(Modal).props().isOpen).toEqual(false);
  });
});

describe("DoReset reducer", () => {

  it("Receives a passwordToReset action", () => {
    const state = getState();
    const action = actions.passwordToReset('dummy-password');
    const newState = doResetReducer(state.do_reset, action);
    expect(newState.new_password).toEqual('dummy-password');
  });

  it("Receives an askForSMSCode action", () => {
    const state = getState();
    const action = actions.askForSMSCode();
    const newState = doResetReducer(state.do_reset, action);
    expect(newState.password_chosen_sms).toEqual(true);
  });

  it("Receives an stopResetPasswordSMS action", () => {
    const state = getState();
    const action = actions.stopResetPasswordSMS();
    const newState = doResetReducer(state.do_reset, action);
    expect(newState.password_chosen_sms).toEqual(false);
  });

  it("Receives an doResetPasswordSMS action", () => {
    const state = getState();
    const action = actions.doResetPasswordSMS('dummy-code');
    const newState = doResetReducer(state.do_reset, action);
    expect(newState.sms_code).toEqual('dummy-code');
  });

  it("Receives an credentialsGot action", () => {
    const state = getState();
    const dummy_credentials = {dummy: 'credentials'};
    const action = actions.credentialsGot(dummy_credentials);
    const newState = doResetReducer(state.do_reset, action);
    expect(newState.webauthn_assertion).toEqual(dummy_credentials);
  });
});

describe("Async component", () => {
});

