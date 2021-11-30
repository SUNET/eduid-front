/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { ReduxIntlProvider } from "components/ReduxIntl";
const mock = require("jest-mock");

import Login from "../login/components/LoginApp/Login/Login";
import UsernamePw from "../login/components/LoginApp/Login/UsernamePw";
import TermsOfUse from "../login/components/LoginApp/Login/TermsOfUse";
import MultiFactorAuth from "../login/components/LoginApp/Login/MultiFactorAuth";
import loginStore, { LoginAppDispatch, LoginRootState } from "login/app_init/initStore";

const baseState: LoginRootState = {
  config: {
    next_url: "http://localhost/next",
    mfa_auth_idp: "https//swedenconnect.idp/",
    eidas_url: "http://eidas.docker",
    csrf_token: "csrf-token",
  },
  login: {
    ref: "e0367c25-3853-45a9-806",
    tou: {},
    mfa: {},
  },
  app: { is_loaded: true, loading_data: false, request_in_progress: false },
  notifications: undefined as any,
  router: undefined as any,
  form: undefined as any,
  intl: { locale: "en", messages: {} },
  resetPassword: undefined as any,
};

type LoginStoreType = typeof loginStore;

const fakeStore = (fakeState: LoginRootState): LoginStoreType => ({
  ...loginStore,
  dispatch: mock.fn() as unknown as LoginAppDispatch,
  getState: (): LoginRootState =>
    // return a copy of the state in loginStore
    ({
      ...loginStore.getState(),
      ...fakeState,
    }),
});

// return (optional) newState with baseState overriding it
function getFakeState(newState = {}): LoginRootState {
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
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login {...props} />
        </Router>
      </ReduxIntlProvider>
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
    const state = fakeState;
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
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </ReduxIntlProvider>
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
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </ReduxIntlProvider>
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
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </ReduxIntlProvider>
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
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <Router history={history}>
          <Login />
        </Router>
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }

  it("NOSUCHPAGE does not render any of the components", () => {
    const state = { ...fakeState };
    state.login.next_page = "NOSUCHPAGE";
    const { wrapper } = setupComponent();
    const page = wrapper.find(UsernamePw);
    expect(page.exists()).toBe(false);
  });
});
