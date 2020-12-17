import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { addLocaleData, IntlProvider } from "react-intl";
import NameDisplay from "containers/NameDisplay";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

// my job is to: control the display of the name (either retrieved on vetting) or added by user in the profile

// Comment N: This component controls rendering of name only in profile, so I think these rendering test might be enough

describe("NameDisplay component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <NameDisplay />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("NameDisplay component, when no names are saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    personal_data: {
      data: {
        given_name: "",
        surname: ""
      }
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <NameDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.personal_data.data.given_name = "";
  state.personal_data.data.surname = "";
  it("Renders a header", () => {
    const { wrapper } = setupComponent();
    const nameLabel = wrapper.find("label");
    expect(nameLabel.exists()).toEqual(true);
  });

  it("Renders text when no name is saved", () => {
    const { wrapper } = setupComponent();
    const nameText = wrapper.find("p");
    expect(nameText.exists()).toEqual(true);
    expect(nameText.text()).toContain("no");
  });
});

describe("NameDisplay component, when names are saved", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    personal_data: {
      data: {
        given_name: "",
        surname: ""
      }
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <NameDisplay />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  state.personal_data.data.given_name = "EduID";
  state.personal_data.data.surname = "Account User";
  it("Renders the first and last name when saved", () => {
    const { wrapper } = setupComponent();
    const names = wrapper.find("p");
    expect(names.exists()).toEqual(true);
    expect(names.text()).toContain("EduID Account User");
    expect(names.text()).not.toContain("Account User EduID");
    expect(names.text()).not.toContain("Testaren Test Testsson");
  });
});
