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

  // it("Component renders the LOGOUT button", () => {
  //   const fullWrapper = setupComponent({
  //     component: <HeaderContainer />
  //   });
  //   const button = fullWrapper.find("#logout");
  //   expect(button.exists()).toEqual(true);
  //   expect(button.length).toEqual(1);
  //   // expect(button.text()).toContain("Logout");
  // });
});

// describe("HeaderAnon Component", () => {
//   it("Component does not render 'false' or 'null'", () => {
//     const wrapper = shallow(
//       <IntlProvider locale="en">
//         <HeaderAnonContainer />
//       </IntlProvider>
//     );
//     expect(wrapper.isEmptyRender()).toEqual(false);
//   });
//   it("Component renders the eduID logo", () => {
//     const wrapper = setupComponent({
//         component: <HeaderAnonContainer />
//       }),
//       logo = wrapper.find("#eduid-logo");
//     expect(logo.length).toEqual(1);
//   });

//   it("Component renders the LOGIN button", () => {
//     const fullWrapper = setupComponent({
//       component: <HeaderAnonContainer />
//     });
//     const button = fullWrapper.find("#login");
//     expect(button.exists()).toEqual(true);
//     expect(button.length).toEqual(1);
//     // expect(button.text()).toContain("Log in");
//   });
// });
