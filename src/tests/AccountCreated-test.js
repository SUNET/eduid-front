import React from "react";
import expect from "expect";
import { shallow } from "../../node_modules/enzyme";
import { IntlProvider } from "react-intl";
import AccountCreatedContainer from "containers/AccountCreated";
import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";

describe("Account Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <AccountCreatedContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Component conveys success", () => {
    const fullWrapper = setupComponent({
      component: <AccountCreatedContainer />
    });
    const p = fullWrapper.find("p");
    expect(p.text()).toContain("link sent");
  });
  it("Component renders user email (text inlcudes '@')", () => {
    const fullWrapper = setupComponent({
      component: <AccountCreatedContainer />,
      overrides: { email: { email: "dummy@example.com" } }
    });

    const userEmail = fullWrapper.find(".registered-email");
    expect(userEmail.exists()).toEqual(true);
    expect(userEmail.text()).toContain("@");
  });
});

// beforeEach(() => {
//   const store = fakeStore(getState());
//   dispatch = store.dispatch;
//   wrapper = setupComponent({ component: <CaptchaContainer />, store: store });
// });
