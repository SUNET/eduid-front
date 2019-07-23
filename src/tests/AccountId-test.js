import React from "react";
import expect from "expect";
import { shallow } from "enzyme";
import AccountId from "components/AccountId";
import { IntlProvider } from "react-intl";

describe("AccountId component renders", () => {
  const props = {
    data: {
      given_name: "",
      surname: "",
      display_name: "",
      language: "",
      eppn: "dummy-eppn"
    }
  };
  const wrapper = shallow(
    <IntlProvider locale="en">
      <AccountId {...props} />
    </IntlProvider>
  );
  it("Component does not render 'null' or 'false'", () => {
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
  it("Component recieves user data as props", () => {
    expect(wrapper.props()).toEqual({
      data: {
        display_name: "",
        eppn: "dummy-eppn",
        given_name: "",
        language: "",
        surname: ""
      }
    });
  });
  expect(wrapper.props().data.eppn).toEqual("dummy-eppn");
});
