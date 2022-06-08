import SignupMain from "components/SignupMain";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { initialState as configInitialState } from "reducers/SignupConfig";
import { setupComponent } from "./helperFunctions/SignupTestApp";
import { render, screen, signupTestHistory } from "./helperFunctions/SignupTestApp-rtl";

describe("SignupMain Component", () => {
  it("Renders the splash screen before configuration", () => {
    const wrapper = setupComponent({
        component: <SignupMain />,
        overrides: { config: { ...configInitialState, is_configured: false } },
      }),
      splash = wrapper.find("div#eduid-splash-and-children"),
      router = wrapper.find("Router"),
      routes = wrapper.find("Route");

    expect(splash.length).toEqual(1);
    expect(router.length).toEqual(1);
    expect(routes.length).toEqual(3);
  });

  it("Doesn't render the splash screen after configuration", () => {
    const wrapper = setupComponent({
      component: <SignupMain />,
      overrides: { config: { ...configInitialState, is_configured: true } },
    });

    // splash-and-children should be there
    const splash = wrapper.find("div#eduid-splash-and-children");
    expect(splash.length).toEqual(1);
    // the spinner should not be there
    const spinner = wrapper.find("span#eduid-splash-spinner");
    expect(spinner.length).toEqual(0);
  });

  // it("Renders the email form", () => {
  //   const history = createMemoryHistory();
  //   history.push("/register/email");

  //   const wrapper = setupComponent({
  //     component: (
  //       <MemoryRouter initialEntries={[`${SIGNUP_BASE_PATH}/email`]}>
  //         <SignupMain />
  //       </MemoryRouter>
  //     ),
  //     overrides: { config: { ...configInitialState, is_configured: true } },
  //   });
  //   expect(wrapper.find("EmailForm").exists()).toEqual(true);
  // });
});

test("renders e-mail form as expected", () => {
  signupTestHistory.push("/register/email");
  render(<SignupMain />, { state: { config: { ...configInitialState, is_configured: true } } });
  expect(screen.getByRole("heading")).toHaveTextContent("foo");
});
