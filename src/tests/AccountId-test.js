import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import { Provider } from "react-intl-redux";
import fetchMock from "fetch-mock";
import AccountIdContainer from "components/AccountId";
import { fakeStore } from "tests/SignupMain-test";

const fakeState = {
  personal_data: {
    failed: false,
    data: {
      given_name: "",
      surname: "",
      display_name: "",
      language: "",
      eppn: ""
    }
  },
  config: {
    csrf_token: "",
    is_configured: true,
    failed: false,
    PERSONAL_DATA_URL: "http://localhost/services/personal-data/user"
  },
  intl: {
    locale: "en",
    messagers: "messages"
  },
  form: {
    personal_data: {
      values: {
        failed: false,
        given_name: "",
        surname: "",
        display_name: "",
        language: ""
      }
    }
  }
};

describe("AccountId Component", () => {
  beforeEach(() => {
    const store = fakeStore(fakeState);
    const mockProps = {
      data: {
        eppn: "dummy-eppn"
      }
    };
    const mockDOM = mount(
      <Provider store={store}>
        <AccountIdContainer {...mockProps} />
      </Provider>
    );
    const eppn = mockDOM.find(AccountIdContainer).props().data.eppn;

    it("The component does not render 'false' or 'null'", () => {
      expect(mockDOM.isEmptyRender()).toEqual(false);
    });

    it("component renders a unique id", () => {
      expect(eppn.exists()).toEqual(true);
      expect(eppn.text().include("-")).toEqual(true);
    });

    it("component renders the exact unique id from props", () => {
      expect(eppn).toEqual("dummy-eppn");
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

});