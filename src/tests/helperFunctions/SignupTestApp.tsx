import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { SignupRootState, signupStore } from "signup-init-app";

export const signupTestState: SignupRootState = {
  config: {
    csrf_token: "csrf-token",
  },
  email: undefined as any,
  captcha: undefined as any,
  verified: undefined as any,
  router: undefined as any,
  form: undefined as any,
  intl: { locale: "en", messages: {} },
  notifications: undefined as any,
};

export type SignupStoreType = typeof signupStore;

export function fakeStore(state: SignupRootState = signupTestState): MockStoreEnhanced<SignupRootState> {
  const middlewares = [thunk];
  const store = createMockStore<SignupRootState>(middlewares);
  return store(state);
}

interface setupComponentArgs {
  component: JSX.Element;
  store?: SignupStoreType;
  overrides?: Partial<SignupRootState>;
}

export function setupComponent({ component, store, overrides }: setupComponentArgs): ReactWrapper {
  if (store === undefined) {
    if (overrides) {
      store = fakeStore({ ...signupTestState, ...overrides });
    } else {
      store = fakeStore();
    }
  }
  const wrapper = mount(<ReduxIntlProvider store={store}>{component}</ReduxIntlProvider>);
  return wrapper;
}
