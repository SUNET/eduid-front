const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy } from "expect";
import { addLocaleData, IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import Header from "containers/Header";
import Footer from "containers/Footer";
import MainContainer from "containers/DashboardMain";
import Notifications from "containers/Notifications";

const messages = require("../login/translation/messageIndex");
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
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <MainContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("The <Header/> and <Footer/> render", () => {
    const { wrapper } = setupComponent();
    const header = wrapper.find(Header);
    const footer = wrapper.find(Footer);
    expect(header.exists()).toEqual(true);
    expect(footer.exists()).toEqual(true);
  });

  it("The <Notifications/> render", () => {
    const { wrapper } = setupComponent();
    const notifications = wrapper.find(Notifications);
    expect(notifications.exists()).toEqual(true);
  });
});
