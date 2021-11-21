import React from "react";
import expect from "expect";
import { Provider } from "react-intl-redux";
import { put } from "redux-saga/effects";
import { shallow, mount } from "enzyme";
import { IntlProvider } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";
import ChangePasswordDisplay from "containers/ChangePasswordDisplay";
import * as actions from "actions/Security";
import securityReducer from "reducers/Security";
import { requestPasswordChange } from "sagas/Security";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");

// I am the component that: allows users to change password in settings.
// My job is to: I render a  "change password" button > that triggers a modal (the modal has to render two buttons, each with their own functionality)

// Comment N:
// 1. I attempted a test to show that a simulated click on the 'change password' button sets the confirming_change: bool, but couldn't get it to work (maybe not possible?)
// 2. I also attempted to grab the name of the onClick function to match it to one we expect, but couldn't get it to work (maybe not possible?)
// - is it possible to test that a specific button starts the correct chain of events?
// - is it possible to prove that the ACCEPT button triggers handleConfirmationPAssword() and dispatches confirmPasswordChange()
// - is it possible to prove that the CANCEL button triggers handleStopConfirmationPassword and dispatches stopConfirmationPassword()

describe("ChangePasswordDisplay component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <ChangePasswordDisplay />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("ChangePasswordDisplay component", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    security: {
      confirming_change: false,
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <ChangePasswordDisplay />
      </Provider>
    );
    return {
      wrapper,
    };
  }
  it("has a button", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });

  it("has a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotificationModal);
    expect(modal.exists()).toEqual(true);
  });
});

describe("ChangePasswordDisplay component, when confirming_change is (false)", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    security: {
      confirming_change: false,
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <ChangePasswordDisplay />
      </Provider>
    );
    return {
      wrapper,
    };
  }
  // leave confirming_change as false
  it("does not render a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotificationModal);
    expect(modal.props().showModal).toEqual(false);
  });

  it("Renders only one 'change password' EduIDButton", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("EduIDButton");
    expect(button.length).toEqual(1);
  });
});

describe("ChangePasswordDisplay component, when confirming_change is (true)", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });

  const fakeState = {
    security: {
      confirming_change: false,
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <ChangePasswordDisplay />
      </Provider>
    );
    return {
      wrapper,
    };
  }
  const state = { ...fakeState };
  // set confirming_change to true
  state.security.confirming_change = true;
  it("renders a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotificationModal);
    expect(modal.props().showModal).toEqual(true);
  });
  it("Renders ACCEPT and CANCEL EduIDButtons in modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotificationModal);
    const button = modal.find("EduIDButton");
    expect(button.length).toEqual(2);
  });
});

describe("ChangePasswordDisplay redux functionality", () => {
  it("ChangePasswordDisplay button dispatches handlestartConfirmationPassword()", () => {
    // TEST: prove that this EduIDButton triggers handleStartConfirmationPassword() > dispatches startConfirmationPassword()
    // const expectedAction = {
    //   type: actions.START_CHANGE_PASSWORD
    // };
    // expect(actions.startConfirmationPassword()).toEqual(expectedAction);
  });

  it("startConfirmationPassword() should trigger the action START_CHANGE_PASSWORD", () => {
    const expectedAction = {
      type: actions.START_CHANGE_PASSWORD,
    };
    expect(actions.startConfirmationPassword()).toEqual(expectedAction);
  });

  it("START_CHANGE_PASSWORD retuns confirming_change: true", () => {
    const mockState = {
      confirming_change: false,
    };
    expect(
      securityReducer(mockState, {
        type: actions.START_CHANGE_PASSWORD,
      })
    ).toEqual({
      confirming_change: true,
    });
  });
});

// ----- MODAL STUFF ----- //
describe("Logout modal redux functionality", () => {
  // TEST: 2. Can we prove this modal redirects?
  it("Modal ACCEPT button triggers handleConfirmationPassword()", () => {
    // TEST: 3. Can we prove that the ACCEPT button triggers handleConfirmationPassword() > dispatches confirmPasswordChange()
  });
  it("Modal ACCEPT button should trigger the GET_CHANGE_PASSWORD action ", () => {
    const expectedAction = {
      type: actions.GET_CHANGE_PASSWORD,
    };
    expect(actions.confirmPasswordChange()).toEqual(expectedAction);
  });
  it("GET_CHANGE_PASSWORD action retuns the current state", () => {
    const mockState = {
      confirming_change: false,
    };
    expect(
      securityReducer(mockState, {
        type: actions.GET_CHANGE_PASSWORD,
      })
    ).toEqual({
      confirming_change: false,
    });
  });

  it("GET_CHANGE_PASSWORD_FAIL action retuns an error state", () => {
    const mockState = {
      confirming_change: false,
    };
    const err = "Error";
    expect(
      securityReducer(mockState, {
        type: actions.GET_CHANGE_PASSWORD_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: err,
      confirming_change: false,
    });
  });

  it("Modal CANCEL button triggers handleStopConfirmationPassword", () => {
    // TEST: can we prove that the CANCEL button triggers handleStopConfirmationPassword > dispatches stopConfirmationPassword()
  });
  it("Modal CANCEL button should trigger the STOP_CHANGE_PASSWORD action ", () => {
    const expectedAction = {
      type: actions.STOP_CHANGE_PASSWORD,
    };
    expect(actions.stopConfirmationPassword()).toEqual(expectedAction);
  });
  it("STOP_CHANGE_PASSWORD action retuns confirming_change: false", () => {
    const mockState = {
      confirming_change: false,
    };
    expect(
      securityReducer(mockState, {
        type: actions.STOP_CHANGE_PASSWORD,
      })
    ).toEqual({
      confirming_change: false,
    });
  });
});

// ------- Tests from previous version

describe("Security Container", () => {
  let mockProps, language, getWrapper, getState, dispatch, store;

  beforeEach(() => {
    getState = function () {
      return {
        security: {
          message: "",
          confirming_change: false,
        },
        config: {
          csrf_token: "",
          // security_url: "/dummy-sec-url",
          dashboard_url: "/dummy-dash-url/",
          token_service_url: "/dummy-tok-url/",
        },
        intl: {
          locale: "en",
          messages: messages,
        },
        notifications: {
          messages: [],
          errors: [],
        },
      };
    };

    mockProps = {
      credentials: [],
      language: "en",
      confirming_deletion: false,
      webauthn_asking_description: false,
    };

    getWrapper = function ({ deleting = false, askingDesc = false, props = mockProps } = {}) {
      store = fakeStore(getState(deleting, askingDesc));
      dispatch = store.dispatch;

      const wrapper = mount(
        <Provider store={store}>
          <ChangePasswordDisplay {...props} />
        </Provider>
      );
      return wrapper;
    };
    language = getWrapper().find(ChangePasswordDisplay).props().language;
  });

  it("Renders test", () => {
    expect(language).toEqual("en");
  });

  it("Clicks change", () => {
    expect(dispatch.mock.calls.length).toEqual(0);
    getWrapper().find("EduIDButton#security-change-button").props().onClick();
    expect(dispatch.mock.calls.length).toEqual(2);
  });
});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state }),
});

const mockState = {
  security: {
    location: "dummy-location",
  },
  config: {
    csrf_token: "csrf-token",
    dashboard_url: "/dummy-dash-url/",
    token_service_url: "/dummy-tok-url/",
    security_url: "/dummy-sec-url",
  },
  intl: {
    locale: "en",
    messages: messages,
  },
};
describe("Async component", () => {
  it("Sagas requestPasswordChange", () => {
    const oldLoc = window.location.href;
    let mockWindow = {
      location: {
        href: oldLoc,
      },
    };

    const generator = requestPasswordChange(mockWindow);

    let next = generator.next();
    expect(next.value).toEqual(put(actions.stopConfirmationPassword()));

    next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    generator.next(mockState.config);
    expect(mockWindow.location.href).toEqual("/dummy-tok-url/chpass?next=%2Fdummy-dash-url%2Fchpass");
  });
});
