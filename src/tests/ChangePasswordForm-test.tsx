import ChangePasswordForm, { ChangePasswordFormProps } from "components/ChangePasswordForm";
import { ReactWrapper, shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import { setupComponent } from "./helperFunctions/DashboardTestApp";

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
  function getWrapper() {
    return setupComponent({
      component: <ChangePasswordForm {...test_props} />,
      overrides: { chpass: { suggested_password: "secret" }, personal_data: { data: {} }, emails: {} },
    });
  }

  it("old and new password inputs render", () => {
    const wrapper = getWrapper();
    const oldPwInput = wrapper.find("input[name='old']");
    const suggestedPwInput = wrapper.find("input[name='suggested']");
    const customPwInput = wrapper.find("input[name='custom']");

    expect(oldPwInput.exists()).toEqual(true);
    expect(suggestedPwInput.exists()).toEqual(true);
    expect(customPwInput.exists()).toEqual(false);
  });

  it("save password button renders", () => {
    const wrapper = getWrapper();
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

    const wrapper = getWrapper();

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
