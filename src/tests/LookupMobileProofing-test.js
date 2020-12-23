const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import * as actions from "actions/LookupMobileProofing";
import lookupMobileProofingReducer from "reducers/LookupMobileProofing";
import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
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
        <LookupMobileProofingContainer />
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
    const description = wrapper.find("div.description");
    expect(description.exists()).toEqual(true);
    expect(description.text()).toContain("ID number");
  });

  it("Renders button text, the phone number is added", () => {
    const state = {...fakeState};
    state.phones.phones = [{number:"+46700011555"}],
    state.nins.nins[0] = "19881212"
    const { wrapper } = setupComponent();
    const description = wrapper.find("div.description");
    const confirmPhone = description.find("span").at(0);
    expect(confirmPhone.exists()).toEqual(true);
    expect(confirmPhone.text()).toContain("Confirm");
  });

  it("Renders button text, the phone number is verified", () => {
    const state = {...fakeState};
    state.phones.phones = [{number:"+46700011555", primary: true, verified: true}],
    state.nins.nins[0] = "19881212"
    const { wrapper } = setupComponent();
    const description = wrapper.find("div.description");
    expect(description.exists()).toEqual(false);
  });

  it("Renders button text, if the phone number is non swedish", () => {
    const state = {...fakeState};
    state.phones.phones = [{number:"+36700011555", primary: true, verified: true}],
    state.nins.nins[0] = "19881212"
    const { wrapper } = setupComponent();
    const description = wrapper.find("div.description");
    expect(description.exists()).toEqual(true);
    expect(description.text()).toContain("Swedish");
  });
});

// DOES THIS TEST STILL APPLY? the mock calls to dispatch results in 2 -- not sure why

/* this component does have 3 functions to dispatch, but the button in this test only dispatches showModal (and does not have handlelookupMobile although it's passed in the props)... ShowModal never posts to the URL so the action is never triggered (its the button generated in the modal that does that, IF under the condition that you have a confirmed phoen number) */

// describe("LookupMobileProofing Container", () => {
//   let wrapper, dispatch, button;

//   beforeEach(() => {
//     const store = fakeStore(fakeState);

//     wrapper = mount(
//       <Provider store={store}>
//         <LookupMobileProofingContainer />
//       </Provider>
//     );
//     button = wrapper.find("button");
//     dispatch = store.dispatch;
//   });

//   afterEach(() => {
//     fetchMock.restore();
//   });

//   it("Clicks", () => {
//     fetchMock.post("http://localhost/lookup-mobile", {
//       type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS,
//       payload: {}
//     });
//     expect(dispatch.mock.calls.length).toEqual(0);
//     // button.props().onClick();
//     console.log(button.props())
//     expect(dispatch.mock.calls.length).toEqual(1);
//   });
// });

// import {
//   requestLookupMobileProof,
//   fetchLookupMobileProof
// } from "../sagas/LookupMobileProofing";
// import { put, call, select } from "redux-saga/effects";

// describe("Async component", () => {
//   it("Sagas requestLookupMobileProof", () => {
//     const generator = requestLookupMobileProof();

//     let next = generator.next();
//     next = generator.next(fakeState);

//     const action = {
//       type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS,
//       payload: {
//         csrf_token: "dummy-token"
//       }
//     };

//     generator.next(action);
//     next = generator.next();
//     delete action.payload.csrf_token;
//     expect(next.value).toEqual(put(action));
//   });
// });
