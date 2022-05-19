import EmailInUseContainer from "containers/EmailInUse";
import { shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import { setupComponent } from "./helperFunctions/SignupTestApp";

describe("EmailInUse Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <EmailInUseContainer />
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
      component: <EmailInUseContainer />,
      overrides: { signup: { email: "dummy@example.com", tou_accepted: false, current_step: "address-used" } },
    });

    const userEmail = fullWrapper.find(".register-header");
    expect(userEmail.exists()).toEqual(true);
    expect(userEmail.text()).toContain("@");
  });

  it("Component renders the RESET PASSWORD button", () => {
    const fullWrapper = setupComponent({
      component: <EmailInUseContainer />,
    });
    const button = fullWrapper.find("EduIDButton#reset-password");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });

  it("Component renders a RESET PASSWORD button with a reroute", () => {
    const url = "http://login.example.com/reset-password-unique-link-for-this-test";

    const fullWrapper = setupComponent({
      component: <EmailInUseContainer />,
      overrides: {
        config: {
          reset_password_link: url,
        },
      },
    });
    const link = fullWrapper.find("a");
    expect(link.props().href).toEqual(url);
  });
});
