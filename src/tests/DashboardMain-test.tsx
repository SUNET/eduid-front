import { DashboardMain } from "components/DashboardMain";
import { activeClassName } from "components/HeaderNav";
import { initialState as configInitialState } from "reducers/DashboardConfig";
import { defaultDashboardTestState, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("shows splash screen when not configured", () => {
  render(<DashboardMain />, {
    state: { config: { ...configInitialState, is_app_loaded: false } },
    routes: ["/profile/"],
  });

  expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/Welcome, !/);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders Profile page as expected", () => {
  render(<DashboardMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      config: { ...defaultDashboardTestState.config, login_base_url: "https://example.com/login" },
    },
  });

  expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/Welcome, !/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  const button = screen.getByRole("button", { name: "Log out" });
  expect(button).toBeEnabled();

  // check that Profile is the active nav link
  const nav = screen.getAllByRole("link", { name: "Start" })[0];
  expect(nav).toHaveClass(activeClassName);

  // check that another nav link is _not_ active
  const nav2 = screen.getByRole("link", { name: "Identity" });
  expect(nav2).not.toHaveClass(activeClassName);
});
