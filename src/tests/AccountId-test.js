import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import AccountIdContainer from "containers/AccountId";
import { ReduxIntlProvider } from "../components/ReduxIntl";
const messages = require("../login/translation/messageIndex");
const mock = require("jest-mock");

const fakeStore = (fakeState) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...fakeState }),
});

describe("AccountId component renders", () => {
  let wrapper;

  const fakeState = {
    personal_data: {
      eppn: "dummy-eppn",
    },
    intl: {
      locale: "en",
      messages: messages,
    },
  };

  beforeEach(() => {
    const store = fakeStore(fakeState);

    wrapper = mount(
      <ReduxIntlProvider store={store}>
        <AccountIdContainer />
      </ReduxIntlProvider>
    );
  });

  it("Component renders h4 heading", () => {
    const heading = wrapper.find("h3");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toContain("Unique ID");
  });

  it("Component renders eppn", () => {
    const eppn = wrapper.find(".display-data");
    expect(eppn.exists()).toBe(true);
    expect(eppn.text()).toContain("dummy-eppn");
  });
});
