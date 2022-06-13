import NotificationsContainer from "containers/Notifications";
import { DashboardRootState } from "dashboard-init-app";
import { ReactWrapper } from "enzyme";
import expect from "expect";
import React from "react";
import { notificationsSlice } from "reducers/Notifications";
import { MockStoreEnhanced } from "redux-mock-store";
import { dashboardTestState, fakeStore, setupComponent } from "./helperFunctions/DashboardTestApp";

describe("Notifications Component", () => {
  const test_state: Partial<DashboardRootState> = {
    config: {
      debug: true, // prevents unknown messages (such as "dummy message") from being generalised
    },
    notifications: {
      info: { message: "dummy message", level: "info" },
    },
  };

  it("Renders the notifications component", () => {
    const wrapper = setupComponent({
        component: <NotificationsContainer />,
        overrides: test_state,
      }),
      alertElem = wrapper.find("Alert");
    expect(alertElem.length).toEqual(1);
    expect(alertElem.props().color).toEqual("success");
    expect(alertElem.text()).toContain("dummy message");
  });

  it("Renders the notifications component - prod", () => {
    const wrapper = setupComponent({
        component: <NotificationsContainer />,
        overrides: { ...test_state, config: { debug: false } },
      }),
      alertElem = wrapper.find("Alert");

    expect(alertElem.length).toEqual(1);
    expect(alertElem.props().color).toEqual("success");

    // with state.config.debug being false, unknown messages should be generalised so this should
    // say "Success" with the current translations
    expect(alertElem.text()).toContain("Success");
  });

  const errorState: Partial<DashboardRootState> = {
    ...test_state,
    notifications: {
      error: { message: "dummy error", level: "error" },
    },
  };

  it("Renders the notifications component - error", () => {
    const wrapper = setupComponent({
        component: <NotificationsContainer />,
        overrides: errorState,
      }),
      alertElem = wrapper.find("Alert");

    expect(alertElem.length).toEqual(1);
    expect(alertElem.props().color).toEqual("danger");
    expect(alertElem.text()).toContain("dummy error");
  });
});

describe("Test Notifications Container", () => {
  let store: MockStoreEnhanced<DashboardRootState>;
  let wrapper: ReactWrapper;

  const test_state: Partial<DashboardRootState> = {
    notifications: {
      info: { message: "dummy", level: "info" },
    },
  };

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore({ ...dashboardTestState, ...test_state });

    wrapper = setupComponent({
      component: <NotificationsContainer />,
      store: store,
    });
  });

  it("Clicks the dismiss button", () => {
    const button = wrapper.find('button[aria-label="Close"]');
    expect(button.exists()).toEqual(true);

    button.first().simulate("click");

    const actualActions = store.getActions().map((action) => action.type);
    expect(actualActions).toEqual([notificationsSlice.actions.clearNotifications.type]);
  });
});
