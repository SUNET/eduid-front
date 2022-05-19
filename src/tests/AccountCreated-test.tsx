import AccountCreated from "components/AccountCreated";
import { shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import { setupComponent } from "./helperFunctions/SignupTestApp";

describe("Account Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <AccountCreated />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Component has text", () => {
    const fullWrapper = setupComponent({
      component: <AccountCreated />,
    });
    const p = fullWrapper.find("p");
    expect(p.exists()).toEqual(true);
  });
  it("Component renders user email (text includes '@')", () => {
    const fullWrapper = setupComponent({
      component: <AccountCreated />,
      overrides: { signup: { email: "dummy@example.com", tou_accepted: true, current_step: "register" } },
    });

    const userEmail = fullWrapper.find(".registered-email");
    expect(userEmail.exists()).toEqual(true);
    expect(userEmail.text()).toContain("@");
  });
});
