const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { mount } from "enzyme";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";

import SignupMainContainer from "containers/SignupMain";
import * as signupActions from "actions/SignupMain";
import * as captchaActions from "actions/Captcha";
import * as verifiedActions from "actions/CodeVerified";
import * as resendActions from "actions/ResendCode";
import signupReducer from "reducers/SignupMain";
import {
  requestCodeStatus,
  fetchCodeStatus,
  requestConfig,
  fetchConfig
} from "sagas/SignupMain";

import { addLocaleData } from "react-intl";

import en from "react-intl/locale-data/en";
import sv from "react-intl/locale-data/sv";

addLocaleData([...en, ...sv]);

const fakeState = {
  config: {
    dashboard_url: "",
    csrf_token: "",
    recaptcha_public_key: "",
    captcha: "",
    code: "",
    tou: "",
    is_app_loaded: true,
    //is_fetching: false,
    error: false,
    DEBUG: true,
    available_languages: {}
  },
  captcha: {
    captcha_verification: ""
  },
  verified: {
    password: "",
    email: "",
    status: "",
    dashboard_url: "",
    gotten: false
  },
  email: {
    email: "",
    acceptingTOU: false,
    tou_accepted: false
  },
  notifications: {
    messages: [],
    errors: []
  },
  intl: {
    locale: "en",
    messages: {
      en: en,
      sv: sv
    }
  },
  emails: {
    nins: []
  },
  nins: {
    emails: []
  }
};

export const getState = (overrides = {}) => {
  const refakeState = { ...fakeState };
  Object.getOwnPropertyNames(fakeState).forEach(propName => {
    const overriddenProps = Object.getOwnPropertyNames(overrides);
    if (overriddenProps.includes(propName)) {
      refakeState[propName] = {
        ...fakeState[propName],
        ...overrides[propName]
      };
    }
  });
  return refakeState;
};

export const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

export function setupComponent({ component, overrides, store } = {}) {
  if (store === undefined) {
    if (overrides === undefined) {
      overrides = {};
    }
    store = fakeStore(getState(overrides));
  }
  const wrapper = mount(<Provider store={store}>{component}</Provider>);
  return wrapper;
}

describe("SignupMain Component", () => {
  it("Renders the splash screen", () => {
    const wrapper = setupComponent({
        component: <SignupMainContainer />,
        overrides: { config: { is_app_loaded: false } }
      }),
      splash = wrapper.find("div#eduid-splash-screen"),
      router = wrapper.find("Router"),
      routes = wrapper.find("Route");

    expect(splash.length).toEqual(1);
    expect(router.length).toEqual(1);
    expect(routes.length).toEqual(7);
  });

  it("Doesn't Render the splash screen", () => {
    const wrapper = setupComponent({ component: <SignupMainContainer /> }),
      splash = wrapper.find("div#eduid-splash-screen");

    expect(splash.length).toEqual(0);
  });

  it("Renders the email form", () => {
    const wrapper = setupComponent({ component: <SignupMainContainer /> }),
      splash = wrapper.find("div#eduid-splash-screen"),
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
      type: signupActions.GET_CODE_STATUS,
      payload: {
        code: "dummy code"
      }
    };
    expect(signupActions.getCodeStatus("dummy code")).toEqual(expectedAction);
  });

  it("Should fail when trying to get the code status", () => {
    const err = new Error("Get code status error");
    const expectedAction = {
      type: signupActions.GET_CODE_STATUS_FAIL,
      error: true,
      payload: {
        error: err,
        message: err
      }
    };
    expect(signupActions.getCodeStatusFail(err)).toEqual(expectedAction);
  });

  it("Should signal the app has loaded", () => {
    const expectedAction = {
      type: signupActions.APP_LOADED
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
    const err = new Error("Get config error");
    const expectedAction = {
      type: signupActions.GET_SIGNUP_CONFIG_FAIL,
      error: true,
      payload: {
        error: err,
        message: err
      }
    };
    expect(signupActions.getSignupConfigFail(err)).toEqual(expectedAction);
  });

  it("Should store a new csrf token", () => {
    const expectedAction = {
      type: signupActions.NEW_CSRF_TOKEN,
      payload: {
        csrf_token: "dummy token"
      }
    };
    expect(signupActions.newCsrfToken("dummy token")).toEqual(expectedAction);
  });
});

describe("SignupMain reducer", () => {
  const mockState = {
    dashboard_url: "",
    csrf_token: "",
    recaptcha_public_key: "",
    captcha: "",
    code: "",
    tou: "",
    is_app_loaded: false,
    //is_fetching: false,
    error: false,
    DEBUG: true,
    available_languages: {}
  };

  it("Receives app loaded action", () => {
    expect(
      signupReducer(mockState, {
        type: signupActions.APP_LOADED
      })
    ).toEqual({
      ...mockState,
      is_app_loaded: true
    });
  });

  it("Receives get code status action", () => {
    expect(
      signupReducer(mockState, {
        type: signupActions.GET_CODE_STATUS,
        payload: {
          code: "dummy code"
        }
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
        type: signupActions.GET_CODE_STATUS_FAIL,
        error: true,
        payload: {
          error: err,
          message: err
        }
      })
    ).toEqual({
      ...mockState,
      error: true
    });
  });

  it("Receives get config sucessful action", () => {
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
          faq_link: "http://example.com"
        }
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
      faq_link: "http://example.com"
    });
  });

  it("Receives get config failure action", () => {
    expect(
      signupReducer(mockState, {
        type: signupActions.NEW_CSRF_TOKEN,
        payload: {
          csrf_token: "dummy token"
        }
      })
    ).toEqual({
      ...mockState,
      csrf_token: "dummy token"
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
        type: captchaActions.POST_SIGNUP_TRYCAPTCHA_SUCCESS
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false
    });
  });

  it("Receives post captcha failure action", () => {
    expect(
      signupReducer(mockState, {
        type: captchaActions.POST_SIGNUP_TRYCAPTCHA_FAIL
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false,
      error: true
    });
  });

  it("Receives verify link success action", () => {
    expect(
      signupReducer(mockState, {
        type: verifiedActions.GET_SIGNUP_VERIFY_LINK_SUCCESS
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false
    });
  });

  it("Receives verify link failure action", () => {
    expect(
      signupReducer(mockState, {
        type: verifiedActions.GET_SIGNUP_VERIFY_LINK_FAIL
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false,
      error: true
    });
  });

  it("Receives resend code action", () => {
    expect(
      signupReducer(mockState, {
        type: resendActions.POST_SIGNUP_RESEND_VERIFICATION
      })
    ).toEqual({
      ...mockState,
      //is_fetching: true
    });
  });

  it("Receives resend code success action", () => {
    expect(
      signupReducer(mockState, {
        type: resendActions.POST_SIGNUP_RESEND_VERIFICATION_SUCCESS
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false
    });
  });

  it("Receives resend code failure action", () => {
    expect(
      signupReducer(mockState, {
        type: resendActions.POST_SIGNUP_RESEND_VERIFICATION_FAIL
      })
    ).toEqual({
      ...mockState,
      //is_fetching: false,
      error: true
    });
  });
});

describe("SignupMain async actions", () => {
  it("Tests the request config saga", () => {
    const state = getState({
      config: {
        csrf_token: "dummy-token"
      }
    });
    const url = SIGNUP_CONFIG_URL;
    const generator = requestConfig();
    let resp = generator.next();
    expect(resp.value).toEqual(call(fetchConfig, url));

    const action = {
      type: signupActions.GET_SIGNUP_CONFIG_SUCCESS,
      payload: {
        csrf_token: "csrf-token"
      }
    };
    resp = generator.next(action);
    expect(resp.value.PUT.action.type).toEqual(
      signupActions.GET_SIGNUP_CONFIG_SUCCESS
    );
    resp = generator.next();
    delete action.payload.csrf_token;
    expect(resp.value).toEqual(put(signupActions.appLoaded()));
  });

  it("Tests the request code status saga", () => {
    const state = getState({
      config: {
        csrf_token: "dummy-token",
        code: "dummy-code"
      }
    });
    const url = SIGNUP_SERVICE_URL + "verify-link/" + state.config.code;
    const generator = requestCodeStatus();
    generator.next();
    let resp = generator.next(state);
    expect(resp.value).toEqual(call(fetchCodeStatus, url));

    const action = {
      type: verifiedActions.GET_SIGNUP_VERIFY_LINK_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        status: "verified"
      }
    };
    resp = generator.next(action);

    const url2 = SIGNUP_CONFIG_URL;
    expect(resp.value).toEqual(call(fetchConfig, url2));

    const action2 = {
      type: signupActions.GET_SIGNUP_CONFIG_SUCCESS,
      payload: {
        csrf_token: "csrf-token"
      }
    };
    resp = generator.next(action2);
    expect(resp.value.PUT.action.type).toEqual(
      signupActions.GET_SIGNUP_CONFIG_SUCCESS
    );
    resp = generator.next();
    delete action.payload.csrf_token;
    expect(resp.value).toEqual(put(signupActions.appLoaded()));

    resp = generator.next();
    expect(resp.value.PUT.action.type).toEqual(
      verifiedActions.GET_SIGNUP_VERIFY_LINK_SUCCESS
    );
  });
});
