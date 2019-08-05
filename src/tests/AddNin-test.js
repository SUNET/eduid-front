import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import AddNin from "components/AddNin";
const mock = require("jest-mock");
const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

// I am the component that: displays the nin input form or the added nin in the vetting process.
// My job is to: 
  // if no nin is saved: render <NinForm /> to take a nin
  // if nin is saved: render <NinDisplay /> to show added nin

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
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    config: {
      language: "en"
    },
    personal_data: {
      data: {
        eppn: "test-eppn"
      }
    },
    emails: {
      emails: []
    },
    nins: {
      nins: []
    },
    phones: {
      phones: []
    },
    profile: {
      pending: []
    },
    notifications: {
      messages: [],
      errors: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const props = {
      nins: [],
      nin: "",
      valid_nin: true,
      verifyingLetter: false,
      proofing_methods: []
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <AddNin {...props} />
        </MemoryRouter>
      </Provider>
    );
    return {
      props,
      wrapper
    };
  }
  const state = { ...fakeState };
  state.nins.nins = [];

  it("Renders <NinForm/> ", () => {
    const { wrapper } = setupComponent();
    const ninForm = wrapper.find("#nin-form");
    expect(ninForm.exists()).toEqual(true);
  });

  it("Does not render <NinDisplay/> ", () => {
    const { wrapper } = setupComponent();
    const ninDisplay = wrapper.find("#nin-display-container");
    expect(ninDisplay.exists()).toEqual(false);
  });
});

describe("AddNin component, when a nin is saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    config: {
      language: "en"
    },
    personal_data: {
      data: {
        eppn: "test-eppn"
      }
    },
    emails: {
      emails: []
    },
    nins: {
      nins: []
    },
    phones: {
      phones: []
    },
    profile: {
      pending: []
    },
    notifications: {
      messages: [],
      errors: []
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const props = {
      nins: [],
      nin: "",
      valid_nin: true,
      verifyingLetter: false,
      proofing_methods: []
    };
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <AddNin {...props} />
        </MemoryRouter>
      </Provider>
    );
    return {
      props,
      wrapper
    };
  }
  const state = { ...fakeState };
  state.nins.nins = [
    { number: "196701100006", verified: false, primary: false },
    { number: "196701110005", verified: false, primary: false }
  ];
  it("Renders <NinDisplay/> ", () => {
    const { wrapper } = setupComponent();
    const ninDisplay = wrapper.find(".profile-card");
    expect(ninDisplay.exists()).toEqual(true);
  });

  it("Does not render <NinForm/> ", () => {
    const { wrapper } = setupComponent();
    const ninForm = wrapper.find("#nin-form");
    expect(ninForm.exists()).toEqual(false);
  });
});
