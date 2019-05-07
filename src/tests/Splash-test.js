const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { mount } from "enzyme";
import expect from "expect";

import { setupComponent } from "tests/SignupMain-test";
import SplashContainer from "containers/Splash";

describe("Splash Component", () => {
  it("Renders", () => {
    const wrapper = setupComponent({
        component: <SplashContainer />,
        overrides: { config: { is_app_loaded: false } }
      }),
      splash = wrapper.find("div#eduid-splash-screen");

    expect(splash.length).toEqual(1);
  });

  it("Doesn't Render", () => {
    const wrapper = setupComponent({
        component: <SplashContainer />,
        overrides: { config: { is_app_loaded: true } }
      }),
      splash = wrapper.find("div#eduid-splash-screen");

    expect(splash.length).toEqual(0);
  });
});
