import AddNin from "components/AddNin";
import NinDisplay from "components/NinDisplay";
import { DashboardRootState } from "dashboard-init-app";
import { ReactWrapper, shallow } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";
import { ninStateFromNinList } from "reducers/Nins";
import { MockStoreEnhanced } from "redux-mock-store";
import { dashboardTestState, fakeStore, setupComponent } from "./helperFunctions/DashboardTestApp";

const mock = require("jest-mock");

describe("NinDisplay component (/verify-identity), when nin is saved and unverified ", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([
    { number: "199901100006", verified: false, primary: false },
    { number: "199901110005", verified: false, primary: false },
    { number: "199901110004", verified: false, primary: false },
  ]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({ ...dashboardTestState, nins: test_nins });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <AddNin />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders the saved number", () => {
    const number = wrapper.find("div");
    expect(number.at(0).text()).toContain("****");
  });

  it("Renders the saved number and show/hide", () => {
    const button = wrapper.find("button#show-hide-button");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });
});

describe("NinDisplay component (/verify-identity), when a nin is saved and verified ", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([
    { number: "199901100006", verified: false, primary: false },
    { number: "199901100005", verified: false, primary: false },
    { number: "199901100004", verified: true, primary: true },
  ]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({ ...dashboardTestState, nins: test_nins });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <AddNin />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders the saved number", () => {
    const number = wrapper.find("div");
    expect(number.at(0).text()).toContain("19990110****");
  });
});

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
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({ ...dashboardTestState, nins: test_nins });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <NinDisplay nin={state.nins.first_nin} />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders an 'add id number' box on the Identity tab", () => {
    const noNumber = wrapper.find("a");
    expect(noNumber.exists()).toEqual(true);
    expect(noNumber.text()).toContain("add id number");
  });

  it("Renders a link to '/profile/verify-identity/' on the Profile tab", () => {
    const noNumber = wrapper.find("a");
    expect(noNumber.props().href).toBe("/profile/verify-identity/");
  });
});

describe("NinDisplay component (profile), when a nin is saved and unverified", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([
    { number: "196701100006", verified: false, primary: false },
    { number: "196701110005", verified: false, primary: false },
  ]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({ ...dashboardTestState, nins: test_nins });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <AddNin />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders a non-clickable number if a nin has been added nin", () => {
    const unverifiedNumber = wrapper.find("div");
    expect(unverifiedNumber.exists()).toEqual(true);
    expect(unverifiedNumber.at(0).text()).toContain("19670110****");
  });

  it("Renders a show/hide button", () => {
    const unverifiedNumber = wrapper.find("button");
    expect(unverifiedNumber).toHaveLength(2);
    expect(unverifiedNumber.at(0).text()).toContain("SHOW");
  });
});

describe("NinDisplay component, when a nin is saved and verified", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([
    { number: "196701100006", verified: false, primary: false },
    { number: "196701110005", verified: true, primary: true },
  ]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({ ...dashboardTestState, nins: test_nins });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <AddNin />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders a static number (not clickable)", () => {
    const verifiedNumber = wrapper.find(".verified");
    expect(verifiedNumber.exists()).toEqual(true);
    const link = wrapper.find("a");
    expect(link.exists()).toEqual(false);
  });

  it("Renders only the verified number", () => {
    const verifiedNumber = wrapper.find(".verified");
    expect(verifiedNumber.text()).toContain("19670111****");
  });
});
