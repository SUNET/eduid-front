import { activeClassName } from "components/Common/HeaderNav";
import { IndexMain } from "components/IndexMain";
import { act } from "react-dom/test-utils";
import { render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("renders DeleteAccount as expected", () => {
  render(<IndexMain />);

  // Navigate to Settings
  const nav = screen.getByRole("link", { name: "Settings" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  // expect(screen.getByRole("heading", { name: /delete eduid/i })).toBeInTheDocument();
});

// test("can click the button", async () => {
//   let terminateCalled = false;

//   mswServer.use(
//     rest.post("/security/terminate-account", (req, res, ctx) => {
//       terminateCalled = true;
//       return res(ctx.json({ type: "test success", payload: {} }));
//     })
//   );

//   mswServer.printHandlers();
//   render(<IndexMain />, {
//     state: {
//       config: { ...defaultDashboardTestState.config, security_service_url: "/security/" },
//       personal_data: { ...defaultDashboardTestState.personal_data },
//     },
//   });

//   // Navigate to Settings
//   const nav = screen.getByRole("link", { name: "Settings" });
//   act(() => {
//     nav.click();
//   });
//   expect(nav).toHaveClass(activeClassName);

//   expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

//   const button = screen.getByRole("button", { name: /delete eduid/i });
//   expect(button).toBeEnabled();

//   // Click the 'delete eduid' button
//   act(() => {
//     button.click();
//   });

//   expect(screen.getByRole("heading", { name: /Are you sure/i })).toBeInTheDocument();

//   const deleteButton = screen.getByRole("button", { name: /delete my eduid/i });
//   expect(deleteButton).toBeEnabled();

//   // Click the button in the modal
//   act(() => {
//     deleteButton.click();
//   });

//   // wait for the modal to disappear
//   await waitFor(() => {
//     expect(screen.queryByRole("heading", { name: /Are you sure/i })).not.toBeInTheDocument();
//   });

//   await expect(terminateCalled).toBe(true);
// });
