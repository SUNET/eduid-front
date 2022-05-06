import AddNin from "components/AddNin";
import LetterProofingButton from "components/LetterProofing";
import VerifyIdentity from "components/VerifyIdentity";
import { DashboardRootState } from "dashboard-init-app";
import { ReactWrapper, shallow } from "enzyme";
import expect from "expect";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ninStateFromNinList } from "reducers/Nins";
import { MockStoreEnhanced } from "redux-mock-store";
import { dashboardTestState, fakeStore, setupComponent } from "./helperFunctions/DashboardTestApp";
import EidasContainer from "containers/Eidas";

// const mock = require("jest-mock");
// const messages = require("../login/translation/messageIndex");
// I am VerifyIdentityProcess: I hold the nin input/display and show the vetting buttons once there is a valid nin
// My job is to: if there is a nin: display vetting buttons, if nin is verified: remove buttons

// Comment N: This component just renders <AddNin /> and displays the vetting buttons, so I think these rendering test might be enough

describe("VerifyIdentity component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <VerifyIdentity />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("VerifyIdentity component, no nin added ", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({
      ...dashboardTestState,
      config: { is_configured: true, eidas_url: "http://localhost/eidas", token_verify_idp: "token-idp" },
      nins: test_nins,
      phones: {
        phones: [],
      },
      eidas_data: { eidas_sp_freja_idp_url: "eidas_freja", showModal: false },
      letter_proofing: {},
      openid_data: {},
      openid_freja_data: {},
    });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <VerifyIdentity />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders a header", () => {
    const header = wrapper.find("h4");
    expect(header.exists()).toEqual(true);
    // Two steps displayed: 1. add NIN 2. choose option below
    expect(header.length).toEqual(2);
  });

  it("Renders Letter Proofing ", () => {
    const component = wrapper.find(LetterProofingButton);
    expect(component.exists()).toEqual(true);

    // vetting option should be disabled when there is no NIN
    expect(component.find("button").prop("disabled")).toEqual(true);
  });

  it("Renders Mobile Proofing ", () => {
    const component = wrapper.find(LookupMobileProofing);
    expect(component.exists()).toEqual(true);

    // vetting option should be disabled when there is no NIN
    expect(component.find("button").prop("disabled")).toEqual(true);
  });

  it("Renders Freja Proofing ", () => {
    const component = wrapper.find(EidasContainer);
    expect(component.exists()).toEqual(true);

    // vetting option should be enabled, even when there is no NIN
    expect(component.find("button").prop("disabled")).toBeFalsy();
  });
});

describe("VerifyIdentity component, NIN already added ", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let state;
  let wrapper: ReactWrapper;

  const test_nins = ninStateFromNinList([{ number: "197801010000", verified: true, primary: true }]);

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({
      ...dashboardTestState,
      config: { is_configured: true, eidas_url: "http://localhost/eidas", token_verify_idp: "token-idp" },
      nins: test_nins,
      phones: {
        phones: [],
      },
      eidas_data: { eidas_sp_freja_idp_url: "eidas_freja", showModal: false },
      letter_proofing: {},
      openid_data: {},
      openid_freja_data: {},
    });
    state = store.getState();

    wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <VerifyIdentity />
        </MemoryRouter>
      ),
      store: store,
    });
  });

  it("Renders a header", () => {
    const header = wrapper.find("h4");
    expect(header.exists()).toEqual(true);
    expect(header.text()).toContain("ready to use");
  });
});
