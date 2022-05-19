import { shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import Header from "../components/Header";
import { setupComponent } from "./helperFunctions/SignupTestApp";

describe("Header Component", () => {
  it("Component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <Header />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
  it("Component renders the eduID logo", () => {
    const wrapper = setupComponent({
      component: <Header />,
    });
    const logo = wrapper.find("#eduid-logo");

    expect(logo.length).toEqual(1);
  });
});
