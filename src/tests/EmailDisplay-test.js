import React from "react";
import expect from "expect";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { shallow, mount } from "enzyme";
import { IntlProvider } from "react-intl";
import EmailDisplay from "containers/EmailDisplay";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");

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
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    emails: {
      emails: [],
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <EmailDisplay />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
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
    const emailText = wrapper.find("div");
    expect(emailText.exists()).toEqual(true);
    expect(emailText.at(0).text()).toContain("no");
  });
});

describe("EmailDisplay component, when email is saved", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    emails: {
      emails: [],
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <EmailDisplay />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }
  const state = { ...fakeState };
  state.emails.emails = [
    { email: "primary-test@test.com", primary: true, verified: true },
    { email: "testing@email.com", primary: false, verified: false },
    { email: "test1@email.com", primary: false, verified: true },
  ];
  it("Renders the primary email (even if multiple verified)", () => {
    const { wrapper } = setupComponent();
    const primaryEmail = wrapper.find("div");
    expect(primaryEmail.exists()).toEqual(true);
    expect(primaryEmail.at(0).text()).toContain("primary-test@test.com");
    expect(primaryEmail.at(0).text()).not.toContain("testing@email.com");
    expect(primaryEmail.at(0).text()).not.toContain("test1@email.com");
  });
});

describe("EmailDisplay component, when email is saved", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    emails: {
      emails: [],
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <EmailDisplay />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }
  const state = { ...fakeState };
  state.emails.emails = [
    { email: "test@test.com", primary: false, verified: true },
    { email: "testing@email.com", primary: false, verified: true },
    { email: "primary-test@email.com", primary: true, verified: true },
  ];
  it("Renders the primary phone (even if multiple verified and new phone set as primary)", () => {
    const { wrapper } = setupComponent();
    const primaryEmail = wrapper.find("div");
    expect(primaryEmail.exists()).toEqual(true);
    expect(primaryEmail.at(0).text()).toContain("primary-test@email.com");
    expect(primaryEmail.at(0).text()).not.toContain("testing@email.com");
    expect(primaryEmail.at(0).text()).not.toContain("test@test.com");
  });
});
