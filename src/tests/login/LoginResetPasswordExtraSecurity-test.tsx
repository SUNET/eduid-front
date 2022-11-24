import {
  NewPasswordRequest,
  NewPasswordResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "apis/eduidResetPassword";
import { LoginMain } from "login/components/LoginMain";
import { mswServer, rest } from "setupTests";
import { fireEvent, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

test("renders extra security screen as expected", async () => {
  const email = "test@example.org";
  const code = "0c860943-540f-4ce6-aebf-e874f4efd7c1";
  const password = "very-secret";
  mswServer.use(
    rest.post("/reset-password-url/verify-email", (req, res, ctx) => {
      const body = req.body as VerifyCodeRequest;
      if (body.email_code != code) {
        return res(ctx.status(400));
      }
      const payload: VerifyCodeResponse = {
        suggested_password: password,
        email_code: code,
        email_address: email,
        extra_security: {
          external_mfa: true,
          phone_numbers: [{ number: "07012312344", index: 0 }],
          tokens: { webauthn_options: "dummy-webauthn-options" },
        },
        success: true,
        zxcvbn_terms: [],
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    }),
    rest.post("/reset-password-url/new-password-extra-security-token", (req, res, ctx) => {
      const body = req.body as NewPasswordRequest;
      if (body.email_code != code || body.password != password) {
        return res(ctx.status(400));
      }
      const payload: NewPasswordResponse = {};
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  mswServer.printHandlers();

  render(<LoginMain />, { routes: [`/reset-password/email-code/${code}`] });

  // Wait for the extra security screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("heading", { name: /^select an extra security option/i })).toBeInTheDocument();
  });

  const securityKeyButton = screen.getByRole("button", { name: /^use security key/i });
  expect(securityKeyButton).toBeEnabled();

  const phoneCodeButton = screen.getByRole("button", { name: /Send sms to .*/i });
  expect(phoneCodeButton).toBeEnabled();

  const frejaeIDButton = screen.getByRole("button", { name: /^use my Freja eID/i });
  expect(frejaeIDButton).toBeEnabled();

  fireEvent.click(securityKeyButton);

  // Wait for the selected security key screen to be displayed
  await waitFor(() => {
    expect(screen.getByText(/Use your security key .*has a button, tap it./i)).toBeInTheDocument();
    expect(phoneCodeButton).not.toBeInTheDocument();
    expect(frejaeIDButton).not.toBeInTheDocument();
  });
});
