import * as captchaActions from "actions/Captcha";
import * as verifiedActions from "actions/CodeVerified";
import * as resendActions from "actions/ResendCode";
import * as signupActions from "actions/SignupMain";
import SignupMain from "components/SignupMain";
import expect from "expect";
import React from "react";
import signupReducer from "reducers/SignupMain";
import { call, put } from "redux-saga/effects";
import { fetchCodeStatus, fetchConfig, requestCodeStatus, requestConfig } from "sagas/SignupMain";
import { SIGNUP_CONFIG_URL, SIGNUP_SERVICE_URL } from "../globals";
import { setupComponent, signupTestState } from "./helperFunctions/SignupTestApp";

describe("SignupMain Component", () => {
  it("Renders the splash screen", () => {
    const wrapper = setupComponent({
        component: <SignupMain />,
        overrides: { config: { is_app_loaded: false } },
      }),
      splash = wrapper.find("div#eduid-splash-and-children"),
      router = wrapper.find("Router"),
      routes = wrapper.find("Route");

    expect(splash.length).toEqual(1);
    expect(router.length).toEqual(1);
    expect(routes.length).toEqual(7);
  });

  it("Doesn't show the spinner", () => {
    const wrapper = setupComponent({ component: <SignupMain /> });

    // splash-and-children should be there
    const splash = wrapper.find("div#eduid-splash-and-children");
    expect(splash.length).toEqual(1);
    // the spinner should not be there
    const spinner = wrapper.find("span#eduid-splash-spinner");
    expect(spinner.length).toEqual(0);
  });

  it("Renders the email form", () => {
    const wrapper = setupComponent({ component: <SignupMain /> }),
      splash = wrapper.find("div#spinner"),
      router = wrapper.find("Router"),
      routes = wrapper.find("Route");

    expect(splash.length).toEqual(0);
    expect(router.length).toEqual(1);
    expect(routes.length).toEqual(7);
  });
});

describe("SignupMain Actions", () => {
  it("Should get code status ", () => {
    const expectedAction = {
      type: verifiedActions.GET_CODE_STATUS,
      payload: {
        code: "dummy code",
      },
    };
    expect(verifiedActions.getCodeStatus("dummy code")).toEqual(expectedAction);
  });

  it("Should fail when trying to get the code status", () => {
    const err = "Get code status error";
    const expectedAction = {
      type: verifiedActions.GET_SIGNUP_VERIFY_LINK_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(verifiedActions.getCodeStatusFail(err)).toEqual(expectedAction);
  });

  it("Should signal the app has loaded", () => {
    const expectedAction = {
      type: signupActions.APP_LOADED,
    };
    expect(signupActions.appLoaded()).toEqual(expectedAction);
  });

  //it("Should signal the app is fetching data", () => {
  //const expectedAction = {
  //type: signupActions.APP_FETCHING
  //};
  //expect(signupActions.appFetching()).toEqual(expectedAction);
  //});

  it("Should fail when trying to get the config", () => {
    const err = "Get config error";
    const expectedAction = {
      type: signupActions.GET_SIGNUP_CONFIG_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(signupActions.getSignupConfigFail(err)).toEqual(expectedAction);
  });

  it("Should store a new csrf token", () => {
    const expectedAction = {
      type: signupActions.NEW_CSRF_TOKEN,
      payload: {
        csrf_token: "dummy token",
      },
    };
    expect(signupActions.newCsrfToken("dummy token")).toEqual(expectedAction);
  });
});

describe("SignupMain reducer", () => {
  const mockState = { ...signupTestState.config, is_app_loaded: false };

  it("Receives app loaded action", () => {
    expect(
      signupReducer(mockState, {
        type: signupActions.APP_LOADED,
      })
    ).toEqual({
      ...mockState,
      is_app_loaded: true,
    });
  });

  it("Receives get code status action", () => {
    expect(
      signupReducer(mockState, {
        type: verifiedActions.GET_CODE_STATUS,
        payload: {
          code: "dummy code",
        },
      })
    ).toEqual({
      ...mockState,
      code: "dummy code",
      //is_fetching: true
    });
  });

  it("Receives get code status failed action", () => {
    const err = "failed";
    expect(
      signupReducer(mockState, {
        type: verifiedActions.GET_SIGNUP_VERIFY_LINK_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      ...mockState,
    });
  });

  it("Receives get config successful action", () => {
    expect(
      signupReducer(mockState, {
        type: signupActions.GET_SIGNUP_CONFIG_SUCCESS,
        payload: {
          csrf_token: "dummy token",
          recaptcha_public_key: "dummy public key",
          available_languages: [{ sv: "Svenska" }, { en: "English" }],
          debug: false,
          tou: "dummy tou",
          dashboard_url: "http://example.com",
          students_link: "http://example.com",
          technicians_link: "http://example.com",
          staff_link: "http://example.com",
          faq_link: "http://example.com",
        },
      })
    ).toEqual({
      ...mockState,
      csrf_token: "dummy token",
      recaptcha_public_key: "dummy public key",
      available_languages: [{ sv: "Svenska" }, { en: "English" }],
      debug: false,
      tou: "dummy tou",
      dashboard_url: "http://example.com",
      students_link: "http://example.com",
      technicians_link: "http://example.com",
      staff_link: "http://example.com",
      faq_link: "http://example.com",
    });
  });

  it("Receives get config failure action", () => {
    expect(
      signupReducer(mockState, {
        type: signupActions.NEW_CSRF_TOKEN,
        payload: {
          csrf_token: "dummy token",
        },
      })
    ).toEqual({
      ...mockState,
      csrf_token: "dummy token",
    });
  });

  //it("Receives post captcha action", () => {
  //expect(
  //signupReducer(mockState, {
  //type: captchaActions.POST_SIGNUP_TRYCAPTCHA
  //})
  //).toEqual({
  //...mockState,
  ////is_fetching: true
  //});
  //});

  it("Receives post captcha success action", () => {
    expect(
      signupReducer(mockState, {
        type: captchaActions.POST_SIGNUP_TRYCAPTCHA_SUCCESS,
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false
    });
  });

  it("Receives post captcha failure action", () => {
    expect(
      signupReducer(mockState, {
        type: captchaActions.POST_SIGNUP_TRYCAPTCHA_FAIL,
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false,
    });
  });

  it("Receives verify link success action", () => {
    expect(
      signupReducer(mockState, {
        type: verifiedActions.GET_SIGNUP_VERIFY_LINK_SUCCESS,
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false
    });
  });

  it("Receives verify link failure action", () => {
    expect(
      signupReducer(mockState, {
        type: verifiedActions.GET_SIGNUP_VERIFY_LINK_FAIL,
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false,
    });
  });

  it("Receives resend code action", () => {
    expect(
      signupReducer(mockState, {
        type: resendActions.POST_SIGNUP_RESEND_VERIFICATION,
      })
    ).toEqual({
      ...mockState,
      //is_fetching: true
    });
  });

  it("Receives resend code success action", () => {
    expect(
      signupReducer(mockState, {
        type: resendActions.POST_SIGNUP_RESEND_VERIFICATION_SUCCESS,
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false
    });
  });

  it("Receives resend code failure action", () => {
    expect(
      signupReducer(mockState, {
        type: resendActions.POST_SIGNUP_RESEND_VERIFICATION_FAIL,
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false,
    });
  });
});

describe("SignupMain async actions", () => {
  it("Tests the request config saga", () => {
    const url = SIGNUP_CONFIG_URL;
    const generator = requestConfig();
    let resp = generator.next();
    expect(resp.value).toEqual(call(fetchConfig, url));

    const action = {
      type: signupActions.GET_SIGNUP_CONFIG_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };
    resp = generator.next(action);
    expect(resp.value).toEqual(put(action));
    resp = generator.next();
    //    delete action.payload.csrf_token;
    expect(resp.value).toEqual(put(signupActions.appLoaded()));
  });

  it("Tests the request code status saga", () => {
    const state = {
      signupTestState,
      config: {
        csrf_token: "dummy-token",
        code: "dummy-code",
      },
    };
    const url = SIGNUP_SERVICE_URL + "verify-link/" + state.config.code;
    const generator = requestCodeStatus();
    generator.next();
    let resp = generator.next(state);
    expect(resp.value).toEqual(call(fetchCodeStatus, url));

    const action = {
      type: verifiedActions.GET_SIGNUP_VERIFY_LINK_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        status: "verified",
      },
    };
    resp = generator.next(action);

    const url2 = SIGNUP_CONFIG_URL;
    expect(resp.value).toEqual(call(fetchConfig, url2));

    const action2 = {
      type: signupActions.GET_SIGNUP_CONFIG_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };
    resp = generator.next(action2);
    expect(resp.value).toEqual(put(action2));
    //expect(resp.value.PUT.action.type).toEqual(signupActions.GET_SIGNUP_CONFIG_SUCCESS);
    resp = generator.next();
    //delete action.payload.csrf_token;
    expect(resp.value).toEqual(put(signupActions.appLoaded()));

    resp = generator.next();
    //expect(resp.value.PUT.action.type).toEqual(verifiedActions.GET_SIGNUP_VERIFY_LINK_SUCCESS);
  });
});
