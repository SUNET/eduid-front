import { fetchFrejaData } from "../sagas/OpenidConnectFreja";

const mock = require("jest-mock");
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import * as actions from "actions/OpenidConnect";
import openidConnectReducer from "reducers/OpenidConnect";
import OpenidConnect from "components/OpenidConnect";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import OpenidConnectContainer from "containers/OpenidConnect";

const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

describe("OIDC Actions", () => {
  it("should create an action to trigger fetching a qrcode", () => {
    const nin = "190102031234";
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_PROOFING,
      payload: {
        nin: "190102031234"
      }
    };
    expect(actions.postOpenidSeleg(nin)).toEqual(expectedAction);
  });

  it("should create an action to signal an error fetching a qrcode", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_PROOFING_FAIL,
      error: true,
      payload: {
        error: true,
        message: "Bad error"
      }
    };
    expect(actions.postOpenidSelegFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    error: "",
    qr_img: "code",
    qr_code: "nonce",
    nin: "",
    showModal: false
  };

  const nin = "190102031234";

  it("Receives a POST_OIDC_PROOFING_PROOFING action", () => {
    expect(
      openidConnectReducer(mockState, {
        type: actions.POST_OIDC_PROOFING_PROOFING,
        payload: {
          nin: nin
        }
      })
    ).toEqual({
      error: "",
      qr_img: "code",
      qr_code: "nonce",
      nin: nin,
      showModal: false
    });
  });

  it("Receives a POST_OIDC_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      openidConnectReducer(mockState, {
        type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
        payload: { qr_img: "new code", qr_code: "new nonce" }
      })
    ).toEqual({
      error: "",
      qr_img: "new code",
      qr_code: "new nonce",
      nin: "",
      showModal: false
    });
  });

  it("Receives a POST_OIDC_PROOFING_PROOFING_FAIL action", () => {
    expect(
      openidConnectReducer(mockState, {
        type: actions.POST_OIDC_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          error: true,
          message: "Bad error"
        }
      })
    ).toEqual({
      error: true,
      message: "Bad error",
      nin: "",
      qr_img: "code",
      qr_code: "nonce",
      showModal: false
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      openidConnectReducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({
      error: "",
      nin: "",
      qr_img: "code",
      qr_code: "nonce",
      showModal: false
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
  openid_data: {
    error: "",
    qr_img:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    qr_code: "new nonce",
    nin: "",
    showModal: false
  },
  config: {
    OIDC_PROOFING_URL: "http://localhost/oidc"
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

function setupComponent(store) {
  const props = {
    handleGetQRCode: mock.fn(),
    qr_img: "code",
    qr_code: "nonce"
  };

  const wrapper = mount(
    <Provider store={store}>
      <OpenidConnectContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

// Modals are hard
/*
describe("OpenidConnect Component", () => {

  it("Renders", () => {
    const store = fakeStore(fakeState),
          { wrapper, props } = setupComponent(store),
          form = wrapper.find('form'),
          fieldset = wrapper.find('fieldset'),
          button = wrapper.find('EduIDButton'),
          divQrcode = wrapper.find('div#qrcode'),
          img = wrapper.find('img'),
          caption = wrapper.find('figcaption');

    expect(form.hasClass('form-horizontal')).toBeTruthy();
    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.contains(button.get(0))).toBeTruthy();
    expect(divQrcode.contains(img.get(0))).toBeTruthy();

    expect(form.props()).toMatchObject({role: 'form'});
    expect(fieldset.props()).toMatchObject({id: 'openid-connect'});
    expect(img.props()).toMatchObject({src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'});
    expect(caption).toBeTruthy();

    expect(store.dispatch.mock.calls.length).toEqual(0);
    button.props().onClick();
    expect(store.dispatch.mock.calls.length).toEqual(1);
  })
});

describe("OpenidConnect Container", () => {
  let fulltext,
      qrcode,
      nonce,
      mockProps,
      wrapper,
      dispatch;

  beforeEach(() => {
    const store = fakeStore(fakeState);

    mockProps = {
      qr_img: 'data: old code',
      qr_code: 'old nonce'
    };

    wrapper = mount(
        <Provider store={store}>
            <OpenidConnectContainer {...mockProps}/>
        </Provider>
    );

    fulltext = wrapper.find(OpenidConnectContainer).text();
    qrcode = wrapper.find('img').props().src;
    nonce = wrapper.find('figcaption').text();
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders", () => {
    expect(qrcode).toEqual('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    expect(nonce).toEqual('new nonce');
  });

  it("Clicks", () => {

    fetchMock.post('http://localhost/oidc',
       {
        type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
        payload: {qr_img: 'new code', qr_code: 'new nonce'}
      });

    expect(dispatch.mock.calls.length).toEqual(0);
    wrapper.find('Button').props().onClick();
    expect(dispatch.mock.calls.length).toEqual(1);
  });

});
*/

const state = {
  config: {
    OIDC_PROOFING_URL: "http://localhost/services/oidc-proofing/proofing",
    csrf_token: "csrf-token"
  },
  openid_data: {
    nin: "testing"
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

import {
  checkNINAndShowSelegModal,
  requestOpenidQRcode,
  fetchQRcode
} from "../sagas/OpenidConnect";
import { put, call, select } from "redux-saga/effects";

describe("Async component", () => {
  it("Sagas checkNINAndShowSelegModal", () => {
    const generator = checkNINAndShowSelegModal();
    let next = generator.next();
    let debug = select(state => state);
    delete debug.SELECT.selector;
    expect(next.value).toMatchObject(debug);
  });

  it("Sagas requestOpenidQRcode", () => {
    const generator = requestOpenidQRcode();
    let next = generator.next();
    let debug = select(state => state);
    delete debug.SELECT.selector;
    expect(next.value).toMatchObject(debug);

    const oidcData = generator.next(state);
    const data = {
      nin: "testing",
      csrf_token: "csrf-token"
    };

    expect(oidcData.value).toEqual(
      call(fetchQRcode, state.config.OIDC_PROOFING_URL, data)
    );

    const action = {
      type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
      payload: {
        qr_img: "new code",
        qr_code: "new nonce",
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
