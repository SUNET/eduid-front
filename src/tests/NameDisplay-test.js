import React from "react";
import expect from "expect";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { shallow, mount } from "enzyme";
import { IntlProvider } from "react-intl";
import NameDisplay from "components/NameDisplay";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
import { MemoryRouter } from "react-router-dom";

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
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    personal_data: {
      data: {
        given_name: "",
        surname: "",
      },
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
          <NameDisplay />
        </MemoryRouter>
      </ReduxIntlProvider>
    );
    return {
      wrapper,
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
    const nameText = wrapper.find("a");
    expect(nameText.exists()).toEqual(true);
    expect(nameText.text()).toContain("add");
  });
});

describe("NameDisplay component, when names are saved", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    personal_data: {
      data: {
        given_name: "",
        surname: "",
      },
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <NameDisplay />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }
  const state = { ...fakeState };
  state.personal_data.data.given_name = "EduID";
  state.personal_data.data.surname = "Account User";
  it("Renders the first and last name when saved", () => {
    const { wrapper } = setupComponent();
    const names = wrapper.find("div");

    expect(names.exists()).toEqual(true);
    expect(names.at(0).text()).toContain("EduID Account User");
    expect(names.at(0).text()).not.toContain("Account User EduID");
    expect(names.at(1).text()).not.toContain("Testaren Test Testsson");
  });
});
