import {
  NewPasswordRequest,
  NewPasswordResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "apis/eduidResetPassword";
import { IndexMain } from "components/IndexMain";
import { mswServer, rest } from "setupTests";
import { fireEvent, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

test("can follow the link sent in an email", async () => {
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
        extra_security: {},
        success: true,
        zxcvbn_terms: [],
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    }),
    rest.post("/reset-password-url/new-password", (req, res, ctx) => {
      const body = req.body as NewPasswordRequest;
      if (body.email_code != code || body.password != password) {
        return res(ctx.status(400));
      }
      const payload: NewPasswordResponse = {};
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  mswServer.printHandlers();

  render(<IndexMain />, { routes: [`/reset-password/email-code/${code}`] });

  // Wait for the new password screen to be displayed
  await waitFor(() => {
    expect(screen.getByRole("textbox", { name: "New password" })).toBeInTheDocument();
  });

  // verify accept button is initially disabled
  const acceptButton = screen.getByRole("button", { name: /^accept/i });
  expect(acceptButton).toBeDisabled();

  const repeatInput = screen.getByRole("textbox", { name: /Repeat new password/i });
  expect(repeatInput).toHaveFocus();
  expect(repeatInput).toHaveProperty("placeholder", "xxxx xxxx xxxx");
  fireEvent.change(repeatInput, { target: { value: "not the right password" } });

  // verify accept button is still disabled (because of non-matching passwords)
  expect(acceptButton).toBeDisabled();

  // enter the right password
  fireEvent.change(repeatInput, { target: { value: password } });

  // verify accept button is now enabled
  expect(acceptButton).toBeEnabled();

  fireEvent.click(acceptButton);

  // Verify the request to change password was accepted by the msw endpoint in this test
  await waitFor(() => {
    expect(screen.getByText(/Password .*updated/i)).toBeInTheDocument();
  });
});
