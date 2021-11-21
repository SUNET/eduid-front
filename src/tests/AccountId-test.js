import React from "react";
import expect from "expect";
import { shallow } from "enzyme";
import AccountIdContainer from "containers/AccountId";
import { IntlProvider } from "react-intl";
const messages = require("../login/translation/messageIndex");
const mock = require("jest-mock");

describe("AccountId component renders", () => {
  const props = {
    data: {
      given_name: "",
      surname: "",
      display_name: "",
      language: "",
      eppn: "dummy-eppn",
    },
  };
  const wrapper = shallow(
    <IntlProvider locale="en">
      <AccountIdContainer {...props} />
    </IntlProvider>
  );
  it("Component does not render 'null' or 'false'", () => {
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
  it("Component receives user data as props", () => {
    expect(wrapper.props()).toEqual({
      data: {
        display_name: "",
        eppn: "dummy-eppn",
        given_name: "",
        language: "",
        surname: "",
      },
    });
  });
  expect(wrapper.props().data.eppn).toEqual("dummy-eppn");
});

describe("AccountId component renders", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });
  const fakeState = {
    personal_data: {
      data: {
        eppn: "dummy-eppn",
      },
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    return {
      wrapper,
    };
  }

  it("Component renders h4 heading", () => {
    const { wrapper } = setupComponent();
    const heading = wrapper.find("h4");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toContain("Unique ID");
  });

  it("Component renders eppn", () => {
    const { wrapper } = setupComponent();
    const eppn = wrapper.find(".display-data");
    expect(eppn.exists()).toBe(true);
    expect(eppn.text()).toContain("dummy-eppn");
  });
});
