import React from "react";
import { PayloadAction } from "@reduxjs/toolkit";
import { SIGNUP_SERVICE_URL, VerifyLinkResponse } from "apis/eduidSignup";
import SignupMain, { SIGNUP_BASE_PATH } from "components/SignupMain";
import { mswServer, rest } from "setupTests";
import { render, screen, signupTestHistory, waitFor } from "../helperFunctions/SignupTestApp-rtl";

test("shows new user data", async () => {
  const email = "test@example.org";
  const password = "very-secret";
  const fakeResponse: PayloadAction<VerifyLinkResponse> = {
    type: "testing",
    payload: {
      status: "verified",
      password: password,
      dashboard_url: "https://dashboard.example.org/",
      email: email,
    },
  };

  mswServer.use(
    rest.get(`${SIGNUP_SERVICE_URL}/verify-link/123abc`, (req, res, ctx) => {
      return res(ctx.json(fakeResponse));
    })
  );

  signupTestHistory.push(`${SIGNUP_BASE_PATH}/code/123abc`);
  render(<SignupMain />);

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^You have completed/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  expect(screen.getByRole("status", { name: /mail/ })).toHaveTextContent(email);
  expect(screen.getByRole("status", { name: "Password" })).toHaveTextContent(password);
});

test("handles already-verified", async () => {
  const fakeResponse: PayloadAction<VerifyLinkResponse> = {
    type: "testing",
    payload: {
      status: "already-verified",
    },
  };

  mswServer.use(
    rest.get(`${SIGNUP_SERVICE_URL}/verify-link/123abc`, (req, res, ctx) => {
      return res(ctx.json(fakeResponse));
    })
  );

  signupTestHistory.push(`${SIGNUP_BASE_PATH}/code/123abc`);
  render(<SignupMain />);

  await waitFor(() => screen.getByRole("alert"));

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

  expect(screen.getByRole("alert")).toHaveTextContent(/already.*verified/);
});

test("handles unknown-code", async () => {
  const fakeResponse: PayloadAction<VerifyLinkResponse> = {
    type: "testing",
    payload: {
      status: "unknown-code",
    },
  };

  mswServer.use(
    rest.get(`${SIGNUP_SERVICE_URL}/verify-link/123abc`, (req, res, ctx) => {
      return res(ctx.json(fakeResponse));
    })
  );

  signupTestHistory.push(`${SIGNUP_BASE_PATH}/code/123abc`);
  render(<SignupMain />);

  await waitFor(() => screen.getByRole("alert", { name: "info notification" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/Unknown.*code/i);

  // we should be redirected to the main registration page on invalid codes
  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(/^Register your/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});
