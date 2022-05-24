import AccountCreatedContainer from "containers/AccountCreated";
import { shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import { setupComponent } from "./helperFunctions/SignupTestApp";

describe("Account Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <AccountCreatedContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Component has text", () => {
    const fullWrapper = setupComponent({
      component: <AccountCreatedContainer />,
    });
    const p = fullWrapper.find("p");
    expect(p.exists()).toEqual(true);
  });
  it("Component renders user email (text includes '@')", () => {
    const fullWrapper = setupComponent({
      component: <AccountCreatedContainer />,
      overrides: { email: { email: "dummy@example.com" } },
    });

    const userEmail = fullWrapper.find(".registered-email");
    expect(userEmail.exists()).toEqual(true);
    expect(userEmail.text()).toContain("@");
  });
});
