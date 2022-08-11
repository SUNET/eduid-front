import ChangePasswordForm, { ChangePasswordFormProps } from "components/ChangePasswordForm";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { DashboardRootState } from "dashboard-init-app";
import { mount, ReactWrapper, shallow } from "enzyme";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";
import { initialState as emailsInitialState } from "reducers/Emails";
import { DashboardStoreType, dashboardTestState, fakeStore } from "./helperFunctions/DashboardTestApp";

const test_props: ChangePasswordFormProps = {
  finish_url: "cancel_url",
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
    store = fakeStore();
    state = store.getState();
  });

  function setupComponent(store: DashboardStoreType) {
    const wrapper = mount(
      <ReduxIntlProvider store={store}>
        <MemoryRouter>
          <CompatRouter>
            <ChangePasswordForm {...test_props} />
          </CompatRouter>
        </MemoryRouter>
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
      personal_data: {},
      emails: emailsInitialState,
    };
    store = fakeStore({ ...dashboardTestState, ...test_state });
    const { wrapper } = setupComponent(store);

    let pwModeButton = wrapper.find("#pwmode-button");
    expect(pwModeButton.exists()).toEqual(true);

    // in "suggested" mode (the default), the shown inputs should be old and suggested
    expect(inputNames(wrapper)).toEqual(["old", "suggested"]);

    // now click the button switching to custom password mode
    pwModeButton.first().simulate("click");

    // the shown input fields should have changed to old, custom, repeat
    expect(inputNames(wrapper)).toEqual(["custom", "old", "repeat"]);

    // find the button again, should have the same id on the custom password page
    pwModeButton = wrapper.find("#pwmode-button");
    expect(pwModeButton.exists()).toEqual(true);

    // click the button again, switching back to suggested password mode
    pwModeButton.first().simulate("click");

    // in "suggested" mode (the default), the shown inputs should be old and suggested
    expect(inputNames(wrapper)).toEqual(["old", "suggested"]);
  });
});
