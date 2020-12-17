import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import Profile from "containers/Profile";
import NinDisplay from "containers/NinDisplay";
import NameDisplay from "containers/NameDisplay";
import PhoneDisplay from "containers/PhoneDisplay";
import EmailDisplay from "containers/EmailDisplay";
import VerifyIdentity from "containers/VerifyIdentity";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

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
        given_name: "",
        surname: ""
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
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
    return {
      wrapper
    };
  }

  it("Renders <NameDisplay/> ", () => {
    const { wrapper } = setupComponent();
    const nameDisplay = wrapper.find(NameDisplay);
    expect(nameDisplay.exists()).toEqual(true);
  });

  it("Does renders <NinDisplay/> ", () => {
    const { wrapper } = setupComponent();
    const ninDisplay = wrapper.find(NinDisplay);
    expect(ninDisplay.exists()).toEqual(true);
  });

  it("Renders <PhoneDisplay/> ", () => {
    const { wrapper } = setupComponent();
    const phoneDisplay = wrapper.find(PhoneDisplay);
    expect(phoneDisplay.exists()).toEqual(true);
  });

  it("Renders <EmailDisplay/> ", () => {
    const { wrapper } = setupComponent();
    const emailDisplay = wrapper.find(EmailDisplay);
    expect(emailDisplay.exists()).toEqual(true);
  });

  it("Does not render <VerifyIdentity /> ", () => {
    const { wrapper } = setupComponent();
    const verifyIdentity = wrapper.find(VerifyIdentity);
    expect(verifyIdentity.exists()).toEqual(false);
  });
});
