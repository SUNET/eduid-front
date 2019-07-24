import React from "react";
import expect from "expect";
import { shallow } from "../../node_modules/enzyme";
import { IntlProvider } from "react-intl";

import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";
import CodeVerifiedContainer from "containers/CodeVerified";
import * as actions from "actions/CodeVerified";
import verifiedReducer from "reducers/CodeVerified";

describe("CodeVerified Component", () => {
  const state = {
    verified: {
      dashboard_url: "http://dummy.example.com",
      password: "dummy-passwd",
      email: "dummy@example.com",
      status: "verified",
      gotten: false
    }
  };

  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <CodeVerifiedContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Component renders holder for user email and password", () => {
    const fullWrapper = setupComponent({
      component: <CodeVerifiedContainer />,
      overrides: state
    });

    const userDetailsDisplay = fullWrapper.find("#email-display");
    expect(userDetailsDisplay.exists()).toEqual(true);
  });
  it("Component renders user email (text inlcudes '@')", () => {
    const fullWrapper = setupComponent({
      component: <CodeVerifiedContainer />,
      overrides: state
    });

    const userEmailDisplay = fullWrapper.find("#email-display");
    expect(userEmailDisplay.exists()).toEqual(true);

    const userEmail = fullWrapper.find("#user-email");
    expect(userEmail.text()).toContain("@");
  });

  it("Component renders a user password", () => {
    const fullWrapper = setupComponent({
      component: <CodeVerifiedContainer />,
      overrides: state
    });
    const passwd = fullWrapper.find("#user-password");

    expect(passwd.length).toEqual(1);
    expect(passwd.text()).toContain("dummy-passwd");
  });

  it("Component renders 'go to my eduid' button", () => {
    const fullWrapper = setupComponent({
      component: <CodeVerifiedContainer />,
      overrides: state
    });
    const buttons = fullWrapper.find("EduIDButton");
    expect(buttons.length).toEqual(1);
  });

});

describe("CodeVerified Actions", () => {
  it("Should fail when trying to verify the code", () => {
    const err = new Error("CodeVerified error");
    const expectedAction = {
      type: actions.GET_SIGNUP_VERIFY_LINK_FAIL,
      error: true,
      payload: {
        error: err,
        message: err
      }
    };
    expect(actions.getCodeStatusFail(err)).toEqual(expectedAction);
  });
});

describe("Code verification reducer", () => {
  const mockState = {
    password: "",
    email: "",
    status: "",
    dashboard_url: ""
  };

  it("Receives a successful verification action", () => {
    expect(
      verifiedReducer(mockState, {
        type: actions.GET_SIGNUP_VERIFY_LINK_SUCCESS,
        payload: {
          status: "verified",
          password: "dummy password",
          email: "dummy@example.com",
          dashboard_url: "http://example.com"
        }
      })
    ).toEqual({
      password: "dummy password",
      email: "dummy@example.com",
      status: "verified",
      dashboard_url: "http://example.com"
    });
  });
});
