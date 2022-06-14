import AddNin from "components/AddNin";
import { DashboardRootState } from "dashboard-init-app";
import { ReactWrapper, shallow } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ninStateFromNinList } from "reducers/Nins";
import { MockStoreEnhanced } from "redux-mock-store";
import { dashboardTestState, fakeStore, setupComponent } from "./helperFunctions/DashboardTestApp";

// I am the component that: displays the nin input form or the added nin in the vetting process.
// My job is to:
// if no nin is saved: render <NinForm /> to take a nin
// if nin is saved: render <NinDisplay /> to show added nin

// Comment N: This component controls the nin rendering (either a form to add nin or a display of the added number), so I think these rendering test might be enough

describe("AddNin component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <AddNin />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("AddNin component, when no nin is saved", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({ ...dashboardTestState, nins: test_nins });
    // state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <AddNin />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders <NinForm/> ", () => {
    const ninForm = wrapper.find("#nin-form");
    expect(ninForm.exists()).toEqual(true);
  });

  it("Does not render <NinDisplay/> ", () => {
    const ninDisplay = wrapper.find(".profile-grid-cell");
    expect(ninDisplay.exists()).toEqual(false);
  });
});

describe("AddNin component, when a nin is saved", () => {
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

  it("Renders <NinDisplay/> ", () => {
    const ninDisplay = wrapper.find(".display-data");
    expect(ninDisplay.exists()).toEqual(true);
  });

  it("Does not render <NinForm/> ", () => {
    const ninForm = wrapper.find("#nin-form");
    expect(ninForm.exists()).toEqual(false);
  });
});
