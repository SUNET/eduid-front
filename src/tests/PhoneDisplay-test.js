import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { addLocaleData, IntlProvider } from "react-intl";
import PhoneDisplay from "containers/PhoneDisplay";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");
import { MemoryRouter } from "react-router-dom";

// my job is to: control the display of the phone number in the profile registered by user in settings

// Comment N: This component controls rendering of phone number only in profile, so I think these rendering test might be enough

describe("PhoneDisplay component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <PhoneDisplay />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("PhoneDisplay component, when no phone number is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    phones: {
      phones: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <PhoneDisplay />
        </MemoryRouter>
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.phones.phones = [];
  it("Renders a header", () => {
    const { wrapper } = setupComponent();
    const phoneLabel = wrapper.find("label");
    expect(phoneLabel.exists()).toEqual(true);
    expect(phoneLabel.text()).toContain("Phone");
  });

  it("Renders text when no phone numbers is saved", () => {
    const { wrapper } = setupComponent();
    const phoneText = wrapper.find("a");
    expect(phoneText.exists()).toEqual(true);
    expect(phoneText.text()).toContain("add");
  });
});

describe("PhoneDisplay component, when phone numbers is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    phones: {
      phones: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <PhoneDisplay />
        </MemoryRouter>
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.phones.phones = [
    { number: "+46700000079", primary: false, verified: false }
  ];

  it("Render text when phone numbers are unverified", () => {
    const { wrapper } = setupComponent();
    const primaryPhone = wrapper.find("p");
    expect(primaryPhone.exists()).toEqual(true);
    expect(primaryPhone.text()).not.toContain("no");
  });

  it("Does not render phone numbers that are unverified", () => {
    const { wrapper } = setupComponent();
    const primaryPhone = wrapper.find("p");
    expect(primaryPhone.exists()).toEqual(true);
    expect(primaryPhone.text()).toContain("+46700000079");
  });
});

describe("PhoneDisplay component, when phone number is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    phones: {
      phones: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <PhoneDisplay />
        </MemoryRouter>
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.phones.phones = [
    { number: "+46736483364", primary: true, verified: true },
    { number: "+46764008978", primary: false, verified: true },
    { number: "+46700000079", primary: false, verified: false }
  ];

  it("Renders the primary phone (even if multiple verified)", () => {
    const { wrapper } = setupComponent();
    const primaryPhone = wrapper.find("p");
    expect(primaryPhone.exists()).toEqual(true);
    expect(primaryPhone.text()).toContain("+46736483364");
    expect(primaryPhone.text()).not.toContain("+46764008978");
    expect(primaryPhone.text()).not.toContain("+46700000079");
  });

  it("Does not render numbers that are unverified", () => {
    const { wrapper } = setupComponent();
    const primaryPhone = wrapper.find("p");
    expect(primaryPhone.exists()).toEqual(true);
    expect(primaryPhone.text()).toContain("+46736483364");
  });
});

describe("PhoneDisplay component, when phone number is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    phones: {
      phones: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <PhoneDisplay />
        </MemoryRouter>
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.phones.phones = [
    { number: "+46736483364", primary: false, verified: true },
    { number: "+46764008978", primary: true, verified: true },
    { number: "+46700000079", primary: false, verified: false }
  ];
  it("Renders the primary phone (even if multiple verified and new phone set as primary)", () => {
    const { wrapper } = setupComponent();
    const primaryPhone = wrapper.find("p");
    expect(primaryPhone.exists()).toEqual(true);
    expect(primaryPhone.text()).toContain("+46764008978");
    expect(primaryPhone.text()).not.toContain("+46736483364");
    expect(primaryPhone.text()).not.toContain("+46700000079");
  });
});
