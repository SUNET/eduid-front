import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import EmailDisplay from "containers/EmailDisplay";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

// my job is to: control the display of the email address registered at signup in the profile

// Comment N: This component controls rendering of email only in profile, so I think these rendering test might be enough

describe("EmailDisplay component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <EmailDisplay />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("EmailDisplay component, when no email is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    emails: {
      emails: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <EmailDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.emails.emails = [];
  it("Renders a header", () => {
    const { wrapper } = setupComponent();
    const emailLabel = wrapper.find("label");
    expect(emailLabel.exists()).toEqual(true);
    expect(emailLabel.text()).toContain("Email");
  });

  it("Renders text when no email is saved", () => {
    const { wrapper } = setupComponent();
    const emailText = wrapper.find("p");
    expect(emailText.exists()).toEqual(true);
    expect(emailText.text()).toContain("no");
  });
});

describe("EmailDisplay component, when email is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    emails: {
      emails: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <EmailDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.emails.emails = [
    { email: "njons-test@test.com", primary: true, verified: true },
    { email: "njons-testing@email.com", primary: false, verified: false },
    { email: "njons-best-test@email.com", primary: false, verified: true }
  ];
  it("Renders the primary email (even if multiple verified)", () => {
    const { wrapper } = setupComponent();
    const primaryEmail = wrapper.find("p");
    expect(primaryEmail.exists()).toEqual(true);
    expect(primaryEmail.text()).toContain("njons-test@test.com");
    expect(primaryEmail.text()).not.toContain("njons-testing@email.com");
    expect(primaryEmail.text()).not.toContain("njons-best-test@email.com");
  });
});

describe("EmailDisplay component, when email is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    emails: {
      emails: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <EmailDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.emails.emails = [
    { email: "njons-test@test.com", primary: false, verified: true },
    { email: "njons-testing@email.com", primary: false, verified: true },
    { email: "njons-best-test@email.com", primary: true, verified: true }
  ];
  it("Renders the primary phone (even if multiple verified and new phone set as primary)", () => {
    const { wrapper } = setupComponent();
    const primaryEmail = wrapper.find("p");
    expect(primaryEmail.exists()).toEqual(true);
    expect(primaryEmail.text()).toContain("njons-best-test@email.com");
    expect(primaryEmail.text()).not.toContain("njons-testing@email.com");
    expect(primaryEmail.text()).not.toContain("njons-test@test.com");
  });
});
