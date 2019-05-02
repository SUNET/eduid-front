import React from "react";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy } from "expect";
import EduIDButton from "components/EduIDButton";
import FetchingContext from "components/FetchingContext";
import ReactTestUtils from "react-dom/test-utils";

function setupComponent(spinning = false) {
  const compState = {
    fetching: spinning
  };

  const wrapper = mount(
    <FetchingContext.Provider value={compState}>
      <EduIDButton />
    </FetchingContext.Provider>
  );

  return wrapper;
}

describe("EduIDButton Component should mount", () => {
  it("Renders without spinner", () => {
    const wrapper = setupComponent(),
      button = wrapper.find("Button"),
      divEl = button.find("div.spin-holder"),
      icon = divEl.find("FontAwesomeIcon");

    expect(button.hasClass("has-spinner")).toBe(false);
    expect(divEl.length).toBe(0);
    expect(icon.length).toBe(0);
  });

  it("Renders with spinner", () => {
    const wrapper = setupComponent(true),
      button = wrapper.find("Button"),
      divEl = button.find("div.spin-holder"),
      icon = divEl.find("FontAwesomeIcon");

    expect(button.hasClass("has-spinner")).toBe(true);
    expect(divEl.hasClass("spin-holder")).toBe(true);
    expect(icon.length).toBe(1);
  });
});
