import React from "react";
import expect from "expect";
import { shallow, mount } from "enzyme";
import AccountIdComponent from "components/AccountId";
import AccountIdContainer from "containers/AccountId";
import { addLocaleData, IntlProvider } from "react-intl";
import { Provider } from "react-intl-redux";
const messages = require("../../i18n/l10n/en");
const mock = require("jest-mock");
addLocaleData("react-intl/locale-data/en");

// describe("NameDisplay component", () => {
//   it("Does not render 'false' or 'null'", () => {
//     const wrapper = shallow(
//       <IntlProvider locale="en">
//         <AccountIdContainer />
//       </IntlProvider>
//     );
//     expect(wrapper.isEmptyRender()).toEqual(false);
//   });
// });

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
      <AccountIdContainer {...props} />
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

describe("AccountId component renders", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });
  const fakeState = {
    personal_data: {
      data: {
        eppn: "dummy-eppn"
      }
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    // const props = {
    // data: {
    //   eppn: "eppn-dummy"{...props}
    // }
    // };

    // history.push({
    //   pathname: "/verify-identity"
    // });
    // const state = { ...fakeState };
    // state.personal_data.data.given_name = "";
    // state.personal_data.data.surname = "";
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        {/* <Router history={history}> */}
        <AccountIdContainer />
        {/* </Router> */}
      </Provider>
    );
    return {
      // props,
      wrapper
    };
  }

  it("Component renders h4 heading", () => {
    const { wrapper } = setupComponent();
    const heading = wrapper.find("h4");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toContain("Unique ID");
  });

  it("Component renders eppn", () => {
    const { wrapper } = setupComponent();
    const eppn = wrapper.find("#nin-number");
    expect(eppn.exists()).toBe(true);
    expect(eppn.text()).toContain("dummy-eppn");
  });
});
