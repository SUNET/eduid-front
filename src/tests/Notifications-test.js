import React from "react";
import expect from "expect";

import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";
import NotificationsContainer from "containers/Notifications";
import * as actions from "actions/Notifications";

describe("Notifications Component", () => {
  const state = {
    config: {
      debug: true
    },
    notifications: {
      messages: [{ msg: "dummy message", vals: null }],
      warnings: [],
      errors: []
    }
  };

  it("Renders the notifications component", () => {
    const wrapper = setupComponent({
        component: <NotificationsContainer />,
        overrides: state
      }),
      alertElem = wrapper.find("Alert");

    expect(alertElem.length).toEqual(1);
    expect(alertElem.props().color).toEqual("success");
    expect(alertElem.text()).toContain("dummy message");
  });

  const prodState = {
    config: {
      debug: false
    },
    notifications: {
      ...state.notifications
    }
  };

  it("Renders the notifications component - prod", () => {
    const wrapper = setupComponent({
        component: <NotificationsContainer />,
        overrides: prodState
      }),
      alertElem = wrapper.find("Alert");

    expect(alertElem.length).toEqual(1);
    expect(alertElem.props().color).toEqual("success");
    expect(alertElem.text()).not.toContain("dummy message");
  });

  const warnState = {
    config: {
      ...state.config
    },
    notifications: {
      messages: [],
      warnings: [{ msg: "dummy warning", vals: null }],
      errors: []
    }
  };

  it("Renders the notifications component - warning", () => {
    const wrapper = setupComponent({
        component: <NotificationsContainer />,
        overrides: warnState
      }),
      alertElem = wrapper.find("Alert");

    expect(alertElem.length).toEqual(1);
    expect(alertElem.props().color).toEqual("warning");
    expect(alertElem.text()).toContain("dummy warning");
  });

  const errorState = {
    config: {
      ...state.config
    },
    notifications: {
      messages: [],
      warnings: [],
      errors: [{ msg: "dummy error", vals: null }]
    }
  };

  it("Renders the notifications component - error", () => {
    const wrapper = setupComponent({
        component: <NotificationsContainer />,
        overrides: errorState
      }),
      alertElem = wrapper.find("Alert");

    expect(alertElem.length).toEqual(1);
    expect(alertElem.props().color).toEqual("danger");
    expect(alertElem.text()).toContain("dummy error");
  });
});

describe("Notification Actions", () => {
  it("Should add new notification ", () => {
    const expectedAction = {
      type: actions.NEW_NOTIFICATION,
      payload: {
        message: "dummy message",
        level: "dummy level",
        values: null
      }
    };
    expect(actions.eduidNotify("dummy message", "dummy level")).toEqual(
      expectedAction
    );
  });

  it("Should remove a notification ", () => {
    const expectedAction = {
      type: actions.RM_NOTIFICATION,
      payload: {
        level: "dummy level",
        index: 0
      }
    };
    expect(actions.eduidRMNotify("dummy level", 0)).toEqual(expectedAction);
  });

  it("Should remove all notifications", () => {
    const expectedAction = {
      type: actions.RM_ALL_NOTIFICATION
    };
    expect(actions.eduidRMAllNotify()).toEqual(expectedAction);
  });
});

describe("Test Notifications Container", () => {
  let wrapper, dispatch;

  beforeEach(() => {
    const store = fakeStore(
      getState({
        notifications: {
          messages: [{ msg: "dummy", vals: null }],
          warnings: [],
          errors: []
        }
      })
    );
    dispatch = store.dispatch;
    wrapper = setupComponent({
      component: <NotificationsContainer />,
      store: store
    });
  });

  it("Clicks a language selector button", () => {
    const numCalls = dispatch.mock.calls.length;
    const mockEvent = {
      preventDefault: () => {},
      target: {
        closest: () => {
          return { dataset: { level: "messages", index: 0 } };
        }
      }
    };
    wrapper
      .find("button")
      .props()
      .onClick(mockEvent);
    expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  });
});
