import React from "react";
import expect from "expect";
import { shallow } from "enzyme";
import AccountId from "components/AccountId";
import { IntlProvider } from "react-intl";

// I am the component that: displays unique id to user in Advanced settings.
// My job is to: I render text and the eppn (from store).

// Comments N: This component gets data from the store and displays it, so I think these rendering tests might be enough

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
