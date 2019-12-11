import React from "react";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";

import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";
import ResendCodeContainer from "containers/ResendCode";
import * as actions from "actions/ResendCode";
import { resendCode, requestResendCode } from "sagas/ResendCode";

describe("ResendCode Component", () => {
  it("Renders the email in use component", () => {
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
        component: <EmailInUseContainer />
      });
      const p = fullWrapper.find("p");
      expect(p.exists()).toEqual(true);
    });
    it("Component renders user email (text inlcudes '@')", () => {
      const fullWrapper = setupComponent({
        component: <ResendCodeContainer />,
        overrides: { email: { email: "dummy@example.com" } }
      });

      const userEmail = fullWrapper.find(".registered-email");
      expect(userEmail.exists()).toEqual(true);
      expect(userEmail.text()).toContain("@");
    });

    it("Component renders the SEND A NEW LINK button", () => {
      const fullWrapper = setupComponent({
        component: <ResendCodeContainer />
      });
      const button = fullWrapper.find("EduIDButton");
      expect(button.exists()).toEqual(true);
      expect(button.length).toEqual(1);
      // expect(button.text()).toContain("reset your password");
    });
  });
});

describe("Resend code Actions", () => {
  it("Should trigger resending a verification code ", () => {
    const expectedAction = {
      type: actions.POST_SIGNUP_RESEND_VERIFICATION
    };
    expect(actions.postResendCode()).toEqual(expectedAction);
  });

  it("Should fail when trying to trigger resending a verification code", () => {
    const err = new Error("Resending error");
    const expectedAction = {
      type: actions.POST_SIGNUP_RESEND_VERIFICATION_FAIL,
      error: true,
      payload: {
        message: err
      }
    };
    expect(actions.postResendCodeFail(err)).toEqual(expectedAction);
  });
});

describe("Test Resend code Container", () => {
  let wrapper, dispatch;

  beforeEach(() => {
    const store = fakeStore(getState());
    dispatch = store.dispatch;
    wrapper = setupComponent({
      component: <ResendCodeContainer />,
      store: store
    });
  });

  it("Clicks resend code button", () => {
    const numCalls = dispatch.mock.calls.length;
    wrapper
      .find("EduIDButton#resend-button")
      .props()
      .onClick();
    expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  });
});

describe("Resend code async actions", () => {
  it("Tests the request config saga", () => {
    const state = getState({
      email: {
        email: "dummy@example.com"
      },
      config: {
        csrf_token: "dummy-token"
      }
    });
    const url = SIGNUP_SERVICE_URL + "resend-verification";
    const generator = resendCode();
    let next = generator.next();

    const data = {
      email: "dummy@example.com",
      csrf_token: "dummy-token"
    };
    const resp = generator.next(state);
    expect(resp.value).toEqual(call(requestResendCode, data));

    const action = {
      type: actions.POST_SIGNUP_RESEND_VERIFICATION_SUCCESS,
      payload: {
        csrf_token: "csrf-token"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});
