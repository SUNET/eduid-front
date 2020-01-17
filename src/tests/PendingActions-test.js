const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy } from "expect";
import { IntlProvider, addLocaleData } from "react-intl";

import PendingActionsContainer from "containers/PendingActions";

const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

function setupComponent() {
  const store = fakeStore({
    intl: {
      locale: "en",
      messages: messages
    },
    profile: {
      pending: ["surname", "emails"],
      pending_confirm: ["phone"]
    },
    pendingActions: {
      showModal: false
    },
    config: {
      DASHBOARD_URL: "/profile/"
    }
  });
  const props = {
    pending: ["surname", "emails"],
    pending_confirm: ["phone"]
  };
  const wrapper = mount(
    <Provider store={store}>
      <PendingActionsContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

describe("PendingActions Component", () => {
  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
      area = wrapper.find("ul.pending-actions"),
      pending = wrapper.find("li.pending-action-item");

    expect(area.contains(pending.get(0))).toBeTruthy();
    expect(area.contains(pending.get(1))).toBeTruthy();
    expect(area.contains(pending.get(2))).toBeTruthy();
  });
});
