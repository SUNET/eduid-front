import React from "react";
import expect from "expect";
import { shallow, mount } from "enzyme/build";
import { IntlProvider } from "react-intl";
import { ReduxIntlProvider } from "components/ReduxIntl";
import NinForm from "components/NinForm";

const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");

describe("NinForm Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <NinForm />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("Nin Form renders important elements", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    identities: {
      is_verified: false,
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <NinForm />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }

  it("nin input renders", () => {
    const { wrapper } = setupComponent();
    const ninInput = wrapper.find("input");
    expect(ninInput.exists()).toEqual(true);
  });

  it("add nin button renders", () => {
    const { wrapper } = setupComponent();
    const ninButton = wrapper.find("button");
    expect(ninButton.exists()).toEqual(true);
  });
});
