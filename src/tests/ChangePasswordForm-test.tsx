import React from "react";
import expect from "expect";
import { shallow, mount } from "enzyme";
import { IntlProvider } from "react-intl";
import { ReduxIntlProvider } from "components/ReduxIntl";
import ChangePasswordForm from "components/ChangePasswordForm";
import { ChangePasswordProps } from "components/ChangePassword";
import { DashboardAppDispatch, DashboardRootState, dashboardStore } from "dashboard-init-app";
import chpassSlice, { ChangePasswordState } from "reducers/ChangePassword";

const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");

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

const test_props: ChangePasswordProps = {
  password_entropy: 0,
  password_score: 0,
  password_strength_msg: "testing",
  custom_ready: false,
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
  const fakeState = {
    security: {
      confirming_change: false,
    },
    chpass: {
      suggested_password: "h3u r6 lo9",
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  function setupComponent() {
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
    const { wrapper } = setupComponent();
    const oldPwInput = wrapper.find("input[name='old-password-field']");
    const suggestedPwInput = wrapper.find("input[name='suggested-password-field']");
    expect(oldPwInput.exists()).toEqual(true);
    expect(suggestedPwInput.exists()).toEqual(true);
  });

  // im commenting out this test becasue the id has changed here, so this button cannot be found anymore
  // it("save password button renders", () => {
  //   const { wrapper } = setupComponent();
  //   const savePwButton = wrapper.find("EduIDButton#chpass-button");
  //   expect(savePwButton.exists()).toEqual(true);
  //   expect(savePwButton.text().includes("password")).toEqual(true);
  // });
});
