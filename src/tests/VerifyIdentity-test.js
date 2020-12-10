import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import VerifyIdentity from "containers/VerifyIdentity";

const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

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
    config: {
      is_configured: false,
      proofing_methods: ["letter", "lookup_mobile", "oidc", "eidas"]
    },
    letter_proofing: {
      confirmingLetter: false
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
          <VerifyIdentity />
        </MemoryRouter>
      </Provider>
    );
    return {
      wrapper
    };
  }

  it("Renders a header", () => {
    const { wrapper } = setupComponent();
    const header = wrapper.find("h4");
    expect(header.exists()).toEqual(true);
  });

  // it("Renders <AddNin /> to control logic of displaying nin form or added nin number", () => {
  //   const { wrapper } = setupComponent();
  //   const addNin = wrapper.find(AddNin);
  //   expect(addNin.exists()).toEqual(true);
  // });

  // it("Does not render vetting buttons when app is not configured (is_configured: false)", () => {
  //   const { wrapper } = setupComponent();
  //   const vettingButtons = wrapper.find("p");
  //   expect(vettingButtons.exists()).toEqual(false);
  // });
});

describe("VerifyIdentity component, when nin is saved", () => {
  const fakeState = {
    nins: {
      nins: []
    },
    phones: {
      phones: []
    },
    config: {
      is_configured: false,
      proofing_methods: ["letter", "lookup_mobile", "oidc", "eidas"],
      token_verify_idp: "http://dev.test.swedenconnect.se/idp",
      eidas_url: "http://eidas.eduid.docker:8080/"
    },
    letter_proofing: {
      confirmingLetter: false
    },
    lookup_mobile: {
      showModal: false
    },
    eidas_data: {
      showModal: false
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  const state = { ...fakeState };
  state.config.is_configured = true;
  state.nins.nins = [
    { number: "196701100006", verified: false, primary: false }
  ];
  state.verifiedNinStatus = false;
  // it("Renders number when added", () => {
  //   const { wrapper } = setupComponent();
  //   const addNin = wrapper.find(AddNin);
  //   const ninNumber = addNin.find("#nin-number");
  //   expect(ninNumber.exists()).toEqual(true);
  // });

  // it("Renders buttons when app is configured", () => {
  //   const { wrapper } = setupComponent();
  //   const vettingButton = wrapper.find("button");
  //   expect(vettingButton.exists()).toEqual(true);
  //   expect(vettingButton.length).toEqual(3);
  // });

  // it("Renders <LetterProofing /> <LookupMobileProofing /> and <Eidas/>", () => {
  //   const { wrapper } = setupComponent();
  //   const letterProofing = wrapper.find(LetterProofing);
  //   const mobileProofing = wrapper.find(LookupMobileProofing);
  //   const eidasProofing = wrapper.find(Eidas);
  //   expect(letterProofing.exists()).toEqual(true);
  //   expect(mobileProofing.exists()).toEqual(true);
  //   expect(eidasProofing.exists()).toEqual(true);
  // });

  // it("Renders header prompting user to add and verify nin (verifiedNinStatus = false)", () => {
  //   const { wrapper } = setupComponent();
  //   const header = wrapper.find("h3");
  //   expect(header.exists()).toEqual(true);
  //   expect(header.text()).toContain("identity");
  //   expect(header.text()).not.toContain("Your eduID is ready to use");
  // });
});

describe("VerifyIdentity component, when nin is saved", () => {
  const fakeState = {
    nins: {
      nins: []
    },
    phones: {
      phones: []
    },
    config: {
      is_configured: false,
      proofing_methods: ["letter", "lookup_mobile", "oidc", "eidas"],
      token_verify_idp: "http://dev.test.swedenconnect.se/idp",
      eidas_url: "http://eidas.eduid.docker:8080/"
    },
    letter_proofing: {
      confirmingLetter: false
    },
    lookup_mobile: {
      showModal: false
    },
    eidas_data: {
      showModal: false
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  const state = { ...fakeState };
  state.config.is_configured = true;
  state.nins.nins = [
    { number: "196701100456", verified: true, primary: true },
    { number: "196701100678", verified: true, primary: false }
  ];
  state.verifiedNinStatus = true;
  // it("Renders number when verified", () => {
  //   const { wrapper } = setupComponent();
  //   const addNin = wrapper.find(AddNin);
  //   const ninNumber = addNin.find("#nin-number");
  //   expect(ninNumber.exists()).toEqual(true);
  //   expect(ninNumber.text()).toEqual("196701100456");
  // });

  // it("Renders header informing user that eduID is ready to use (verifiedNinStatus = true)", () => {
  //   const { wrapper } = setupComponent();
  //   const header = wrapper.find("h3");
  //   expect(header.exists()).toEqual(true);
  //   expect(header.text()).toContain("Your eduID is ready to use");
  //   expect(header.text()).not.toContain("Add and verify your id number");
  // });

  // it("Does not renders buttons when app (verifiedNinStatus = true)", () => {
  //   const { wrapper } = setupComponent();
  //   const vettingButton = wrapper.find("button");
  //   expect(vettingButton.exists()).toEqual(false);
  // });
});
