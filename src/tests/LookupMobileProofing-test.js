const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import * as actions from "actions/LookupMobileProofing";
import lookupMobileProofingReducer from "reducers/LookupMobileProofing";
import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import fetchMock from "fetch-mock";
import { MemoryRouter } from "react-router-dom";
import LookupMobileProofingContainer from "containers/LookupMobileProofing";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

const baseState = {
  lookup_mobile: {},
  config: {
    lookup_mobile_proofing_url: "http://localhost/lookup-mobile",
    csrf_token: "dummy-token"
  },
  intl: {
    locale: "en",
    messages: messages
  },
  phones: {
    phones: []
  },
  nins: {
    nins: []
  }
};

const fakeStore = fakeState => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...fakeState })
});

function getFakeState(newState) {
  if (newState === undefined) {
    newState = {}
  }
  return Object.assign(baseState, newState)
}

describe("lookup mobile proofing Actions", () => {
  it("should create an action to trigger checking a mobile phone", () => {
    const expectedAction = {
      type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING
    };
    expect(actions.postLookupMobile()).toEqual(expectedAction);
  });

  it("should create an action to signal an error checking a mobile phone", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
      error: true,
      payload: {
        message: "Bad error"
      }
    };
    expect(actions.postLookupMobileFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const fakeState = getFakeState();
  const lookupMobileState = fakeState.lookup_mobile;

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING action", () => {
    expect(
      lookupMobileProofingReducer(lookupMobileState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING
      })
    ).toEqual({
      ...lookupMobileState
    });
  });

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      lookupMobileProofingReducer(lookupMobileState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS
      })
    ).toEqual({
      ...lookupMobileState
    });
  });

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL action", () => {
    expect(
      lookupMobileProofingReducer(lookupMobileState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      ...lookupMobileState
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      lookupMobileProofingReducer(lookupMobileState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({
      ...lookupMobileState
    });
  });
});

describe("LookupMobile Container", () => {
  let mockProps, wrapper, buttontext;
  const fakeState = getFakeState();
  beforeEach(() => {
    const store = fakeStore(fakeState);
    mockProps = {};

    wrapper = mount(
      <Provider store={store}>
        <LookupMobileProofingContainer {...mockProps} />
      </Provider>
    );
    it("Renders button text", () => {
      buttontext = wrapper.find("button").exists();
      expect(buttontext.exists()).toEqual(true);
      expect(buttontext.text()).toContain("By phone");
    })
  });
  afterEach(() => {
    fetchMock.restore();
  });
});

describe("LookupMobileProofing component,", () => {
  const fakeState = getFakeState({
    nins: {
      valid_nin: false,
      nins: []
    }
  })

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <LookupMobileProofingContainer />
        </MemoryRouter>
      </Provider>
    );
    return {
      wrapper
    };
  }

  it("Renders a vetting button", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("button");
    expect(button.exists()).toEqual(true);
  });

  it("Renders button text, add ID number to verify phone", () => {
    const state = {...fakeState};
    state.nins.nins[0] = ""
    const { wrapper } = setupComponent();
    const explanation = wrapper.find("div.explanation-link");
    expect(explanation.exists()).toEqual(true);
    expect(explanation.text()).toContain("ID number");
  });

  it("Renders button text, the phone number is added", () => {
    const state = {...fakeState};
    state.phones.phones = [{number:"+46700011555"}],
    state.nins.nins[0] = "19881212"
    const { wrapper } = setupComponent();
    const explanation = wrapper.find("div.explanation-link");
    const confirmPhone = explanation.find("span").at(0);
    expect(confirmPhone.exists()).toEqual(true);
    expect(confirmPhone.text()).toContain("Confirm");
  });

  it("Renders button text, if the phone number is non swedish", () => {
    const state = {...fakeState};
    state.phones.phones = [{number:"+36700011555", primary: true, verified: true}],
    state.nins.nins[0] = "19881212"
    const { wrapper } = setupComponent();
    const explanation = wrapper.find("div.explanation-link");
    expect(explanation.exists()).toEqual(true);
    expect(explanation.text()).toContain("Swedish");
  });

  it("Renders button text, when verified swedish phone", () => {
    const state = {...fakeState};
    state.phones.phones = [{number:"+46700011555", primary: true, verified: true}],
    state.nins.nins[0] = "19881212"
    const { wrapper } = setupComponent();
    const explanation = wrapper.find("div.explanation-link");
    expect(explanation.exists()).toEqual(true);
    expect(explanation.text()).toContain("");
  });
});
