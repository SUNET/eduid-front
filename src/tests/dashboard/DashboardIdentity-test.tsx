import { DashboardMain } from "components/DashboardMain";
import { render, screen } from "../helperFunctions/DashboardTestApp-rtl";

test("shows identity tab", () => {
  render(<DashboardMain />, { routes: ["/profile/verify-identity/"] });

  expect(screen.getByRole("heading", { name: "Swedish personal ID number" })).toBeEnabled();
});
