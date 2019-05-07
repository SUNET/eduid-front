import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import Cookies from "js-cookie";

import CookieChecker from "components/CookieChecker";

function setupComponent(props = {}) {
  const comp = mount(
    <CookieChecker {...props}>
      <div id="test-cookie-checker">TEST</div>
    </CookieChecker>
  );
  return comp;
}

describe("Test CookieChecker Component", () => {
  it("Should not render: no cookie", () => {
    const comp = setupComponent({ cookieName: "test" }),
      test = comp.find("div#test-cookie-checker");

    expect(test.length).toEqual(0);
  });

  it("Should render: cookie present", () => {
    Cookies.set("test", "show");
    const comp = setupComponent({ cookieName: "test" }),
      test = comp.find("div#test-cookie-checker");

    expect(test.length).toEqual(1);
  });

  it("Should render: cookie present and matching pattern", () => {
    Cookies.set("test", "show");
    const comp = setupComponent({ cookieName: "test", cookiePattern: "show" }),
      test = comp.find("div#test-cookie-checker");

    expect(test.length).toEqual(1);
  });

  it("Should not render: no matching cookie name", () => {
    Cookies.set("test", "show");
    const comp = setupComponent({
        cookieName: "bad-name",
        cookiePattern: "show"
      }),
      test = comp.find("div#test-cookie-checker");

    expect(test.length).toEqual(0);
  });

  it("Should not render: not matching cookie value", () => {
    Cookies.set("test", "show");
    const comp = setupComponent({
        cookieName: "test",
        cookiePattern: "bad-pattern"
      }),
      test = comp.find("div#test-cookie-checker");

    expect(test.length).toEqual(0);
  });
});
