import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { Router } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import { history } from "components/DashboardMain";
import NinDisplay from "containers/NinDisplay";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

history.push("/verify-identity");
describe("NinDisplay component (/verify-identity), when nin is saved and unverified ", () => {
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
        { number: "199901100006", verified: false, primary: false },
        { number: "199901110005", verified: false, primary: false },
        { number: "199901110004", verified: false, primary: false }
      ],
      verifiedNin: [],
      verifiedNinStatus: false
    };

    history.push({
      pathname: "/verify-identity"
    });

    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <NinDisplay {...props} />
        </Router>
      </Provider>
    );
    return {
      props,
      wrapper
    };
  }

  it("Renders the saved number", () => {
    const { wrapper } = setupComponent();
    const number = wrapper.find("p");
    expect(number.text()).toBe("199901100006");
  });

  it("Renders the saved number and icon button (remove)", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("EduIDButton.icon-button");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });
});

describe("NinDisplay component (/verify-identity), when a nin is saved and verified ", () => {
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
    const mockProps = {
      nins: [
        { number: "199901100006", verified: false, primary: false },
        { number: "199901100005", verified: false, primary: false },
        { number: "199901100004", verified: true, primary: true }
      ],
      verifiedNin: [{ number: "199901100004", verified: true, primary: true }],
      verifiedNinStatus: true
    };
    history.push("verify-identity");
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <NinDisplay {...mockProps} />
        </Router>
      </Provider>
    );
    return {
      mockProps,
      wrapper
    };
  }

  it("Renders the saved number", () => {
    const { wrapper } = setupComponent();
    const number = wrapper.find("p");
    expect(number.text()).toBe("199901100004");
  });
});

history.push("/profile");
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
      nins: [{ number: "199901100006", verified: false, primary: false }]
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
        <Router history={history}>
          <NinDisplay {...mockProps} />
        </Router>
      </Provider>
    );
    return {
      wrapper
    };
  }
  // const state = { ...fakeState };
  // state.nins = [];
  it("Renders an 'add id number' box", () => {
    history.push("/profile");
    const state = { ...fakeState };
    state.nins = [{ number: "199901100006", verified: false, primary: false }];
    const { wrapper } = setupComponent();
    const noNumber = wrapper.find("a");
    expect(noNumber.exists()).toEqual(true);
    expect(noNumber.text()).toContain("add id number");
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
        <Router history={history}>
          <NinDisplay {...props} />
        </Router>
      </Provider>
    );
    return {
      props,
      wrapper
    };
  }
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
        <Router history={history}>
          <NinDisplay {...props} />
        </Router>
      </Provider>
    );
    return {
      props,
      wrapper
    };
  }

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
