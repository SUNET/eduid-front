import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import { addLocaleData } from "react-intl";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-intl-redux";
const mock = require("jest-mock");
addLocaleData("react-intl/locale-data/en");

/* uncomment below to run test in specific file */
// import { configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import jsdom from "jsdom";
// configure({ adapter: new Adapter() });
// const { JSDOM } = jsdom;
// const { document } = new JSDOM("<!doctype html><html><body></body></html>", {
//   url: "http://localhost/",
// }).window;
// global.document = document;
// global.window = document.defaultView;

import Login from "../login/components/LoginApp/Login/Login";
import UsernamePw from "../login/components/LoginApp/Login/UsernamePw";
import TermsOfUse from "../login/components/LoginApp/Login/TermsOfUse";
import MultiFactorAuth from "../login/components/LoginApp/Login/MultiFactorAuth";

const baseState = {
  app: {
    loading_data: null,
  },
  config: {
    next_url: "http://localhost/next",
    mfa_auth_idp: "https//swedenconnect.idp/",
    eidas_url: "http://eidas.docker",
    csrf_token: "csrf-token",
  },
  login: {
    ref: "e0367c25-3853-45a9-806",
    next_page: null,
    tou: {},
  },
  form: [],
  intl: {
    locale: "en",
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

describe("Login component renders", () => {
  const fakeState = getFakeState();
  function setupComponent() {
    const history = createMemoryHistory();
    const props = {
      location: { pathname: "/login/e0367c25-3853-45a9-806" },
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login {...props} />
        </Router>
      </Provider>
    );
    return {
      props,
      wrapper,
    };
  }

  it("renders 'null' or 'false' when not given a state.login.next_page", () => {
    const { wrapper } = setupComponent();
    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  it("to not render 'null' or 'false' when given a state.login.next_page", () => {
    const state = { ...fakeState };
    state.login.next_page = "USERNAMEPASSWORD";
    const { wrapper, props } = setupComponent();
    props.location.pathname = "/login/password/e0367c25-3853-45a9-806";
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("renders on an appropriate url", () => {
    const { props } = setupComponent();
    expect(props.location.pathname).toContain("login");
    expect(props.location.pathname).not.toContain("reset");
  });
});

describe("Login renders the UsernamePw as expected", () => {
  const fakeState = getFakeState();
  function setupComponent() {
    const history = createMemoryHistory();
    const props = {
      location: { pathname: "/login/e0367c25-3853-45a9-806" },
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    return {
      props,
      wrapper,
    };
  }

  it("page=USERNAMEPASSWORD renders UsernamePw", () => {
    const state = { ...fakeState };
    state.login.next_page = "USERNAMEPASSWORD";
    const { wrapper } = setupComponent();
    const page = wrapper.find(UsernamePw);
    expect(page.exists()).toBe(true);
  });

  it("UsernamePw renders on an appropriate url", () => {
    const { wrapper, props } = setupComponent();
    props.location.pathname = "/login/password/e0367c25-3853-45a9-806";
    expect(props.location.pathname).toContain("password");
    const page = wrapper.find(UsernamePw);
    expect(page.exists()).toBe(true);
    expect(props.location.pathname).not.toContain("tou");
    expect(props.location.pathname).not.toContain("mfa");
  });
});

describe("Login renders the TermsOfUse as expected", () => {
  const fakeState = getFakeState();
  function setupComponent() {
    const history = createMemoryHistory();
    const props = {
      location: { pathname: "/login/e0367c25-3853-45a9-806" },
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    return {
      props,
      wrapper,
    };
  }

  it("page=TOU renders TermsOfUse", () => {
    const state = { ...fakeState };
    state.login.next_page = "TOU";
    state.login.tou.version = "2016-v1";
    const { wrapper } = setupComponent();
    const page = wrapper.find(TermsOfUse);
    expect(page.exists()).toBe(true);
  });

  it("TermsOfUse renders on an appropriate url", () => {
    const { wrapper, props } = setupComponent();
    props.location.pathname = "/login/tou/e0367c25-3853-45a9-806";
    expect(props.location.pathname).toContain("tou");
    const page = wrapper.find(TermsOfUse);
    expect(page.exists()).toBe(true);
    expect(props.location.pathname).not.toContain("password");
    expect(props.location.pathname).not.toContain("mfa");
  });
});

describe("Login renders the MultiFactorAuth as expected", () => {
  const fakeState = getFakeState();
  function setupComponent() {
    const history = createMemoryHistory();
    const props = {
      location: { pathname: "/login/e0367c25-3853-45a9-806" },
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    return {
      props,
      wrapper,
    };
  }

  it("page=MFA renders MultiFactorAuth", () => {
    const state = { ...fakeState };
    state.login.next_page = "MFA";
    const { wrapper } = setupComponent();
    const page = wrapper.find(MultiFactorAuth);
    expect(page.exists()).toBe(true);
  });

  it("MultiFactorAuth renders on an appropriate url", () => {
    const { wrapper, props } = setupComponent();
    props.location.pathname = "/login/mfa/e0367c25-3853-45a9-806";
    expect(props.location.pathname).toContain("mfa");
    const page = wrapper.find(MultiFactorAuth);
    expect(page.exists()).toBe(true);
    expect(props.location.pathname).not.toContain("password");
    expect(props.location.pathname).not.toContain("tou");
  });
});

describe("Login does not render any component if page is not one of the above", () => {
  const fakeState = getFakeState();
  function setupComponent() {
    const history = createMemoryHistory();
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    return {
      wrapper,
    };
  }

  it(" MOCKPAGE does not render any of the componets", () => {
    const state = { ...fakeState };
    state.login.next_page = "MOCKPAGE";
    const { wrapper } = setupComponent();
    const page = wrapper.find(UsernamePw);
    expect(page.exists()).toBe(false);
  });
});
