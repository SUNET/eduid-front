import React from "react";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";
import fetchMock from "fetch-mock";

import { setupComponent, getState } from "./common";
import InitResetFormContainer from "login/InitResetForm/InitResetForm_container";

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
