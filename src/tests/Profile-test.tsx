import NinDisplay from "components/NinDisplay";
import Profile from "components/Profile";
import VerifyIdentity from "components/VerifyIdentity";
import EmailDisplay from "containers/EmailDisplay";
import NameDisplay from "containers/NameDisplay";
import PhoneDisplay from "containers/PhoneDisplay";
import { DashboardRootState } from "dashboard-init-app";
import { ReactWrapper, shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ninStateFromNinList } from "reducers/Nins";
import { initialState as personalDataInitialState } from "reducers/PersonalData";
import { MockStoreEnhanced } from "redux-mock-store";
import { dashboardTestState, fakeStore, setupComponent } from "./helperFunctions/DashboardTestApp";

// I am the component that: populates the profile landing page with user data.
// My job is to: display one of multiple states for the following user data:
// Name (none/added)
// National ID Number (none/added unverified/ added verified)
// Phone (none/added unverified/added verified or new one made primary)
// Email (added at signup or new one made primary)

// Comments N: this component renders different things depending on URL. These tests default to the profile and does not show that add and verify nin display at 'profile/evrify-identity'

describe("Profile component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <Profile />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("Profile component", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([{ number: "197801010000", verified: true, primary: false }]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({
      ...dashboardTestState,
      nins: test_nins,
      phones: {
        phones: [],
      },
      personal_data: personalDataInitialState,
    });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders <NameDisplay/> ", () => {
    const nameDisplay = wrapper.find(NameDisplay);
    expect(nameDisplay.exists()).toEqual(true);
  });

  it("Does renders <NinDisplay/> ", () => {
    const ninDisplay = wrapper.find(NinDisplay);
    expect(ninDisplay.exists()).toEqual(true);
  });

  it("Renders <PhoneDisplay/> ", () => {
    const phoneDisplay = wrapper.find(PhoneDisplay);
    expect(phoneDisplay.exists()).toEqual(true);
  });

  it("Renders <EmailDisplay/> ", () => {
    const emailDisplay = wrapper.find(EmailDisplay);
    expect(emailDisplay.exists()).toEqual(true);
  });

  it("Does not render <VerifyIdentity /> ", () => {
    const verifyIdentity = wrapper.find(VerifyIdentity);
    expect(verifyIdentity.exists()).toEqual(false);
  });
});
