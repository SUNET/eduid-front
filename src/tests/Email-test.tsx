import { PayloadAction } from "@reduxjs/toolkit";
import { TryCaptchaResponse } from "apis/eduidSignup";
import AccountCreated, { registeredEmailClass } from "components/AccountCreated";
import EmailInUse, { registerHeaderClass } from "components/EmailInUse";
import { shallow } from "enzyme";
import expect from "expect";
import RegisterEmail from "login/components/RegisterEmail/RegisterEmail";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";
import { initialState as signupInitialState, signupSlice } from "reducers/Signup";
import { setImmediate } from "timers";
import { fakeStore, realStore, setupComponent } from "./helperFunctions/SignupTestApp";

const runAllPromises = () => new Promise(setImmediate);

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

describe("Email reducer", () => {
  const mockState = signupInitialState;
  it("Receives add email action", () => {
    expect(signupSlice.reducer(mockState, signupSlice.actions.setEmail("dummy@example.com"))).toEqual({
      ...mockState,
      email: "dummy@example.com",
    });
  });

  it("Receives an accept tou action", () => {
    expect(
      signupSlice.reducer({ ...mockState, tou_accepted: false }, signupSlice.actions.setToUAccepted(true))
    ).toEqual({ ...mockState, tou_accepted: true });
  });
});

describe("Test RegisterEmail", () => {
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
    expect(last_action).toEqual("signup/setEmail");

    expect(_actions[_actions.length - 1]).toEqual(signupSlice.actions.setEmail(test_email));
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
    expect(actualActions).toEqual(["signup/setToUAccepted", "notifications/clearNotifications"]);

    expect(_actions[0]).toEqual(signupSlice.actions.setToUAccepted(true));
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
    expect(actualActions).toEqual(["signup/setEmail", "signup/setToUAccepted"]);

    expect(_actions[_actions.length - 1]).toEqual(signupSlice.actions.setToUAccepted(false));
  });

  it("Handles response 'new'", async () => {
    const email = "test@example.org";
    const fakeResponse: PayloadAction<TryCaptchaResponse> = {
      type: "signup/fetchTryCaptcha/fulfilled",
      payload: {
        next: "new",
      },
    };
    const store = realStore();

    store.dispatch(signupSlice.actions.setEmail(email));
    store.dispatch(fakeResponse);

    // let all the async calls in the component finish, and then update the wrapper
    await runAllPromises();

    const wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <RegisterEmail />
        </MemoryRouter>
      ),
      store,
    });

    // check that the expected component was rendered
    expect(wrapper.find(AccountCreated).exists()).toEqual(true);

    // check that the e-mail address we set above was used
    const userEmail = wrapper.find(`.${registeredEmailClass}`);
    expect(userEmail.exists()).toEqual(true);
    expect(userEmail.text()).toEqual(email);
  });

  it("Handles response 'already-used'", async () => {
    const email = "test@example.org";
    const fakeResponse: PayloadAction<TryCaptchaResponse> = {
      type: "signup/fetchTryCaptcha/fulfilled",
      payload: {
        next: "address-used",
      },
    };
    const store = realStore();

    store.dispatch(signupSlice.actions.setEmail(email));
    store.dispatch(fakeResponse);

    // let all the async calls in the component finish, and then update the wrapper
    await runAllPromises();

    const wrapper = setupComponent({
      component: (
        <MemoryRouter>
          <RegisterEmail />
        </MemoryRouter>
      ),
      store,
    });

    // check that the expected component was rendered
    expect(wrapper.find(EmailInUse).exists()).toEqual(true);

    // check that the e-mail address we set above was used
    const header = wrapper.find(`.${registerHeaderClass}`);
    expect(header.exists()).toEqual(true);
    expect(header.text()).toContain(email);
  });
});
