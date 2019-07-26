import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import GenericConfirmModal from "components/GenericConfirmModal";
import ChangePasswordDisplay from "components/ChangePasswordDisplay";
const mock = require("jest-mock");
const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

// my job is to: display a button that starts the password change process (in settings). I render a button that has to trigger a modal and the modal has to render two buttons (each with their own functionality)

describe("ChangePasswordDisplay component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <ChangePasswordDisplay />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("ChangePasswordDisplay component", () => {
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
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <ChangePasswordDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  it("has a button", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });

  it("has a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(GenericConfirmModal);
    expect(modal.exists()).toEqual(true);
  });
});

describe("ChangePasswordDisplay component, when confirming_change is (false)", () => {
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
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <ChangePasswordDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  it("does not render a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(GenericConfirmModal);
    expect(modal.props().showModal).toEqual(false);
  });
});

describe("ChangePasswordDisplay component, when confirming_change is (true)", () => {
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
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <ChangePasswordDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.security.confirming_change = true;
  it("renders a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(GenericConfirmModal);
    expect(modal.props().showModal).toEqual(true);
  });
});
