import { DashboardMain } from "components/DashboardMain";
import { activeClassName, dashboardHeading } from "components/DashboardNav";
import React from "react";
import { initialState as configInitialState } from "reducers/DashboardConfig";
import { dashboardTestHistory, render, screen } from "../helperFunctions/DashboardTestApp-rtl";

test("shows identity tab", () => {
  dashboardTestHistory.push("/profile/verify-identity");
  render(<DashboardMain />);

  expect(screen.getByRole("heading", { name: "Swedish personal ID number" })).toBeEnabled();
});
