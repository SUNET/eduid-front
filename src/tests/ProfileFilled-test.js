const mock = require("jest-mock");
import React from "react";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import ProfileFilledContainer from "containers/ProfileFilled";
import * as actions from "actions/Profile";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import profileReducer from "reducers/Profile";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";

const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

describe("ProfileFilled Actions", () => {
  it("Should set pending actions ", () => {
    const max = 7,
      cur = 5,
      pending = ["pending one", "pending two"],
      data = {
        max: max,
        cur: cur,
        pending: pending
      };
    const expectedAction = {
      type: actions.PROFILE_FILLED,
      payload: data
    };
    expect(actions.profileFilled(max, cur, pending)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    max: 0,
    cur: 0,
    pending: []
  };

  it("Receives a PROFILE_FILLED action", () => {
    expect(
      profileReducer(mockState, {
        type: actions.PROFILE_FILLED,
        payload: {
          max: 7,
          cur: 5,
          pending: ["pending one", "pending two"]
        }
      })
    ).toEqual({
      max: 7,
      cur: 5,
      pending: ["pending one", "pending two"]
    });
  });
});

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

const fakeState = {
  config: {
    csrf_token: ""
  },
  profile: {
    cur: 5,
    max: 7
  },
  intl: {
    locale: "en",
    messagers: messages
  }
};

function setupComponent() {
  const props = {
    max: 7,
    cur: 5
  };

  const wrapper = mount(
    <Provider store={fakeStore(fakeState)}>
      <ProfileFilledContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

describe("ProfileFilled Component", () => {
  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
      container = wrapper.find("li#profile-filled-li"),
      meter = wrapper.find("div.profile-filled-progress-bar");

    expect(container.contains(meter.get(0))).toBeTruthy();
  });
});
