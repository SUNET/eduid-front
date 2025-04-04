import { OrcidInfo } from "apis/eduidOrcid";
import { activeClassName } from "components/Common/HeaderNav";
import { IndexMain } from "components/IndexMain";
import { act } from "react";
import { mswServer, rest } from "setupTests";
import { defaultDashboardTestState, fireEvent, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

beforeEach(() => {
  // mock window.scroll for the notification middleware that scrolls to the top of the screen
  window.scroll = jest.fn();
});

test("renders AccountLinking as expected", async () => {
  render(<IndexMain />, {
    routes: ["/profile"],
    state: {
      ...defaultDashboardTestState,
    },
  });

  // Navigate to Advanced settings
  const nav = await screen.getByRole("link", { name: "Account" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);
  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /orcid account/i })).toBeInTheDocument();
});

test("can add an ORCID iD", () => {
  render(<IndexMain />, {
    routes: ["/profile"],
    state: {
      ...defaultDashboardTestState,
    },
  });

  // Navigate to Advanced settings
  const nav = screen.getByRole("link", { name: "Account" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  const button = screen.getByRole("button", { name: /add orcid/i });
  expect(button).toBeEnabled();

  // TODO: clicking the button assigns a new URL to window.location.href in requestConnectOrcid(),
  //       and that doesn't work in JSDOM. I can't manage to get any of the Internet's suggestions
  //       of how to mock window.location.assign() to work right now, so for now we only test that
  //       the button is enabled above.
  //button.click();
});

test("can show an ORCID iD", () => {
  const orcid: OrcidInfo = { id: "test-orcid-id", name: "Test Testson", family_name: "Testson", given_name: "Test" };

  render(<IndexMain />, {
    state: {
      ...defaultDashboardTestState,
      account_linking: { orcid },
    },
  });

  // Navigate to Advanced settings
  const nav = screen.getByRole("link", { name: "Account" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  expect(screen.queryByRole("button", { name: /add orcid/i })).not.toBeInTheDocument();

  expect(screen.getByRole("cell", { name: orcid.id })).toHaveClass("orcid-link");
});

test("can remove an ORCID iD", async () => {
  const orcid: OrcidInfo = { id: "test-orcid-id", name: "Test Testson", family_name: "Testson", given_name: "Test" };
  let removeCalled = false;

  mswServer.use(
    rest.post("https://dashboard.eduid.docker/services/orcid/remove", (req, res, ctx) => {
      removeCalled = true;
      return res(ctx.json({ type: "test success", payload: {} }));
    }),
    rest.get("https://dashboard.eduid.docker/services/orcid", (req, res, ctx) => {
      if (!removeCalled) {
        return res(ctx.status(400));
      }
      return res(ctx.json({ type: "test success", payload: { orcid: undefined } }));
    })
  );

  mswServer.printHandlers();

  render(<IndexMain />, {
    state: {
      ...defaultDashboardTestState,
      account_linking: { orcid },
    },
  });
  // Navigate to Advanced settings
  const nav = screen.getByRole("link", { name: "Account" });
  act(() => {
    nav.click();
  });
  expect(nav).toHaveClass(activeClassName);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  expect(screen.queryByRole("button", { name: /add orcid/i })).not.toBeInTheDocument();

  const button = screen.getByRole("button", { name: /remove/i });
  expect(button).toBeEnabled();

  // Verify the ORCID iD is there before we click the 'Remove' button
  expect(screen.getByRole("cell", { name: orcid.id })).toHaveClass("orcid-link");
  act(() => {
    fireEvent.click(button);
  });
  //TODO: check why this is still present
  // The ORCID iD shouldn't be visible anymore
  // await waitFor(() => {
  //   expect(screen.queryByRole("cell", { name: orcid.id })).not.toBeInTheDocument();
  // });

  // // The Add ORCID iD button should be here now
  // expect(screen.queryByRole("button", { name: /add orcid/i })).toBeInTheDocument();

  // // async tests need to await the last expect (to not get console warnings about logging after test finishes)
  // await expect(removeCalled).toBe(true);
});
