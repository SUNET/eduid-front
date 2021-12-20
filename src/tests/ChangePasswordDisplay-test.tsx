import * as actions from "actions/Security";
import ChangePasswordDisplay from "components/ChangePasswordDisplay";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount, shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import securityReducer, { initialState as securityInitialState } from "reducers/Security";
import NotificationModal from "../login/components/Modals/NotificationModal";
import { fakeStore } from "./helperFunctions/DashboardTestApp";

// I am the component that: allows users to change password in settings.
// My job is to: I render a  "change password" button > that triggers a modal (the modal has to render two buttons, each with their own functionality)

// Comment N:
// 1. I attempted a test to show that a simulated click on the 'change password' button sets the showModal: bool, but couldn't get it to work (maybe not possible?)
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
  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore()}>
        <ChangePasswordDisplay />
      </ReduxIntlProvider>
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

describe("ChangePasswordDisplay component, when showModal is (false)", () => {
  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore()}>
        <ChangePasswordDisplay />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }
  // leave showModal as false
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

describe("ChangePasswordDisplay component, when showModal is (true)", () => {
  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore()}>
        <ChangePasswordDisplay showModal={true} />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }

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
  it("startConfirmationPassword() should trigger the action START_CHANGE_PASSWORD", () => {
    const expectedAction = {
      type: actions.START_CHANGE_PASSWORD,
    };
    expect(actions.initiatePasswordChange()).toEqual(expectedAction);
  });

  it("START_CHANGE_PASSWORD returns showModal: true", () => {
    const mockState = {
      ...securityInitialState,
      showModal: false,
    };
    expect(
      securityReducer(mockState, {
        type: actions.START_CHANGE_PASSWORD,
        payload: {},
      })
    ).toEqual({
      showModal: true,
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
    expect(actions.initiatePasswordChange()).toEqual(expectedAction);
  });
  it("GET_CHANGE_PASSWORD action returns the current state", () => {
    const mockState = {
      ...securityInitialState,
      showModal: false,
    };
    expect(
      securityReducer(mockState, {
        type: actions.GET_CHANGE_PASSWORD,
        payload: {},
      })
    ).toEqual({
      showModal: false,
    });
  });

  it("GET_CHANGE_PASSWORD_FAIL action returns an error state", () => {
    const mockState = {
      ...securityInitialState,
      showModal: false,
    };
    const err = "Error";
    expect(
      securityReducer(mockState, {
        type: actions.GET_CHANGE_PASSWORD_FAIL,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: err,
      showModal: false,
    });
  });
});
