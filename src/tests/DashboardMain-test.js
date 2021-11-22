const mock = require("jest-mock");
import React from "react";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { shallow, mount } from "enzyme";
import expect from "expect";
import { IntlProvider } from "react-intl";
import Header from "containers/Header";
import Footer from "containers/Footer";
import MainContainer from "containers/DashboardMain";
import Notifications from "containers/Notifications";
import { MemoryRouter } from "react-router-dom";

const messages = require("../login/translation/messageIndex");

const fakeStore = (state) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state }),
});

function setupComponent() {
  const store = fakeStore({
    config: {
      language: "en",
    },
    personal_data: {
      data: {
        eppn: "test-eppn",
      },
    },
    emails: {
      emails: [],
    },
    nins: {
      nins: [],
    },
    phones: {
      phones: [],
    },
    profile: {
      pending: [],
    },
    notifications: {
      messages: [],
      errors: [],
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  });
  const props = {
    show_sidebar: true,
    eppn: "eppn-eppn",
  };
  const wrapper = mount(
    <ReduxIntlProvider store={store}>
      <MemoryRouter>
        <MainContainer {...props} />
      </MemoryRouter>
    </ReduxIntlProvider>
  );
  return {
    props,
    wrapper,
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
