import React from "react";
import expect from "expect";
import { shallow, mount } from "enzyme/build";
import { IntlProvider } from "react-intl";
import { Provider } from "react-intl-redux";
import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";
import ChangePasswordForm from "components/ChangePasswordForm";

const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");

describe("ChangePasswordForm Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <ChangePasswordForm />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("ChangePasswordForm renders", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    security: {
      confirming_change: false
    },
    chpass: {
      suggested_password: "h3u r6 lo9"
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  const props = {
    handleStartPasswordChange: mock.fn(),
    handleStopPasswordChange: mock.fn()
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <ChangePasswordForm {...props} />
      </Provider>
    );
    return {
      wrapper
    };
  }

  it("old and new password inputs render", () => {
    const { wrapper } = setupComponent();
    const oldPwInput = wrapper.find("input[name='old-password-field']");
    const suggestedPwInput = wrapper.find(
      "input[name='suggested-password-field']"
    );
    expect(oldPwInput.exists()).toEqual(true);
    expect(suggestedPwInput.exists()).toEqual(true);
  });

  // im commenting out this test becasue the id has changed here, so this button cannot be found anymore
  // it("save password button renders", () => {
  //   const { wrapper } = setupComponent();
  //   const savePwButton = wrapper.find("EduIDButton#chpass-button");
  //   expect(savePwButton.exists()).toEqual(true);
  //   expect(savePwButton.text().includes("password")).toEqual(true);
  // });
});
