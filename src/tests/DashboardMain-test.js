const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy } from "expect";
import { addLocaleData } from "react-intl";
import { MemoryRouter } from "react-router-dom";

import MainContainer from "containers/DashboardMain";

const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

function setupComponent() {
  const store = fakeStore({
    config: {
      window_size: "lg",
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
  });
  const props = {
    window_size: "lg",
    show_sidebar: true,
    eppn: "eppn-eppn"
  };
  const wrapper = mount(
    <Provider store={store}>
      <MainContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

describe("Main Component", () => {
  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
      mainContent = wrapper.find("div#content-block");

    expect(mainContent.length).toEqual(1);
  });
});
