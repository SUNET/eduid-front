import ChangePasswordForm, { ChangePasswordFormProps } from "components/ChangePasswordForm";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardAppDispatch, DashboardRootState, dashboardStore } from "dashboard-init-app";
import { mount, ReactWrapper, shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import { ChangePasswordState } from "reducers/ChangePassword";

const mock = require("jest-mock");

const baseState: DashboardRootState = {
  config: {
    security_url: "http://security.docker",
    csrf_token: "csrf-token",
  },
  router: undefined as any,
  form: undefined as any,
  intl: { locale: "en", messages: {} },

  chpass: {} as ChangePasswordState,
  emails: undefined as any,
  groups: undefined as any,
  invites: undefined as any,
  openid_data: undefined as any,
  lookup_mobile: undefined as any,
  nins: undefined as any,
  openid_freja_data: undefined as any,
  personal_data: undefined as any,
  phones: undefined as any,
  letter_proofing: undefined as any,
  notifications: undefined as any,
  account_linking: undefined as any,
  security: undefined as any,
  eidas_data: undefined as any,
  ladok: undefined as any,
};

type DashboardStoreType = typeof dashboardStore;

const fakeStore = (fakeState: DashboardRootState) => ({
  ...dashboardStore,
  dispatch: mock.fn() as unknown as DashboardAppDispatch,
  getState: (): DashboardRootState =>
    // return a copy of the state in loginStore
    ({
      ...dashboardStore.getState(),
      ...fakeState,
    }),
});

const test_props: ChangePasswordFormProps = {
  cancel_to: "cancel_url",
};

describe("ChangePasswordForm Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <ChangePasswordForm {...test_props} />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("ChangePasswordForm renders", () => {
  let store: DashboardStoreType;
  let state: DashboardRootState;

  beforeEach(() => {
    // re-init store and state before each test to get isolation
    store = fakeStore(baseState);
    state = store.getState();
  });

  function setupComponent(store: DashboardStoreType) {
    const wrapper = mount(
      <ReduxIntlProvider store={store}>
        <ChangePasswordForm {...test_props} />
      </ReduxIntlProvider>
    );
    return {
      wrapper,
    };
  }

  it("old and new password inputs render", () => {
    const { wrapper } = setupComponent(store);
    const oldPwInput = wrapper.find("input[name='old']");
    const suggestedPwInput = wrapper.find("input[name='suggested']");
    const customPwInput = wrapper.find("input[name='custom']");

    expect(oldPwInput.exists()).toEqual(true);
    expect(suggestedPwInput.exists()).toEqual(true);
    expect(customPwInput.exists()).toEqual(false);
  });

  it("save password button renders", () => {
    const { wrapper } = setupComponent(store);
    const savePwButton = wrapper.find("#chpass-button");
    expect(savePwButton.exists()).toEqual(true);
  });

  it("can toggle between custom and suggested", () => {
    function inputNames(wrapper: ReactWrapper) {
      return wrapper
        .find("input")
        .map((node) => node.props().name)
        .sort();
    }
    const test_state = {
      personal_data: { data: {} },
      emails: {},
    };
    store = fakeStore({ ...baseState, ...test_state });
    const { wrapper } = setupComponent(store);

    let pwModeButton = wrapper.find("#pwmode-button");
    expect(pwModeButton.exists()).toEqual(true);

    // in "suggested" mode (the default), the shown inputs should be old and suggested
    expect(inputNames(wrapper)).toEqual(["old", "suggested"]);

    // now click the button switching to custom password mode
    pwModeButton.first().simulate("click");

    // the shown input fields should have changed to old, custom, repeat (and the hidden score)
    expect(inputNames(wrapper)).toEqual(["custom", "old", "repeat", "score"]);

    // find the button again, should have the same id on the custom password page
    pwModeButton = wrapper.find("#pwmode-button");
    expect(pwModeButton.exists()).toEqual(true);

    // click the button again, switching back to suggested password mode
    pwModeButton.first().simulate("click");

    // in "suggested" mode (the default), the shown inputs should be old and suggested
    expect(inputNames(wrapper)).toEqual(["old", "suggested"]);
  });
});
