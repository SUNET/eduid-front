import React from "react";
import expect from "expect";

import AccountCreatedContainer from "containers/AccountCreated";
import { setupComponent } from "tests/SignupMain-test";

describe("Account Component", () => {
  it("Renders the account created component", () => {
    const wrapper = setupComponent({
        component: <AccountCreatedContainer />,
        overrides: { email: { email: "dummy@example.com" } }
      }),
      h2 = wrapper.find("h2"),
      h3 = wrapper.find("h3"),
      p = wrapper.find("p");

    expect(h2.length).toEqual(1);
    expect(h3.length).toEqual(1);
    expect(p.length).toEqual(1);
    expect(p.text()).toContain("dummy@example.com");
  });
});
