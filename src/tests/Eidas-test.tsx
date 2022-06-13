import Eidas from "components/Eidas";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount } from "enzyme";
import NotificationModal from "login/components/Modals/NotificationModal";
import React from "react";
import { fakeStore } from "./helperFunctions/DashboardTestApp";

describe("Eidas component", () => {
  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore()}>
        <Eidas />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }
  it("has a button", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("button");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });

  it("has a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotificationModal);
    expect(modal.exists()).toEqual(true);
  });
});
