import React from "react";
import expect from "expect";
import { shallow } from "../../node_modules/enzyme";
import { IntlProvider } from "react-intl";
import Footer from "../login/components/Footer/Footer";
import { setupComponent } from "tests/SignupMain-test";

const config = {
  is_app_loaded: true,
  is_configured: true,
  available_languages: [
    ["en", "English"],
    ["sv", "Svenska"],
  ],
  dashboard_url: "http://example.com",
  static_students_url: "http://example.com/student",
  static_technicians_url: "http://example.com",
  static_staff_url: "http://example.com",
  static_faq_url: "http://example.com",
};

const state = {
  config: config,
  intl: {
    locale: "en",
  },
};

describe("Footer Component", () => {
  it("Component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <Footer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Component renders copyright", () => {
    const wrapper = setupComponent({
      component: <Footer />,
    });
    const copyright = wrapper.find("#copyright");
    expect(copyright.exists()).toEqual(true);
    expect(copyright.text().includes("SUNET")).toEqual(true);
  });

  it("Renders the language selector component", () => {
    const wrapper = setupComponent({
        component: <Footer />,
        overrides: state,
      }),
      p = wrapper.find("p.lang-selected"),
      link = wrapper.find("p.lang-selected").find("a");

    expect(p.length).toEqual(1);
    expect(link.length).toEqual(1);
    // Rendering link text is empty on initial rendering, because let language = "";
    expect(link.text()).toEqual("");
  });
});
