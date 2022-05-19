import * as actions from "actions/Email";
import { shallow } from "enzyme";
import expect from "expect";
import RegisterEmail from "login/components/RegisterEmail/RegisterEmail";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";
import emailReducer from "reducers/Email";
import { fakeStore, setupComponent } from "./helperFunctions/SignupTestApp";

describe("Email Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <RegisterEmail />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Email address input renders", () => {
    const fullWrapper = setupComponent({
      component: <RegisterEmail />,
    });
    const input = fullWrapper.find("input");
    expect(input.exists()).toEqual(true);
  });
  it("'Register for eduID' button renders", () => {
    const fullWrapper = setupComponent({
      component: <RegisterEmail />,
    });
    const button = fullWrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.text()).toContain("eduID");
  });
});

describe("Email Actions", () => {
  it("Should add an email ", () => {
    const expectedAction = {
      type: actions.ADD_EMAIL,
      payload: {
        email: "dummy@example.com",
      },
    };
    expect(actions.addEmail("dummy@example.com")).toEqual(expectedAction);
  });

  it("Should accept tou", () => {
    const expectedAction = {
      type: actions.ACCEPT_TOU,
    };
    expect(actions.acceptTOU()).toEqual(expectedAction);
  });

  it("Should reject tou", () => {
    const expectedAction = {
      type: actions.REJECT_TOU,
    };
    expect(actions.rejectTOU()).toEqual(expectedAction);
  });
});

describe("Email reducer", () => {
  const mockState = {
    email: "",
    acceptingTOU: false,
    tou_accepted: false,
  };

  it("Receives add email action", () => {
    expect(
      emailReducer(mockState, {
        type: actions.ADD_EMAIL,
        payload: {
          email: "dummy@example.com",
        },
      })
    ).toEqual({
      email: "dummy@example.com",
      acceptingTOU: true,
      tou_accepted: false,
    });
  });

  it("Receives an accept tou action", () => {
    expect(
      emailReducer(mockState, {
        type: actions.ACCEPT_TOU,
      })
    ).toEqual({
      email: "",
      acceptingTOU: false,
      tou_accepted: true,
    });
  });

  it("Receives a reject tou action", () => {
    expect(
      emailReducer(mockState, {
        type: actions.REJECT_TOU,
      })
    ).toEqual({
      email: "",
      acceptingTOU: false,
      tou_accepted: false,
    });
  });
});

describe("Test email Container", () => {
  it("Clicks the email button", () => {
    const test_email = "dummy-99@example.com";
    const store = fakeStore();
    const wrapper = setupComponent({ component: <RegisterEmail />, store: store });
    const input = wrapper.find("input#email");
    expect(input).toBeDefined();
    expect(input.exists()).toEqual(true);

    const button = wrapper.find("EduIDButton#register-button");
    expect(button.exists()).toEqual(true);

    // enter an invalid email address, click the button and verify that no actions were dispatched
    input.simulate("change", { target: { name: "email", value: "invalid-99" } });
    button.first().simulate("click");
    expect(store.getActions()).toEqual([]);

    // enter the test email address into the input field, and then click the register-button
    input.simulate("change", { target: { name: "email", value: test_email } });

    button.first().simulate("click");

    const _actions = store.getActions();
    const actualActions = _actions.map((action) => action.type);

    const last_action = actualActions[actualActions.length - 1];
    expect(last_action).toEqual("ADD_EMAIL");

    expect(_actions[_actions.length - 1]).toEqual(actions.addEmail(test_email));
  });

  it("Clicks the accept tou button", () => {
    const store = fakeStore({
      overrides: { signup: { email: "dummy-98@example.com", tou_accepted: false, current_step: "register" } },
    });
    const wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <RegisterEmail />
        </MemoryRouter>
      ),
      store: store,
    });

    const button = wrapper.find("EduIDButton#register-modal-accept-button");
    button.first().simulate("click");

    const _actions = store.getActions();
    const actualActions = _actions.map((action) => action.type);
    expect(actualActions).toEqual(["ACCEPT_TOU", "notifications/clearNotifications", "IS_CAPTCHA_AVAILABLE"]);

    expect(_actions[0]).toEqual(actions.acceptTOU());
  });

  it("Clicks the reject tou button", () => {
    const store = fakeStore({
      overrides: { signup: { email: "dummy-98@example.com", tou_accepted: false, current_step: "register" } },
    });
    const wrapper = setupComponent({ component: <RegisterEmail />, store: store });

    const button = wrapper.find("EduIDButton#register-modal-close-button");
    button.first().simulate("click");

    const _actions = store.getActions();
    const actualActions = _actions.map((action) => action.type);
    expect(actualActions).toEqual(["REJECT_TOU"]);

    expect(_actions[_actions.length - 1]).toEqual(actions.rejectTOU());
  });
});
