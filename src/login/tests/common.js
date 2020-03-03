const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { mount } from "enzyme";
import expect from "expect";

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import sv from "react-intl/locale-data/sv";
import * as  messages from "../../../i18n/l10n/en";

addLocaleData([...en, ...sv]);

// initial state for login app
const fakeState = {
  config: {
    is_app_loaded: false,
    csrf_token: "",
    //is_fetching: false,
    error: false,
    DEBUG: true,
    available_languages: {},
    success_title: "",
    success_body: ""
  },
  notifications: {
    messages: [],
    errors: []
  },
  reset: {
    email: "",
    email_sent: false
  },
  resetting: {
    choose_extrasec: "",
    extrasec_phone_index: -1
  },
  do_reset: {
    new_password: "",
    sms_code: "",
    password_chosen_sms: false,
    webauthn_assertion: null
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

// function that returns a state, possibly overriding some keys.
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

// Fake redux store
export const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

export const setupComponent = function(component, overrides, store) {
  if (store === undefined) {
    if (overrides === undefined) {
      overrides = {};
    }
    store = fakeStore(getState(overrides));
  }
  const wrapper = mount(<Provider store={store}>{component}</Provider>);
  return wrapper;
};
