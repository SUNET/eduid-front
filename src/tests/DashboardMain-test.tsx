import { activeClassName } from "components/Common/HeaderNav";
import { IndexMain } from "components/IndexMain";
import { initialState as configInitialState } from "slices/IndexConfig";
import { defaultDashboardTestState, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("shows splash screen when not configured", () => {
  render(<IndexMain />, {
    state: { config: { ...configInitialState, is_app_loaded: false } },
    routes: ["/profile/"],
  });

  expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/Welcome, !/);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders Profile page as expected", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      config: { ...defaultDashboardTestState.config, login_base_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          display_name: "test user",
        },
        ...defaultDashboardTestState.personal_data,
      },
    },
  });

  expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/Welcome, test user!/);
  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  // check that Profile is the active nav link
  const nav = screen.getAllByRole("link", { name: "Start" })[0];
  expect(nav).toHaveClass(activeClassName);

  // check that another nav link is _not_ active
  const nav2 = screen.getByRole("link", { name: "Identity" });
  expect(nav2).not.toHaveClass(activeClassName);
});

test("renders identity verification progress, unverified after password reset", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      config: { ...defaultDashboardTestState.config, login_base_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          display_name: "test user",
        },
        ...defaultDashboardTestState.personal_data,
      },
      identities: {
        is_verified: false,
        nin: { number: "199008199391", verified: false },
      },
    },
  });

  expect(screen.getAllByRole("heading")[2]).toHaveTextContent(/no longer verified after password reset./);
});

test("renders identity verification progress, new user", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      config: { ...defaultDashboardTestState.config, login_base_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          display_name: "test user",
        },
      },
      identities: {
        is_verified: false,
      },
    },
  });

  expect(screen.getAllByRole("heading")[2]).toHaveTextContent(/Your identity is not verified./);
});

test("renders identity verification progress, verified user", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      config: { ...defaultDashboardTestState.config, login_base_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          display_name: "test user",
        },
      },
      identities: {
        is_verified: true,
      },
    },
  });

  expect(screen.getAllByRole("heading")[2]).toHaveTextContent(/Your identity is verified./);
});
