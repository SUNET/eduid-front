import { activeClassName } from "components/Common/HeaderNav";
import { IndexMain } from "components/IndexMain";
import { http, HttpResponse } from "msw";
import { act } from "react";
import { mswServer } from "setupTests";
import { defaultDashboardTestState, fireEvent, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

async function linkToAccountSettings() {
  // Navigate to Identity
  const nav = screen.getByRole("link", { name: "Account" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
}

beforeEach(() => {
  // mock globalThis.scroll for the notification middleware that scrolls to the top of the screen
  globalThis.scroll = jest.fn();
});

test("renders DeleteAccount as expected", async () => {
  render(<IndexMain />);

  await linkToAccountSettings();
  expect(screen.getAllByRole("heading")[7]).toHaveTextContent(/^Block and delete eduID/);
});

test("can delete eduid account", async () => {
  let terminateCalled = false;

  mswServer.use(
    http.post("https://dashboard.eduid.docker/services/security/terminate-account", () => {
      terminateCalled = true;
      return HttpResponse.json({ type: "test success", payload: { location: "dummy-next" } });
    }),
    http.get("https://dashboard.eduid.docker/services/security/credentials", () => {
      return HttpResponse.json({ type: "stub", payload: { credentials: "dummy-credentials" } });
    })
  );

  render(<IndexMain />, {
    state: {
      config: {
        ...defaultDashboardTestState.config,
        security_service_url: "https://dashboard.eduid.docker/services/security/",
      },
      personal_data: { ...defaultDashboardTestState.personal_data },
    },
  });

  await linkToAccountSettings();

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  const button = screen.getByRole("button", { name: /delete eduid/i });
  expect(button).toBeEnabled();

  // Click the 'delete eduid' button
  fireEvent.click(button);
  expect(screen.getByRole("heading", { name: /Are you sure/i })).toBeInTheDocument();

  const deleteButton = screen.getByRole("button", { name: /delete my eduid/i });
  expect(deleteButton).toBeEnabled();

  fireEvent.click(deleteButton);

  // wait for the modal to disappear
  await waitFor(() => {
    expect(screen.queryByRole("heading", { name: /Are you sure/i })).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(terminateCalled).toBe(true);
  });
});

test("render, enable navigation back to security settings", async () => {
  render(<IndexMain />);

  await linkToAccountSettings();
  const backToSecuritySettings = screen.getByLabelText(/To Security settings/i);
  expect(backToSecuritySettings).toBeInTheDocument();
  fireEvent.click(backToSecuritySettings);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Security/);
});
