import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import VerifyIdentityProcess from "components/VerifyIdentityProcess";
import AddNin from "components/AddNin";
import vettingRegistry from "vetting-registry";
const mock = require("jest-mock");
const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

// my job is to: control the display of the email address registered at signup in the profile

describe("VerifyIdentityProcess component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <VerifyIdentityProcess />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("VerifyIdentityProcess component, no nin added ", () => {
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
      PROOFING_METHODS: ["letter", "lookup_mobile", "oidc", "eidas"]
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
        <VerifyIdentityProcess />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  it("Renders a header", () => {
    const { wrapper } = setupComponent();
    const vettingH3 = wrapper.find("h3");
    expect(vettingH3.exists()).toEqual(true);
  });

  it("Renders <AddNin /> to control logic of displaying nin form or added nin number", () => {
    const { wrapper } = setupComponent();
    const addNin = wrapper.find(AddNin);
    expect(addNin.exists()).toEqual(true);
  });

  it("Does not render vetting buttons when app is not configured (is_configured: false)", () => {
    const { wrapper } = setupComponent();
    const vettingButtons = wrapper.find("p");
    expect(vettingButtons.exists()).toEqual(false);
  });
});

// describe("VerifyIdentityProcess component, when email is saved", () => {
//   const fakeStore = state => ({
//     default: () => {},
//     dispatch: mock.fn(),
//     subscribe: mock.fn(),
//     getState: () => ({ ...state })
//   });

//   const fakeState = {
//     nins: {
//       nins: []
//     },
//     config: {
//       is_configured: false,
//       PROOFING_METHODS: ["letter", "lookup_mobile", "oidc", "eidas"]
//     },
//     letter_proofing: {
//       confirmingLetter: false
//     },
//     intl: {
//       locale: "en",
//       messages: messages
//     }
//   };

//   function setupComponent() {
//     const wrapper = mount(
//       <Provider store={fakeStore(fakeState)}>
//         <VerifyIdentityProcess />
//       </Provider>
//     );
//     return {
//       wrapper
//     };
//   }
//   const state = { ...fakeState };
//   state.config.is_configured = true;
//   state.nins.nins = [
//     { number: "196701100006", verified: false, primary: false }
//   ];
//   it("Renders the primary email (even if multiple verified)", () => {
//     const { wrapper } = setupComponent();
//     const nin = wrapper.find("p");
//     expect(primaryEmail.exists()).toEqual(true);
//     expect(primaryEmail.text()).toContain("njons-test@test.com");
//     expect(primaryEmail.text()).not.toContain("njons-testing@email.com");
//     expect(primaryEmail.text()).not.toContain("njons-best-test@email.com");
//   });

//   it("Renders different headers depending on verifiedNinStatus", () => {
//     const { wrapper } = setupComponent();
//     const nin = wrapper.find("p");
//     expect(primaryEmail.exists()).toEqual(true);
//     expect(primaryEmail.text()).toContain("njons-test@test.com");
//     expect(primaryEmail.text()).not.toContain("njons-testing@email.com");
//     expect(primaryEmail.text()).not.toContain("njons-best-test@email.com");
//   });
// });

// describe("EmailDisplay component, when email is saved", () => {
//   const fakeStore = state => ({
//     default: () => { },
//     dispatch: mock.fn(),
//     subscribe: mock.fn(),
//     getState: () => ({ ...state })
//   });

//   const fakeState = {
//     emails: {
//       emails: []
//     },
//     intl: {
//       locale: "en",
//       messages: messages
//     }
//   };

//   function setupComponent() {
//     const wrapper = mount(
//       <Provider store={fakeStore(fakeState)}>
//         <EmailDisplay />
//       </Provider>
//     );
//     return {
//       wrapper
//     };
//   }
//   const state = { ...fakeState };
//   state.emails.emails = [
//     { email: "njons-test@test.com", primary: false, verified: true },
//     { email: "njons-testing@email.com", primary: false, verified: true },
//     { email: "njons-best-test@email.com", primary: true, verified: true }
//   ];
//   it("Renders the primary phone (even if multiple verified and new phone set as primary)", () => {
//     const { wrapper } = setupComponent();
//     const primaryEmail = wrapper.find("p");
//     expect(primaryEmail.exists()).toEqual(true);
//     expect(primaryEmail.text()).toContain("njons-best-test@email.com");
//     expect(primaryEmail.text()).not.toContain("njons-testing@email.com");
//     expect(primaryEmail.text()).not.toContain("njons-test@test.com");
//   });
// });
