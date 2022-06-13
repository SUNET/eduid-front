import { DashboardRootState } from "dashboard-init-app";
import { ReactWrapper } from "enzyme";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import React from "react";
import { MemoryRouter } from "react-router";
import { ninStateFromNinList } from "reducers/Nins";
import { MockStoreEnhanced } from "redux-mock-store";
import { dashboardTestState, fakeStore, setupComponent } from "./helperFunctions/DashboardTestApp";

//const mock = require("jest-mock");

describe("LookupMobile component", () => {
  let store: MockStoreEnhanced<DashboardRootState>;

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({
      ...dashboardTestState,
      nins: ninStateFromNinList([]),
      phones: {
        phones: [],
      },
      config: { lookup_mobile_proofing_url: "http://localhost/lookup-mobile" },
    });
  });

  function getWrapper(overrides?: Partial<DashboardRootState>): ReactWrapper {
    if (!overrides) {
      return setupComponent({
        component: (
          <MemoryRouter>
            <LookupMobileProofing disabled={false} />
          </MemoryRouter>
        ),
        store,
        overrides,
      });
    }
    return setupComponent({
      component: (
        <MemoryRouter>
          <LookupMobileProofing disabled={false} />
        </MemoryRouter>
      ),
      overrides,
    });
  }

  it("Renders button text", () => {
    const wrapper = getWrapper();
    const button = wrapper.find("button");
    expect(button.exists()).toEqual(true);
    expect(button.text()).toContain("by phone");
  });

  it("Renders a vetting button", () => {
    const wrapper = getWrapper();
    const button = wrapper.find("button");
    expect(button.exists()).toEqual(true);
  });

  it("Renders button text, add ID number to verify phone", () => {
    const wrapper = getWrapper();
    const explanation = wrapper.find("div.explanation-link");
    expect(explanation.exists()).toEqual(true);
    expect(explanation.text()).toContain("ID number");

    /* 'disabled' is passed as prop to component, and set to false in setupComponent so even if the
     * button gives an error message it should not be disabled here */
    const buttonDisabled = wrapper.find("button").prop("disabled");
    expect(buttonDisabled).toBeFalsy();
  });

  it("Renders button text, the phone number is added", () => {
    const wrapper = getWrapper({
      nins: ninStateFromNinList([{ number: "198812120000", verified: false, primary: true }]),
      phones: { phones: [{ number: "+46700011555", verified: false, primary: true }] },
    });

    const explanation = wrapper.find("div.explanation-link");
    const confirmPhone = explanation.at(0);
    expect(confirmPhone.exists()).toEqual(true);
    expect(confirmPhone.text()).toContain("Confirm");

    /* 'disabled' is passed as prop to component, and set to false in setupComponent so even if the
     * button gives an error message it should not be disabled here */
    const buttonDisabled = wrapper.find("button").prop("disabled");
    expect(buttonDisabled).toBeFalsy();
  });

  it("Renders button text, if the phone number is non swedish", () => {
    const wrapper = getWrapper({
      nins: ninStateFromNinList([{ number: "198812120000", verified: false, primary: true }]),
      phones: { phones: [{ number: "+36700011555", verified: true, primary: true }] },
    });

    const explanation = wrapper.find("div.explanation-link");
    expect(explanation.exists()).toEqual(true);
    expect(explanation.text()).toContain("Swedish");

    /* 'disabled' is passed as prop to component, and set to false in setupComponent so even if the
     * button gives an error message it should not be disabled here */
    const buttonDisabled = wrapper.find("button").prop("disabled");
    expect(buttonDisabled).toBeFalsy();
  });

  it("Renders button text, when verified swedish phone", () => {
    const wrapper = getWrapper({
      nins: ninStateFromNinList([{ number: "198812120000", verified: false, primary: true }]),
      phones: { phones: [{ number: "+46700011555", verified: true, primary: true }] },
    });

    const explanation = wrapper.find("div.explanation-link");
    expect(explanation.exists()).toEqual(true);
    expect(explanation.text()).toContain("");

    const buttonDisabled = wrapper.find("button").prop("disabled");
    expect(buttonDisabled).toBeFalsy();
  });
});
