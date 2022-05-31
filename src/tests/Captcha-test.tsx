import Captcha from "components/Captcha";
import { shallow } from "enzyme";
import expect from "expect";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { IntlProvider } from "react-intl";
import { setupComponent } from "./helperFunctions/SignupTestApp";

function handleCaptchaCancel() {}
function handleCaptchaCompleted(response: string) {}

describe("Captcha Component", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("The captcha <div> element renders", () => {
    fetchMock.doMockOnceIf("https://www.google.com/recaptcha/api.js", "dummy-script");
    const fullWrapper = setupComponent({
      component: <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />,
    });
    const captcha = fullWrapper.find("#captcha");
    expect(captcha.exists()).toEqual(true);
  });

  it("Renders the CANCEL button", () => {
    fetchMock.doMockOnceIf("https://www.google.com/recaptcha/api.js", "dummy-script");
    const fullWrapper = setupComponent({
      component: <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />,
    });
    const button = fullWrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });
});
