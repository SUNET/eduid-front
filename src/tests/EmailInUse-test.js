import React from "react";
import expect from "expect";
import { shallow } from "enzyme";
import { IntlProvider } from "react-intl";
import EmailInUseContainer from "containers/EmailInUse";
import { setupComponent } from "tests/SignupMain-test";

describe("EmailInUse Component", () => {
  const state = {
    config: {
      reset_passwd_url: "http://dummy.example.com/reset-password"
    }
  };

  it("Renders the email in use component", () => {
    it("The component does not render 'false' or 'null'", () => {
      const wrapper = shallow(
        <IntlProvider locale="en">
          <EmailInUseContainer />
        </IntlProvider>
      );
      expect(wrapper.isEmptyRender()).toEqual(false);
    });

    it("Component conveys problem (email taken)", () => {
      const fullWrapper = setupComponent({
        component: <EmailInUseContainer />
      });
      const p = fullWrapper.find("p");
      expect(p.text()).toContain("already using");
    });
    it("Component renders user email (text inlcudes '@')", () => {
      const fullWrapper = setupComponent({
        component: <EmailInUseContainer />,
        overrides: { email: { email: "dummy@example.com" } }
      });

      const userEmail = fullWrapper.find(".register-header");
      expect(userEmail.exists()).toEqual(true);
      expect(userEmail.text()).toContain("@");
    });

    it("Component renders the RESET PASSWORD button", () => {
      const fullWrapper = setupComponent({
        component: <EmailInUseContainer />
      });
      const button = fullWrapper.find("EduIDButton");
      expect(button.exists()).toEqual(true);
      expect(button.length).toEqual(1);
      expect(button.text()).toContain("reset your password");
    });

    it("Component renders a RESET PASSWORD button with a reroute", () => {
      const fullWrapper = setupComponent({
        component: <EmailInUseContainer />,
        overrides: state
      });
      const link = fullWrapper.find("a");
      expect(link.props().href).toEqual(
        "http://dummy.example.com/reset-password"
      );
    });
  });
});
