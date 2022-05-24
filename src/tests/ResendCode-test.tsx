import * as actions from "actions/ResendCode";
import { newCsrfToken } from "actions/SignupMain";
import EmailInUseContainer from "containers/EmailInUse";
import ResendCodeContainer from "containers/ResendCode";
import { shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import { call, put } from "redux-saga/effects";
import { requestResendCode, resendCode } from "sagas/ResendCode";
import { fakeStore, setupComponent, signupTestState } from "./helperFunctions/SignupTestApp";

describe("ResendCode Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <ResendCodeContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Component has text", () => {
    const fullWrapper = setupComponent({
      component: <EmailInUseContainer />,
    });
    const p = fullWrapper.find("p");
    expect(p.exists()).toEqual(true);
  });
  it("Component renders user email (text includes '@')", () => {
    const fullWrapper = setupComponent({
      component: <ResendCodeContainer />,
      overrides: { email: { email: "dummy@example.com" } },
    });

    const userEmail = fullWrapper.find(".registered-email");
    expect(userEmail.exists()).toEqual(true);
    expect(userEmail.text()).toContain("@");
  });

  it("Component renders the SEND A NEW LINK button", () => {
    const fullWrapper = setupComponent({
      component: <ResendCodeContainer />,
    });
    const button = fullWrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
    // expect(button.text()).toContain("reset your password");
  });
});

describe("Resend code Actions", () => {
  it("Should trigger resending a verification code ", () => {
    const expectedAction = {
      type: actions.POST_SIGNUP_RESEND_VERIFICATION,
    };
    expect(actions.postResendCode()).toEqual(expectedAction);
  });

  it("Should fail when trying to trigger resending a verification code", () => {
    const err = new Error("Resending error");
    const expectedAction = {
      type: actions.POST_SIGNUP_RESEND_VERIFICATION_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.postResendCodeFail(err)).toEqual(expectedAction);
  });
});

describe("Test Resend code Container", () => {
  it("Clicks resend code button", () => {
    const store = fakeStore();

    const wrapper = setupComponent({
      component: <ResendCodeContainer />,
      store: store,
    });
    const button = wrapper.find("EduIDButton#resend-button");
    expect(button.exists()).toEqual(true);

    button.first().simulate("click");

    const actualActions = store.getActions().map((action) => action.type);
    expect(actualActions).toEqual([actions.POST_SIGNUP_RESEND_VERIFICATION]);
  });
});

describe("Resend code async actions", () => {
  it("Tests the request config saga", () => {
    const state = signupTestState;
    state.email.email = "dummy@example.com";
    state.config.csrf_token = "dummy-token-1";

    const generator = resendCode();
    let next = generator.next();

    const data = {
      email: state.email.email,
      csrf_token: state.config.csrf_token,
    };
    const resp = generator.next(state);
    expect(resp.value).toEqual(call(requestResendCode, data));

    const action = {
      type: actions.POST_SIGNUP_RESEND_VERIFICATION_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };
    // csrf token is removed from action when the real code runs, so we need to save it first
    const _putNewCsrfToken = put(newCsrfToken(action.payload.csrf_token));
    next = generator.next(action);
    expect(next.value).toEqual(_putNewCsrfToken);
    next = generator.next();

    expect(next.value).toEqual(put(action));

    expect(generator.next().done).toEqual(true);
  });
});
