import React from "react";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";
import fetchMock from "fetch-mock";

import { setupComponent, getState } from "./common";
import InitResetFormContainer from "login/InitResetForm/InitResetForm_container";
import * as actions from "login/InitResetForm/InitResetForm_actions";
import resetReducer from "login/InitResetForm/InitResetForm_reducer";
import * as sagas from "login/InitResetForm/InitResetForm_sagas";

import EduIDButton from "components/EduIDButton";
import EduIDTextInput from "components/EduIDTextInput";


describe("InitResetForm Container", () => {
  let setup;

  beforeEach(() => {
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Does not render form", () => {
    const component = (<InitResetFormContainer/>);
    setup = setupComponent(component, {reset: {email_sent: true}});
    expect(setup.wrapper.find(EduIDButton).exists()).toEqual(false);
    expect(setup.wrapper.find(EduIDTextInput).exists()).toEqual(false);
  });

  it("Does render form", () => {
    const component = (<InitResetFormContainer/>);
    setup = setupComponent(component);
    expect(setup.wrapper.find(EduIDButton).exists()).toEqual(true);
    expect(setup.wrapper.find(EduIDTextInput).exists()).toEqual(true);
  });

  it("clicks", () => {
    const component = (<InitResetFormContainer/>);
    setup = setupComponent(component);
    const input = setup.wrapper.find(EduIDTextInput);
    const button = setup.wrapper.find(EduIDButton);

    const numCalls = setup.store.dispatch.mock.calls.length;
    const querySelector = window.document.querySelector;

    const fakeEvent = {
      preventDefault: () => {},
    };
    window.document.querySelector = (selector) => {
      return input.find('input#email');
    };

    input.find('input#email').value = 'test@example.com';
    button.props().onClick(fakeEvent);

    expect(setup.store.dispatch.mock.calls.length).toEqual(numCalls + 1);

    window.document.querySelector = querySelector;
  });
});

describe("InitResetForm reducer", () => {

  it("Receives an email action", () => {
    const state = getState();
    const action = actions.dealWithEmail("test@example.com");
    const newState = resetReducer(state.reset, action);
    expect(newState.email).toEqual("test@example.com");
  });

  it("Receives a failure action", () => {
    const state = getState();
    const action = actions.postEmailFail("ERROR");
    const newState = resetReducer(state.reset, action);
    expect(newState.email_sent).toEqual(false);
  });

  it("Receives a success action", () => {
    const state = getState();
    const action = {
      type: actions.POST_RESET_PASSWORD_RESET_SUCCESS
    };
    const newState = resetReducer(state.reset, action);
    expect(newState.email_sent).toEqual(true);
  });
});

describe("Async component", () => {
  it("Init reset form sagas", () => {
    const generator = sagas.initReset();
    let next = generator.next();

    const state = getState({reset: {email: "test@example.com"}});
    const data = {
      email: "test@example.com",
      csrf_token: state.config.csrf_token
    };

    generator.next(state);
    generator.next(data);
    generator.next();
    next = generator.next();
    expect(next.value).toEqual(call(sagas.sendEmailRequest, state.config, data));

    const action = {
      type: actions.POST_RESET_PASSWORD_RESET_SUCCESS,
      payload: {
        csrf_token: "dummy-csrf",
        message: "ho ho ho"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    generator.next();
    generator.next();
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});
