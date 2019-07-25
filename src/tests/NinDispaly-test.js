import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import NinDisplay from "components/NinDisplay";
const mock = require("jest-mock");
const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

// my job is to: control how the nin looks depening on its url (verify-identity or profile) and its verification status (true of false)

describe("NinDisplay component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <NinDisplay />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("NinDisplay component (profile), when no nin is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    nins: {
      nins: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const mockProps = {
      nins: [],
      verifiedNin: [],
      verifiedNinStatus: false
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <NinDisplay {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
    return {
      mockProps,
      wrapper
    };
  }
  const state = { ...fakeState };
  it("Renders an 'Add id number' box", () => {
    const { wrapper } = setupComponent();
    const noNumber = wrapper.find("a");
    expect(noNumber.exists()).toEqual(true);
    expect(noNumber.text()).toContain("Add id number");
  });

  it("Renders a link to '/profile/verify-identity/'", () => {
    const { wrapper } = setupComponent();
    const noNumber = wrapper.find("a");
    expect(noNumber.props().href).toBe("/profile/verify-identity/");
  });
});

describe("NinDisplay component (profile), when a nin is saved and unverified", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    nins: {
      nins: [],
      verifiedNin: [],
      verifiedNinStatus: false
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const props = {
      nins: [
        { number: "196701100006", verified: false, primary: false },
        { number: "196701110005", verified: false, primary: false }
      ],
      verifiedNin: [],
      verifiedNinStatus: false
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <NinDisplay {...props} />
        </MemoryRouter>
      </Provider>
    );
    return {
      props,
      wrapper
    };
  }
  const state = { ...fakeState };
  // state.nins = [{ number: "196701110005", verified: false, primary: false }];
  it("Renders a clickable number if a nin has been added nin", () => {
    const { wrapper } = setupComponent();
    const unverifiedNumber = wrapper.find("a");
    expect(unverifiedNumber.exists()).toEqual(true);
    expect(unverifiedNumber.text()).toContain("196701100006");
  });

  it("Renders a link to '/profile/verify-identity/'", () => {
    const { wrapper } = setupComponent();
    const unverifiedNumber = wrapper.find("a");
    expect(unverifiedNumber.props().href).toBe("/profile/verify-identity/");
  });
});

describe("NinDisplay component, when a nin is saved and verified", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    nins: {
      nins: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const props = {
      nins: [
        { number: "196701100006", verified: false, primary: false },
        { number: "196701110005", verified: true, primary: false }
      ],
      verifiedNin: [{ number: "196701110005", verified: true, primary: false }],
      verifiedNinStatus: true
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <NinDisplay {...props} />
        </MemoryRouter>
      </Provider>
    );
    return {
      props,
      wrapper
    };
  }
  const state = { ...fakeState };
  it("Renders a static number (not clickable)", () => {
    const { wrapper } = setupComponent();
    const verifiedNumber = wrapper.find(".verified");
    expect(verifiedNumber.exists()).toEqual(true);
    const link = wrapper.find("a");
    expect(link.exists()).toEqual(false);
  });

  it("Renders only the verified number", () => {
    const { wrapper } = setupComponent();
    const verifiedNumber = wrapper.find(".verified");
    expect(verifiedNumber.text()).toContain("196701110005");
  });
});
