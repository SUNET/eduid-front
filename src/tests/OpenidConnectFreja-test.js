import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import * as actions from "actions/OpenidConnectFreja";
import openidConnectFrejaReducer from "reducers/OpenidConnectFreja";
import OpenidConnectFreja from "components/OpenidConnectFreja";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

/**
Object.defineProperty(navigator, "userAgent", {
  get: function () {
    return this.testUserAgent;
  }
});
**/

describe("OIDC Freja Actions", () => {
  it("should create an action to trigger fetching of request data", () => {
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_FREJA_PROOFING
    };
    expect(actions.postOpenidFreja()).toEqual(expectedAction);
  });

  it("should create an action to signal an error fetching request data", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_FAIL,
      error: true,
      payload: {
        error: true,
        message: "Bad error"
      }
    };
    expect(actions.postOpenidFrejaFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    error: null,
    iaRequestData: "",
    showModal: true,
    nin: "190001021234"
  };

  it("Receives a POST_OIDC_PROOFING_FREJA_PROOFING action", () => {
    expect(
      openidConnectFrejaReducer(mockState, {
        type: actions.POST_OIDC_PROOFING_FREJA_PROOFING
      })
    ).toEqual({
      error: null,
      iaRequestData: "",
      showModal: true,
      nin: "190001021234"
    });
  });

  it("Receives a POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS action", () => {
    expect(
      openidConnectFrejaReducer(mockState, {
        type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS,
        payload: { iaRequestData: "def456" }
      })
    ).toEqual({
      iaRequestData: "def456",
      error: null,
      showModal: true,
      nin: "190001021234"
    });
  });

  it("Receives a POST_OIDC_PROOFING_FREJA_PROOFING_FAIL action", () => {
    expect(
      openidConnectFrejaReducer(mockState, {
        type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_FAIL,
        error: true,
        payload: {
          error: true,
          message: "Bad error"
        }
      })
    ).toEqual({
      iaRequestData: "",
      error: true,
      message: "Bad error",
      showModal: true,
      nin: "190001021234"
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      openidConnectFrejaReducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({
      iaRequestData: "",
      error: null,
      showModal: true,
      nin: "190001021234"
    });
  });
});

/*  Seem to something fishy about modals, cant seem to get the element
/*
function setupComponent() {
  const props = {
    handleInitializeFrejaProofing: createSpy(),
    handleShowModal: createSpy(),
    iaRequestData: "",
  };

  const wrapper = mount(<IntlProvider locale={'en'} messages={messages}>
                              <OpenidConnectFreja {...props} />
                          </IntlProvider>);

  return {
    props,
    wrapper
  };
}

describe("OpenidConnectFreja Component using a mobile device", () => {

  it("Renders", () => {
    navigator.testUserAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"; // Mobile

    const { wrapper, props } = setupComponent();

    const modal = wrapper.find('Modal'),
          content = modal.instance().modalContent(), // Modals are not part of the component tree
          well = content.find('Well'),
          buttonGroup = content.find('ButtonGroup'),
          installAppLink = buttonGroup.find('Button'),
          openAppButton = buttonGroup.find('EduidButton');

    expect(modal.contains(well.get(0))).toBeTruthy();
    expect(modal.contains(buttonGroup.get(0))).toBeTruthy();
    expect(buttonGroup.contains(installAppLink.get(0))).toBeTruthy();
    expect(buttonGroup.contains(openAppButton.get(0))).toBeTruthy();

    expect(openAppButton.hasClass('link')).toBeTruthy();
    expect(props.handleInitializeFrejaProofing.calls.length).toEqual(0);
    openAppButton.props().onClick();
    expect(props.handleInitializeFrejaProofing.calls.length).toEqual(1);
  })
});

describe("OpenidConnectFreja Component using a non mobile device", () => {

  it("Renders", () => {
    navigator.testUserAgent = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0"; // Desktop

    const { wrapper, props } = setupComponent(),
          modal = wrapper.find('Modal'),
          info = modal.find('div'),
          heading = info.find('h4'),
          msg = info.find('p'),
          button = modal.find('EduIDButton');

    expect(heading.exists()).toBeTruthy();
    expect(msg.exists()).toBeTruthy();

    expect(button.exists()).toBeFalsy();

  })
});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});

describe("OpenidConnectFreja Container before initiated vetting", () => {

  let fulltext,
      mockProps,
      wrapper,
      dispatch;

  beforeEach(() => {
    navigator.testUserAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"; // Mobile
    const store = fakeStore({
      openid_freja_data: {
        iaRequestData: ''
      },
      config: {oidc_proofing_freja_url: 'http://localhost/services/oidc-proofing/freja/proofing'},
    });

    mockProps = {
      iaRequestData: '',
    };

    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <OpenidConnectFrejaContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );

    fulltext = wrapper.find(OpenidConnectFrejaContainer).text();
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Clicks", () => {
    fetchMock.post('http://localhost/services/oidc-proofing/freja/proofing',
      {
        type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
        payload: {iaRequestData: 'abc123'}
      });

    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('Button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

});


describe("OpenidConnectFreja Container after initiated vetting", () => {

  let fulltext,
      iaRequestData,
      mockProps,
      wrapper,
      modal,
      dispatch;

  beforeEach(() => {
    navigator.testUserAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"; // Mobile
    const store = fakeStore({
      openid_freja_data: {
        iaRequestData: 'abc123'
      },
      config: {oidc_proofing_freja_url: 'http://localhost/services/oidc-proofing/freja/proofing'},
    });

    mockProps = {
      iaRequestData: 'abc123',
    };

    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <OpenidConnectFrejaContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );

    fulltext = wrapper.find(OpenidConnectFrejaContainer).text();
    modal = document.getElementById('openid-connect-freja-modal');  // Modals are not part of the component tree
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Changes to link", () => {
    iaRequestData = modal.find('Button').props().href;
    expect(iaRequestData).toEqual('frejaeid://identify?iaRequestData=abc123');
  });

});
*/

const state = {
  config: {
    oidc_proofing_freja_url:
      "http://localhost/services/oidc-proofing/freja/proofing",
    csrf_token: "csrf-token"
  },
  openid_freja_data: {
    nin: "testing"
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

import {
  checkNINAndShowModal,
  initializeOpenidFrejaData,
  fetchFrejaData
} from "../sagas/OpenidConnectFreja";
import { put, call, select } from "redux-saga/effects";

describe("Async component", () => {
  it("Sagas initializeOpenidFrejaData", () => {
    const generator = initializeOpenidFrejaData();

    let next = generator.next();

    let debug = select(state => state);
    delete debug.SELECT.selector;
    expect(next.value).toMatchObject(debug);

    const oidcFrejaData = generator.next(state);
    const data = {
      nin: "testing",
      csrf_token: "csrf-token"
    };
    expect(oidcFrejaData.value).toEqual(
      call(fetchFrejaData, state.config.oidc_proofing_freja_url, data)
    );

    const action = {
      type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS,
      payload: {
        iaRequestData: "def456",
        csrf_token: "csrf-token"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});
