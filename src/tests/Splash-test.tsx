import React from "react";
import expect from "expect";

import { setupComponent } from "tests/SignupMain-test";
import Splash from "components/Splash";

describe("Splash Component", () => {
  it("Renders", () => {
    const wrapper = setupComponent({
        component: <Splash showChildren={false} />,
        store: undefined,
        overrides: { config: { is_app_loaded: false } },
      }),
      splash = wrapper.find("div#eduid-splash-screen");

    expect(splash.length).toEqual(1);
  });

  it("Doesn't Render", () => {
    const wrapper = setupComponent({
        component: <Splash showChildren={true} />,
        store: undefined,
        overrides: { config: { is_app_loaded: true } },
      }),
      splash = wrapper.find("div#eduid-splash-screen");

    expect(splash.length).toEqual(0);
  });
});
