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

// describe("Async actions for captcha", () => {
//   it("Tests the send captcha saga", () => {
//     const state = signupTestState;
//     //state.captcha.captcha_verification = "dummy response";
//     state.config.csrf_token = "dummy-token";
//     state.signup.email = "dummy@example.com";
//     state.signup.tou_accepted = true;

//     const generator = sendCaptcha();
//     let next = generator.next();

//     const data = {
//       csrf_token: state.config.csrf_token,
//       email: state.signup.email,
//       //recaptcha_response: state.captcha.captcha_verification,
//       tou_accepted: state.signup.tou_accepted,
//     };
//     const resp = generator.next(state);
//     expect(resp.value).toEqual(call(requestSendCaptcha, data));

//     const action = {
//       type: "FIXME",
//       payload: {
//         csrf_token: "csrf-token",
//       },
//     };

//     // csrf token is removed from action when the real code runs, so we need to save it first
//     const _putNewCsrfToken = put(newCsrfToken(action.payload.csrf_token));
//     next = generator.next(action);
//     expect(next.value).toEqual(_putNewCsrfToken);
//     next = generator.next();

//     expect(next.value).toEqual(put(action));

//     expect(generator.next().done).toEqual(true);
//   });
// });
