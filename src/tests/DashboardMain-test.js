const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy } from "expect";
import { addLocaleData, IntlProvider } from "react-intl";
import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";
import { MemoryRouter } from "react-router-dom";
import Header from "containers/Header";
import Footer from "containers/Footer";
import MainContainer from "containers/DashboardMain";
import Notifications from "containers/Notifications";

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
