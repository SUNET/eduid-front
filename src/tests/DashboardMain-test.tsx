import { DashboardMain } from "components/DashboardMain";
import { activeClassName, dashboardHeading } from "components/DashboardNav";
import React from "react";
import { initialState as configInitialState } from "reducers/DashboardConfig";
import { dashboardTestHistory, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("shows splash screen when not configured", () => {
  dashboardTestHistory.push("/profile");
  render(<DashboardMain />, { state: { config: { ...configInitialState, is_app_loaded: false } } });

  expect(screen.getByRole("heading")).toHaveTextContent(dashboardHeading);

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders Profile page as expected", () => {
  dashboardTestHistory.push("/profile");
  render(<DashboardMain />, { state: { config: { ...configInitialState, is_app_loaded: true } } });

  expect(screen.getByRole("heading")).toHaveTextContent(dashboardHeading);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  const button = screen.getByRole("button", { name: "Log out" });
  expect(button).toBeEnabled();

  // check that Profile is the active nav link
  const nav = screen.getByRole("link", { name: "Profile" });
  expect(nav).toHaveClass(activeClassName);

  // check that another nav link is _not_ active
  const nav2 = screen.getByRole("link", { name: "Identity" });
  expect(nav2).not.toHaveClass(activeClassName);
});
