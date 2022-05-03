import React from "react";
import expect from "expect";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import VerifyIdentity from "containers/VerifyIdentity";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");

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
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    nins: {
      nins: [],
    },
    phones: {
      phones: [],
    },
    config: {
      is_configured: false,
      proofing_methods: ["letter", "lookup_mobile", "oidc", "eidas"],
    },
    letter_proofing: {
      confirmingLetter: false,
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <VerifyIdentity />
        </MemoryRouter>
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }

  it("Renders a header", () => {
    const { wrapper } = setupComponent();
    const header = wrapper.find("h4");
    expect(header.exists()).toEqual(true);
  });
});

describe("VerifyIdentity component, when nin is saved", () => {
  const fakeState = {
    nins: {
      nins: [],
    },
    phones: {
      phones: [],
    },
    config: {
      is_configured: false,
      proofing_methods: ["letter", "lookup_mobile", "oidc", "eidas"],
      token_verify_idp: "http://dev.test.swedenconnect.se/idp",
      eidas_url: "http://eidas.eduid.docker:8080/",
    },
    letter_proofing: {
      confirmingLetter: false,
    },
    lookup_mobile: {
      showModal: false,
    },
    eidas_data: {
      showModal: false,
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  const state = { ...fakeState };
  state.config.is_configured = true;
  state.nins.nins = [{ number: "196701100006", verified: false, primary: false }];
  state.verifiedNinStatus = false;
});

describe("VerifyIdentity component, when nin is saved", () => {
  const fakeState = {
    nins: {
      nins: [],
    },
    phones: {
      phones: [],
    },
    config: {
      is_configured: false,
      proofing_methods: ["letter", "lookup_mobile", "oidc", "eidas"],
      token_verify_idp: "http://dev.test.swedenconnect.se/idp",
      eidas_url: "http://eidas.eduid.docker:8080/",
    },
    letter_proofing: {
      confirmingLetter: false,
    },
    lookup_mobile: {
      showModal: false,
    },
    eidas_data: {
      showModal: false,
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  const state = { ...fakeState };
  state.config.is_configured = true;
  state.nins.nins = [
    { number: "196701100456", verified: true, primary: true },
    { number: "196701100678", verified: true, primary: false },
  ];
  state.verifiedNinStatus = true;
});
