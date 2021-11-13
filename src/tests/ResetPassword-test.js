const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import { addLocaleData } from "react-intl";
import resetPasswordSlice from "../login/redux/slices/resetPasswordSlice";
import ResetPasswordMain from "../login/components/LoginApp/ResetPassword/ResetPasswordMain";
import { Provider } from "react-intl-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

const baseState = {
  app: {
    request_in_progress: false,
  },
  resetPassword: {
    email_address: "",
  },
  config: {
    csrf_token: "csrf-token",
  },
  notifications: {
    errors: [],
  },
  intl: {
    locale: "en",
    messages: messages,
  },
};

const fakeStore = (fakeState) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...fakeState }),
});

function getFakeState(newState) {
  if (newState === undefined) {
    newState = {};
  }
  return Object.assign(baseState, newState);
}

describe("renders", () => {
  const fakeState = getFakeState();
  function setupComponent() {
    const history = createMemoryHistory();
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <ResetPasswordMain />
        </Router>
      </Provider>
    );
    return {
      wrapper,
    };
  }

  it("The component does not render 'false' or 'null'", () => {
    const { wrapper } = setupComponent();
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("ResetPassword post actions,", () => {
  const fakeState = getFakeState({
    resetPassword: { email_address: "test@test.com" },
  });
  it("create an action to send email link", () => {
    const expectedAction = {
      type: resetPasswordSlice.actions.requestEmailLink.type,
      payload: fakeState.resetPassword.email_address,
    };
    expect(resetPasswordSlice.actions.requestEmailLink(fakeState.resetPassword.email_address)).toEqual(expectedAction);
  });
});

describe("ResetPasswordMain, send link button ", () => {
  const fakeState = getFakeState();
  function setupComponent() {
    const history = createMemoryHistory();
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <ResetPasswordMain />
        </Router>
      </Provider>
    );
    return {
      wrapper,
    };
  }

  it("check if button is present", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("button#reset-password-button");
    expect(button.exists()).toEqual(true);
    expect(button.text()).toContain("send link");
  });

  it("will active when input is filled", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("button#reset-password-button");
    const input = wrapper.find("#reset-password-form input");
    const buttonDisabled = button.prop("disabled");
    input.props().value = "test@test.com";
    input.update();
    expect(input.props().value).toBe("test@test.com");
    expect(buttonDisabled).toBeFalsy();
  });
});
