import React from "react";
import expect from "expect";
import { put, call } from "redux-saga/effects";
import { shallow } from "enzyme";
import { IntlProvider } from "react-intl";
import { fakeStore, setupComponent, signupTestState } from "./helperFunctions/SignupTestApp";
import Captcha from "components/Captcha";
import * as actions from "actions/Captcha";
import { captchaSlice } from "reducers/Captcha";
import { sendCaptcha, requestSendCaptcha } from "sagas/Captcha";
import { newCsrfToken } from "actions/DashboardConfig";
import fetchMock from "jest-fetch-mock";

describe("Captcha Component", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <Captcha />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("The captcha <div> element renders", () => {
    fetchMock.doMockOnceIf("https://www.google.com/recaptcha/api.js", "dummy-script");
    const fullWrapper = setupComponent({
      component: <Captcha />,
    });
    const captcha = fullWrapper.find("#captcha");
    expect(captcha.exists()).toEqual(true);
  });

  it("Renders the OK and CANCEL buttons", () => {
    fetchMock.doMockOnceIf("https://www.google.com/recaptcha/api.js", "dummy-script");
    const fullWrapper = setupComponent({
      component: <Captcha />,
    });
    const button = fullWrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(2);
  });
});

describe("Captcha Actions", () => {
  it("Should trigger the captcha verification ", () => {
    const expectedAction = {
      type: actions.CAPTCHA_VERIFICATION,
      payload: {
        response: "dummy response",
      },
    };
    expect(actions.verifyCaptcha("dummy response")).toEqual(expectedAction);
  });

  it("Should fail when trying to post the captcha", () => {
    const err = "Captcha error";
    const expectedAction = {
      type: actions.POST_SIGNUP_TRYCAPTCHA_FAIL,
      error: true,
      payload: {
        message: err,
        disabledButton: false,
      },
    };
    expect(actions.postCaptchaFail(err)).toEqual(expectedAction);
  });

  it("Should post the captcha", () => {
    const expectedAction = {
      type: actions.POST_SIGNUP_TRYCAPTCHA,
      payload: {
        disabledButton: true,
      },
    };
    expect(actions.postCaptcha()).toEqual(expectedAction);
  });
});

describe("Captcha reducer", () => {
  const mockState = {
    captcha_verification: "",
    disabledButton: false,
  };

  it("Receives a captcha verification action", () => {
    expect(
      captchaSlice.reducer(mockState, {
        type: actions.CAPTCHA_VERIFICATION,
        payload: {
          response: "dummy verification",
        },
      })
    ).toEqual({
      captcha_verification: "dummy verification",
      disabledButton: false,
    });
  });
});

describe("Test captcha Container", () => {
  it("Clicks the send captcha button", () => {
    const store = fakeStore();

    const wrapper = setupComponent({ component: <Captcha />, store });

    const button = wrapper.find("EduIDButton#send-captcha-button");
    expect(button.exists()).toEqual(true);

    button.first().simulate("click");

    const actualActions = store.getActions().map((action) => action.type);
    expect(actualActions).toEqual([actions.POST_SIGNUP_TRYCAPTCHA]);
  });
});

describe("Async actions for captcha", () => {
  it("Tests the send captcha saga", () => {
    const state = signupTestState;
    //state.captcha.captcha_verification = "dummy response";
    state.config.csrf_token = "dummy-token";
    state.signup.email = "dummy@example.com";
    state.signup.tou_accepted = true;

    const generator = sendCaptcha();
    let next = generator.next();

    const data = {
      csrf_token: state.config.csrf_token,
      email: state.signup.email,
      //recaptcha_response: state.captcha.captcha_verification,
      tou_accepted: state.signup.tou_accepted,
    };
    const resp = generator.next(state);
    expect(resp.value).toEqual(call(requestSendCaptcha, data));

    const action = {
      type: actions.POST_SIGNUP_TRYCAPTCHA_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };

    // csrf token is removed from action when the real code runs, so we need to save it first
    const _putNewCsrfToken = put(newCsrfToken(action.payload.csrf_token));
    next = generator.next(action);
    expect(next.value).toEqual(_putNewCsrfToken);
    next = generator.next();

    expect(next.value).toEqual(put(action));

    expect(generator.next().done).toEqual(true);
  });
});
