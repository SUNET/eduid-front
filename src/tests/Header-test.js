import React from "react";
import expect from "expect";
import { shallow } from "../../node_modules/enzyme";
import { IntlProvider } from "react-intl";
// import HeaderAnonContainer from "containers/HeaderAnon";
import HeaderContainer from "containers/Header";
import { setupComponent } from "tests/SignupMain-test";

describe("Header Component", () => {
  it("Component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <HeaderContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
  it("Component renders the eduID logo", () => {
    const wrapper = setupComponent({
      component: <HeaderContainer />
    });
    const logo = wrapper.find("#eduid-logo");

    expect(logo.length).toEqual(1);
  });

});


