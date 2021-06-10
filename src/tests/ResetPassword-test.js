const mock = require("jest-mock");
import React from "react";
import { shallow } from "enzyme";
import expect from "expect";
import { IntlProvider, addLocaleData } from "react-intl";
import * as actions from "../login/redux/actions/postResetPasswordActions";
import ResetPasswordForm from "../login/components/LoginApp/ResetPassword/ResetPasswordForm";

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

describe("ResetPassword Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <ResetPasswordForm />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("Post resetPassword actions", () => {
  const fakeState = getFakeState({
    resetPassword: {
    email: "test@test.com"
    }
  });
it("should create an action to send email link", () => {
  const expectedAction = {
    type: actions.POST_RESET_PASSWORD,
    payload: {
      email: fakeState.resetPassword.email
    }
  };
  expect(actions.postEmailLink(fakeState.resetPassword.email)).toEqual(expectedAction);
});

it("should create an action to get an error fail post", () => {
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