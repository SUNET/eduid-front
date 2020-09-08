const mock = require("jest-mock");
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import * as actions from "actions/LookupMobileProofing";
import lookupMobileProofingReducer from "reducers/LookupMobileProofing";
import LookupMobileProofing from "components/LookupMobileProofing";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import LookupMobileProofingContainer from "containers/LookupMobileProofing";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

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
  const mockState = {};

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING
      })
    ).toEqual({});
  });

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS
      })
    ).toEqual({});
  });

  it("Receives a POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({});
  });

  it("Receives a DUMMY action", () => {
    expect(
      lookupMobileProofingReducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({});
  });
});

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

const fakeState = {
  lookup_mobile: {},
  config: {
    LOOKUP_MOBILE_PROOFING_URL: "http://localhost/lookup-mobile",
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

function setupComponent() {
  const props = {
    handleLookupMobile: mock.fn()
  };

  const wrapper = mount(
    <Provider store={fakeStore(fakeState)}>
      <LookupMobileProofingContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

describe("LookupMobileProofing Component", () => {
  it("Renders a vetting button", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("button");
    expect(button.exists()).toEqual(true);
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
