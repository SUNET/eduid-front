const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import { addLocaleData } from "react-intl";
import * as actions from "../login/redux/actions/postResetPasswordActions";
import ResetPasswordForm from "../login/components/LoginApp/ResetPassword/ResetPasswordForm";
import { Provider } from "react-intl-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

const baseState = {
  resetPassword: {
    email: ""
  },
  config: { 
    csrf_token: "csrf-token" 
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

const fakeStore = fakeState => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...fakeState })
});

function getFakeState(newState) {
  if (newState === undefined) {
    newState = {}
  }
  return Object.assign(baseState, newState)
}

function setupComponent(fakeState) {
  const props =  {                                                  
    sendLink: mock.fn(),
  };
  const history = createMemoryHistory();
  const wrapper = mount(
    <Provider store={fakeStore(fakeState)}>
      <Router history={history}>
        <ResetPasswordForm {...props} />
      </Router>
    </Provider>
  );
  return {
    props,
    wrapper,
  };
}

describe("ResetPasswordForm Component,", () => {
  const { wrapper } = setupComponent();
  it("The component does not render 'false' or 'null'", () => {
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("ResetPassword post actions,", () => {
  const fakeState = getFakeState({
    resetPassword: { email: "test@test.com" }
  });
  it("create an action to send email link", () => {
    const expectedAction = {
      type: actions.POST_RESET_PASSWORD,
      payload: {
        email: fakeState.resetPassword.email
      }
    };
    expect(actions.postEmailLink(fakeState.resetPassword.email)).toEqual(expectedAction);
  });

  it("create an action to get an error when failed post", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_RESET_PASSWORD_FAIL,
      error: true,
      payload: {
      message: "Bad error"
    }};
    expect(actions.postEmailLinkFail(err)).toEqual(expectedAction);
  });
});

describe("ResetPasswordForm, send link button ", () => {
  const { wrapper } = setupComponent();
  it("check if button is present", () => {
    const button = wrapper.find("button#reset-password-button");
    expect(button.exists()).toEqual(true);
    expect(button.text()).toContain("send link");
  });

  it("will active when input is filled", () => {
    const button = wrapper.find("button#reset-password-button");
    const input = wrapper.find("#reset-password-form input");
    const buttonDisabled = button.prop("disabled");
    input.props().value = "test@test.com";
    input.update();
    expect(input.props().value).toBe("test@test.com")
    expect(buttonDisabled).toBeFalsy();
  });
})
  