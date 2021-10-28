const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import { put, call } from "redux-saga/effects";
import expect from "expect";
import { BrowserRouter as Router } from "react-router-dom";
import ChangePasswordContainer from "containers/ChangePassword";
import * as actions from "actions/ChangePassword";
import fetchMock from "fetch-mock";
import chpassReducer from "reducers/ChangePassword";
import { Provider } from "react-intl-redux";

import {
  requestSuggestedPassword,
  postPasswordChange,
  fetchSuggestedPassword,
  postPassword,
} from "sagas/ChangePassword";

import { addLocaleData } from "react-intl";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

describe("ChangePassword Actions", () => {
  it("Should get a suggested password", () => {
    const expectedAction = {
      type: actions.GET_SUGGESTED_PASSWORD,
    };
    expect(actions.getSuggestedPassword()).toEqual(expectedAction);
  });

  it("Should fail when trying to get a suggested password", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_SUGGESTED_PASSWORD_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.getSuggestedPasswordFail(err)).toEqual(expectedAction);
  });

  it("Post password change (new and old)", () => {
    const passwd1 = "1234",
      passwd2 = "5678",
      expectedAction = {
        type: actions.POST_PASSWORD_CHANGE,
        payload: {
          old: passwd1,
          next: passwd2,
        },
      };
    expect(actions.postPasswordChange(passwd1, passwd2)).toEqual(
      expectedAction
    );
  });

  it("Should start password change", () => {
    const expectedAction = {
      type: actions.START_PASSWORD_CHANGE,
    };
    expect(actions.startPasswordChange()).toEqual(expectedAction);
  });

  it("Fail starting passwd change", () => {
    const err = "Error",
      expectedAction = {
        type: actions.POST_SECURITY_CHANGE_PASSWORD_FAIL,
        error: true,
        payload: {
          message: err,
        },
      };
    expect(actions.postPasswordChangeFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    message: "",
    suggested_password: "",
    old_password: "",
    new_password: "",
    choose_custom: false,
  };

  it("Receives a GET_SUGGESTED_PASSWORD action", () => {
    expect(
      chpassReducer(mockState, {
        type: actions.GET_SUGGESTED_PASSWORD,
      })
    ).toEqual({
      message: "",
      suggested_password: "",
      old_password: "",
      new_password: "",
      choose_custom: false,
    });
  });

  it("Receives a GET_SUGGESTED_PASSWORD_SUCCESS action", () => {
    const suggested = "2345";
    expect(
      chpassReducer(mockState, {
        type: actions.GET_SUGGESTED_PASSWORD_SUCCESS,
        payload: {
          suggested_password: suggested,
        },
      })
    ).toEqual({
      message: "",
      suggested_password: suggested,
      old_password: "",
      new_password: "",
      choose_custom: false,
    });
  });

  it("Receives a GET_SUGGESTED_PASSWORD_FAIL action", () => {
    const errMsg = "Bad error";
    expect(
      chpassReducer(mockState, {
        type: actions.GET_SUGGESTED_PASSWORD_FAIL,
        error: true,
        payload: {
          message: errMsg,
        },
      })
    ).toEqual({
      message: errMsg,
      suggested_password: "",
      old_password: "",
      new_password: "",
      choose_custom: false,
    });
  });

  it("Receives a POST_PASSWORD_CHANGE action", () => {
    const passwd1 = "1234",
      passwd2 = "5678";
    expect(
      chpassReducer(mockState, {
        type: actions.POST_PASSWORD_CHANGE,
        payload: {
          old: passwd1,
          next: passwd2,
        },
      })
    ).toEqual({
      message: "",
      suggested_password: "",
      old_password: passwd1,
      new_password: passwd2,
      choose_custom: false,
    });
  });

  it("Receives a START_PASSWORD_CHANGE action", () => {
    expect(
      chpassReducer(mockState, {
        type: actions.START_PASSWORD_CHANGE,
      })
    ).toEqual({
      message: "",
      suggested_password: "",
      old_password: "",
      new_password: "",
      choose_custom: false,
    });
  });

  it("Receives a POST_SECURITY_CHANGE_PASSWORD_SUCCESS action", () => {
    const msg = "message";
    expect(
      chpassReducer(mockState, {
        type: actions.POST_SECURITY_CHANGE_PASSWORD_SUCCESS,
        payload: {
          message: msg,
        },
      })
    ).toEqual({
      message: msg,
      suggested_password: "",
      old_password: "",
      new_password: "",
      choose_custom: false,
    });
  });

  it("Receives a POST_SECURITY_CHANGE_PASSWORD_FAIL action", () => {
    const err = "Error";
    expect(
      chpassReducer(mockState, {
        type: actions.POST_SECURITY_CHANGE_PASSWORD_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: "",
      suggested_password: "",
      old_password: "",
      new_password: "",
      choose_custom: false,
    });
  });
});

const mockState = {
  chpass: {
    suggested_password: "",
    old_password: "old-pw",
    new_password: "new-pw",
    choose_custom: false,
  },
  config: {
    csrf_token: "csrf-token",
    dashboard_url: "/dummy-dash-url/",
    token_service_url: "/dummy-tok-url/",
    security_url: "/dummy-sec-url",
  },
};

describe("Async component", () => {
  it("Sagas requestSuggestedPassword", () => {
    const generator = requestSuggestedPassword();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.getSuggestedPassword()));

    next = generator.next();
    const config = (state) => state.config;
    const suggested = generator.next(config);
    expect(suggested.value).toEqual(call(fetchSuggestedPassword, config));

    const mockSuggested = {
        payload: {
          csrf_token: "csrf-token",
          suggested_password: "1234",
        },
      },
      processed = {
        payload: {
          suggested_password: "1234",
        },
      };
    next = generator.next(mockSuggested);
    next = generator.next(processed);
    expect(next.value).toEqual(put(mockSuggested));
  });

  it("Sagas postPasswordChange", () => {
    const generator = postPasswordChange();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.startPasswordChange()));

    next = generator.next();

    const data = {
      csrf_token: "csrf-token",
      old_password: "old-pw",
      new_password: "new-pw",
    };
    next = generator.next(mockState);
    expect(next.value).toEqual(call(postPassword, mockState.config, data));

    let mockCredentials = {
      payload: {
        csrf_token: "csrf-token",
        credentials: [
          {
            credential_type: "password",
            created_ts: "",
            success_ts: "",
          },
        ],
      },
      type: "POST_SECURITY_CHANGE_PASSWORD_SUCCESS",
    };
    next = generator.next(mockCredentials);
    delete mockCredentials.payload.csrf_token;
    generator.next(mockCredentials);
    next = generator.next();
    expect(next.value).toEqual(put(mockCredentials));
  });
});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state }),
});

const fakeState = (custom) => ({
  chpass: {
    message: "",
    suggested_password: "abcd",
    old_password: "",
    new_password: "defg",
    choose_custom: custom,
  },
  config: {
    csrf_token: "",
    security_url: "/dummy-sec-url",
    dashboard_url: "/dummy-dash-url/",
    token_service_url: "/dummy-tok-url/",
  },
  personal_data: {
    data: {
      given_name: "given-name",
      surname: "surname",
      display_name: "display-name",
    },
  },
  emails: {
    emails: [],
  },
  intl: {
    locale: "en",
    messages: messages,
  },
});

describe("ChangePassword Component suggested", () => {
  it("Renders", () => {
    // const store = fakeStore(fakeState(false)),
    // { wrapper } = setupComponent(store),
    // form = wrapper.find("form#passwordsview-form"),
    // inputOldPassword = wrapper.find('TextControl[name="old_password"]'),
    // checkBoxCustom = wrapper.find("CheckBox"),
    // inputSuggested = wrapper.find('TextControl[name="suggested_password"]'),
    // button = wrapper.find("EduIDButton");
  });
});

describe("ChangePassword Component custom", () => {
  it("Renders", () => {
    // const store = fakeStore(fakeState(true)),
    //   { wrapper, props } = setupComponent(store, true),
    //   form = wrapper.find("form#passwordsview-form"),
    //   inputOldPassword = wrapper.find('TextControl[name="old_password"]'),
    //   checkBoxCustom = wrapper.find("CheckBox"),
    //   inputCustom = wrapper.find("PasswordField"),
    //   button = wrapper.find("EduIDButton");
  });
});

describe("ChangePassword Container", () => {
  let fulldom, mockProps, chooseCustom, getWrapper, store;

  beforeEach(() => {
    mockProps = {
      choose_custom: false,
      suggested_password: "abcd",
      new_password: "defg",
      user_input: [],
      password_entropy: 0,
    };

    getWrapper = function (custom = false, props = mockProps) {
      const state = fakeState(custom);
      store = fakeStore(state);
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <ChangePasswordContainer {...props} />
          </Router>
        </Provider>
      );
      return wrapper;
    };
    fulldom = getWrapper().find(ChangePasswordContainer);
    chooseCustom = fulldom.props().choose_custom;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Renders test", () => {
    expect(chooseCustom).toEqual(false);
  });

  /* TODO - fix these tests
   *
  it("Clicks change suggested", () => {
    const wrapper = getWrapper();

    expect(dispatch.mock.calls.length).toEqual(0);
    wrapper.find('TextControl#old_password').state.value = '1234';
    wrapper.find('EduIDButton#chpass-button').props().onClick(mockEvent);
    expect(dispatch.mock.calls.length).toEqual(1);
    const arg = dispatch.mock.calls[0][0];
    expect(arg.type).toEqual(actions.POST_PASSWORD_CHANGE);
    expect(arg.payload.old).toEqual('1234');
    expect(arg.payload.next).toEqual('abcd');
  });

  it("Clicks change custom", () => {
    const newProps = {
            choose_custom: true,
            new_password: 'abcd',
            user_input: [],
            password_entropy: 0
          },
          wrapper = getWrapper(true, newProps);

    expect(dispatch.mock.calls.length).toEqual(0);
    wrapper.find('TextControl').state.value = '1234';
    wrapper.find('EduIDButton#chpass-button').props().onClick(mockEvent);
    expect(dispatch.mock.calls.length).toEqual(1);
    const arg = dispatch.mock.calls[0][0];
    expect(arg.type).toEqual(actions.POST_PASSWORD_CHANGE);
    expect(arg.payload.old).toEqual('1234');
    expect(arg.payload.next).toEqual('defg');
  });

  it("Clicks change custom", () => {
    const newProps = {
            choose_custom: true,
            new_password: '',
            user_input: [],
            password_entropy: 0
          },
          wrapper = getWrapper(true, newProps),
          props = wrapper.find('ChangePassword').props();

    expect(dispatch.mock.calls.length).toEqual(0);
    wrapper.find('TextControl')[0].instance().state.value = '1234';
    wrapper.find('#chpass-button').props().onClick(mockEvent);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0].type).toEqual(actions.POST_PASSWORD_CHANGE);
  });
  */
});
