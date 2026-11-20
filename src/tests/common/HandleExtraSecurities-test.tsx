import userEvent from "@testing-library/user-event";
import { HandleExtraSecurities } from "components/ResetPassword/HandleExtraSecurities";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { initialState as configInitialState } from "slices/IndexConfig";
import { initialState as resetPasswordInitialState } from "slices/ResetPassword";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

const OIDCEID_URL = "https://oidceid.eduid.docker/services/oidceid";

test("selecting SverigeID in reset-password posts mfa-authenticate with resetpwMfaAuthn and the email code", async () => {
  globalThis.history.pushState({}, "", "/reset-password/extra-security");
  let body: Record<string, unknown> | undefined;
  mswServer.use(
    http.post(`${OIDCEID_URL}/mfa-authenticate`, async ({ request }) => {
      body = (await request.json()) as Record<string, unknown>;
      return HttpResponse.json({ type: "test response", payload: {} });
    }),
  );
  render(<HandleExtraSecurities />, {
    state: {
      ...loginTestState,
      config: { ...configInitialState, oidceid_service_url: OIDCEID_URL },
      resetPassword: {
        ...resetPasswordInitialState,
        email_code: "email-code-123",
        extra_security: { swedish_eid: true },
      },
    },
  });
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByText("SverigeID"));
  await waitFor(() => expect(body).toBeDefined());
  expect(body).toEqual({
    method: "sverigeid",
    frontend_action: "resetpwMfaAuthn",
    frontend_state: "email-code-123",
  });
  globalThis.history.pushState({}, "", "/");
});
