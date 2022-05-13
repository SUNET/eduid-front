import React from "react";
import expect from "expect";
import { setupComponent } from "./helperFunctions/SignupTestApp";
import Splash from "components/Splash";

describe("Splash Component", () => {
  it("Shows", () => {
    const wrapper = setupComponent({
      component: <Splash showChildren={true} />,
      store: undefined,
      overrides: {},
    });
    // splash-and-children should be there
    const splash = wrapper.find("div#eduid-splash-and-children");
    expect(splash.length).toEqual(1);
    // the spinner should not be there when showChildren is true
    const spinner = wrapper.find("span#eduid-splash-spinner");
    expect(spinner.length).toEqual(0);
  });

  it("Doesn't show", () => {
    const wrapper = setupComponent({
      component: <Splash showChildren={false} />,
      store: undefined,
      overrides: {},
    });
    // splash-and-children should be there
    const splash = wrapper.find("div#eduid-splash-and-children");
    expect(splash.length).toEqual(1);
    // the spinner should be there when showChildren is false
    const spinner = wrapper.find("span#eduid-splash-spinner");
    expect(spinner.length).toEqual(1);
  });
});
