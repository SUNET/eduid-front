import React from "react";
import { PayloadAction } from "@reduxjs/toolkit";
import { VerifyLinkResponseSuccess } from "apis/eduidSignup";
import SignupMain, { SIGNUP_BASE_PATH } from "components/SignupMain";
import { mswServer, rest } from "setupTests";
import { render, screen, signupTestHistory, waitFor } from "../helperFunctions/SignupTestApp-rtl";

// importing from globals doesn't work here (becomes undefined)
const SIGNUP_SERVICE_URL = "/services/signup";

test("shows new user data", async () => {
  const fakeResponse: PayloadAction<VerifyLinkResponseSuccess> = {
    type: "testing",
    payload: {
      status: "verified",
      password: "very-secret",
      dashboard_url: "https://dashboard.example.org/",
      email: "test@example.org",
    },
  };

  mswServer.use(
    rest.get(`${SIGNUP_SERVICE_URL}/verify-link/123abc`, (req, res, ctx) => {
      return res(ctx.json(fakeResponse));
    })
  );

  mswServer.printHandlers();

  signupTestHistory.push(`${SIGNUP_BASE_PATH}/code/123abc`);
  render(<SignupMain />);

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^You have completed/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  screen.getByRole("FOO");
});
