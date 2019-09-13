import React from "react";
import expect from "expect";
import { shallow, mount } from "enzyme/build";
import { IntlProvider } from "react-intl";
import { Provider } from "react-intl-redux";
import NinForm from "components/NinForm";

const mock = require("jest-mock");
const messages = require("../../i18n/l10n/en");

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
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <NinForm />
      </Provider>
    );
    return {
      wrapper
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
