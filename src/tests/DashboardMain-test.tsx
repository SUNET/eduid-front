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
  expect(screen.getAllByRole("progressbar")[0]).toBeInTheDocument();
  expect(screen.getAllByRole("progressbar")[0]).toHaveClass("spinner");
});

test("renders Profile page as expected", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      config: { ...defaultDashboardTestState.config, login_service_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          chosen_given_name: "test",
          surname: "user",
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

test("renders eduID status overview, confirmed account", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      emails: {
        emails: [{ email: "test@test.se", primary: true, verified: true }],
      },
      config: { ...defaultDashboardTestState.config, login_service_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          chosen_given_name: "test user",
          identities: {
            is_verified: false,
            nin: { number: "199008199391", verified: false },
          },
        },

        ...defaultDashboardTestState.personal_data,
      },
    },
  });

  expect(screen.getAllByRole("heading")[6]).toHaveTextContent(/Verify your Security key/);
});

test("renders verified identity user", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      emails: {
        emails: [{ email: "test@test.se", primary: true, verified: true }],
      },
      config: { ...defaultDashboardTestState.config, login_service_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          chosen_given_name: "test user",
          identities: {
            is_verified: true,
          },
        },
      },
    },
  });

  expect(screen.getAllByRole("heading")[4]).toHaveTextContent(/Verified Identity/);
});

test("renders identity verification progress, verified user", () => {
  render(<IndexMain />, {
    routes: ["/profile/"],
    state: {
      ...defaultDashboardTestState,
      emails: {
        emails: [{ email: "test@test.se", primary: true, verified: true }],
      },
      config: { ...defaultDashboardTestState.config, login_service_url: "https://example.com/login" },
      personal_data: {
        response: {
          eppn: "hubba-bubba",
          chosen_given_name: "test user",
          identities: {
            is_verified: false,
          },
        },
      },
    },
  });

  expect(screen.getAllByRole("heading")[4]).toHaveTextContent(/Verify Your Identity/);
});
