import React from "react";
import { LoginNextResponse } from "apis/eduidLogin";
import { initialState as initialAppState } from "login/components/App/App_reducer";
import { LoginMain } from "login/components/LoginMain";
import { initialState as configInitialState } from "reducers/LoginConfig";
import { loginTestHistory, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";
import { mswServer, rest } from "setupTests";

test("show splash screen when not configured", () => {
  loginTestHistory.push("/login/abc123");
  render(<LoginMain />);

  const button = screen.getByRole("button", { name: "Register" });
  expect(button).toBeEnabled();

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveClass("spinner");
});

test("renders FINISHED as expected", async () => {
  mswServer.use(
    rest.post("/next", (req, res, ctx) => {
      const payload: LoginNextResponse = {
        action: "FINISHED",
        target: "/foo",
        parameters: { SAMLResponse: "saml-response" },
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  loginTestHistory.push("/login/abc123");
  render(<LoginMain />, {
    state: {
      config: { ...configInitialState, base_url: "/" },
      app: { ...initialAppState, is_loaded: true },
    },
  });

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent(/^Logging you in/);

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});
