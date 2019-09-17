import React from "react";
import expect from "expect";
import { shallow } from "../../node_modules/enzyme";
import { IntlProvider } from "react-intl";
import CodeVerifiedContainer from "containers/CodeVerified";
import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";

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
