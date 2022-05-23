import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { SignupRootState, signupStore } from "signup-init-app";

export const signupTestState: SignupRootState = {
  config: {
    dashboard_url: "",
    csrf_token: "",
    recaptcha_public_key: "",
    captcha: "",
    code: "",
    tou: "",
    is_app_loaded: true,
    //is_fetching: false,
    debug: true,
    available_languages: [],
    reset_password_link: "http://dummy.example.com/reset-password",
  },
  captcha: {
    captcha_verification: "",
    disabledButton: false,
  },
  verified: {
    password: "",
    email: "",
    status: "",
    dashboard_url: "",
    gotten: false,
  },
  email: {
    email: "",
    acceptingTOU: false,
    tou_accepted: false,
  },
  router: undefined as any,
  form: undefined as any,
  intl: { locale: "en", messages: {} },
  notifications: {},
};

export type SignupStoreType = typeof signupStore;

interface FakeStoreArgs {
  state?: SignupRootState;
  overrides?: Partial<SignupRootState>;
}

export function fakeStore(args: FakeStoreArgs = {}): MockStoreEnhanced<SignupRootState> {
  const middlewares = [thunk];
  const store = createMockStore<SignupRootState>(middlewares);
  return store({ ...(args.state || signupTestState), ...args.overrides });
}

interface setupComponentArgs {
  component: JSX.Element;
  store?: SignupStoreType;
  overrides?: Partial<SignupRootState>;
}

export function setupComponent({ component, store, overrides }: setupComponentArgs): ReactWrapper {
  if (store === undefined) {
    store = fakeStore({ overrides });
  }
  const wrapper = mount(<ReduxIntlProvider store={store}>{component}</ReduxIntlProvider>);
  return wrapper;
}
