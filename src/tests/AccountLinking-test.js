import PropTypes from "prop-types";

const mock = require('jest-mock');
import React from 'react';
import { register } from 'u2f-api'
import { shallow, mount, render } from 'enzyme';
import { put, select, call } from "redux-saga/effects";
import expect, { createSpy, spyOn, isSpy } from "expect";
import AccountLinking from 'components/AccountLinking';
import DeleteModal from 'components/DeleteModal';
import AccountLinkingContainer from 'containers/AccountLinking';
import * as actions from "actions/AccountLinking";
import * as notifyActions from "actions/Notifications";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import accountlinkingReducer from "reducers/AccountLinking";
import { Provider } from 'react-intl-redux';
import { eduidNotify } from "actions/Notifications";

import { requestOrcid, requestConnectOrcid, requestRemoveOrcid, fetchOrcid, removeOrcid } from 'sagas/AccountLinking';

import { addLocaleData } from 'react-intl';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("AccountLinking Actions", () => {
   it("Should get orcid ", () => {
       const expectedAction = {
           type: actions.GET_ORCID
       };
       expect(actions.getOrcid()).toEqual(expectedAction);
   });

   it("Should fail when trying to get orcid", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_ORCID_FAIL,
      error: true,
      payload: {
        error: err,
        message: err
      }
    };
    expect(actions.getOrcidFail(err)).toEqual(expectedAction);
  });

  it("Should start orcid connect ", () => {
     const expectedAction = {
         type: actions.GET_ORCID_CONNECT
     };
     expect(actions.startOrcidConnect()).toEqual(expectedAction);
  });

  it("Should start orcid remove ", () => {
     const expectedAction = {
         type: actions.POST_ORCID_REMOVE
     };
     expect(actions.startOrcidRemove()).toEqual(expectedAction);
  });

  it("Should fail when trying to remove orcid", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.POST_ORCID_REMOVE_FAIL,
      error: true,
      payload: {
        error: err,
        message: err
      }
    };
    expect(actions.startOrcidRemoveFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {

  const mockState = {
    failed: false,
    error: '',
    message: '',
    orcid: {}
  };

  it("Receives a GET_ORCID action", () => {
    expect(
      accountlinkingReducer(
        mockState,
        {
          type: actions.GET_ORCID
        }
      )
    ).toEqual(
      {
        failed: false,
        error: '',
        message: '',
        orcid: {}
      }
    );
  });

  it("Receives a GET_ORCID_SUCCESS action", () => {
    const orcid = {
              id: 'https://sandbox.orcid.org/0000-0000-0000-0000',
              name: null,
              given_name: 'Test',
              family_name: 'Testsson'
            };
    expect(
      accountlinkingReducer(
        mockState,
        {
          type: actions.GET_ORCID_SUCCESS,
          payload: {
              orcid: orcid
          }
        }
      )
    ).toEqual(
      {
        failed: false,
        error: '',
        message: '',
        orcid: orcid
      }
    );
  });

  it("Receives a GET_ORCID_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      accountlinkingReducer(
        mockState,
        {
          type: actions.GET_ORCID_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        failed: true,
        error: error,
        message: err,
        orcid: {}
      }
    );
  });

  it("Receives a POST_ORCID_REMOVE action", () => {
    expect(
      accountlinkingReducer(
        mockState,
        {
          type: actions.POST_ORCID_REMOVE
        }
      )
    ).toEqual(
      {
        failed: false,
        error: '',
        message: '',
        orcid: {}
      }
    );
  });

  it("Receives a POST_ORCID_REMOVE_SUCCESS action", () => {
    expect(
      accountlinkingReducer(
        mockState,
        {
          type: actions.POST_ORCID_REMOVE_SUCCESS
        }
      )
    ).toEqual(
      {
        failed: false,
        error: '',
        message: '',
        orcid: {}
      }
    );
  });

  it("Receives a POST_ORCID_REMOVE_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      accountlinkingReducer(
        mockState,
        {
          type: actions.POST_ORCID_REMOVE_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        failed: true,
        error: error,
        message: err,
        orcid: {}
      }
    );
  });

});


const fakeStore = (state) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

const mockState = {
  account_linking: {
    failed: false,
    error: '',
    message: '',
    orcid: {}
  },
  config: {
    csrf_token: 'csrf-token',
    ORCID_URL: '/dummy-orcid-url/'
  },
  intl: {
    locale: 'en',
    messages: messages
  }
};

describe("Async component", () => {

  it("Sagas requestOrcid", () => {

      const generator = requestOrcid();

      let next = generator.next();
      expect(next.value).toEqual(put(actions.getOrcid()));

      next = generator.next();
      const config = state => state.config;
      const orcid = generator.next(config);
      expect(orcid.value).toEqual(call(fetchOrcid,config));

      const action = {
        type: actions.GET_ORCID_SUCCESS,
        payload: {
          csrf_token: 'csrf-token',
          orcid: {
              id: 'https://sandbox.orcid.org/0000-0000-0000-0000',
              name: null,
              given_name: 'Test',
              family_name: 'Testsson'
            }
        }
      };
      next = generator.next(action);
      expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
      next = generator.next();
      delete(action.payload.csrf_token);
      expect(next.value).toEqual(put(action));
  });

  it("Sagas requestConnectOrcid", () => {

    const oldLoc = window.location.href;
    let mockWindow = {
      location:{
        href: oldLoc
      }
    };

    const generator = requestConnectOrcid(mockWindow);

    let next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    generator.next(mockState.config);
    expect(mockWindow.location.href).toEqual('/dummy-orcid-url/authorize');
  });

  it("Sagas requestRemoveOrcid", () => {

    const generator = requestRemoveOrcid();
    let next = generator.next();

    expect(next.value.SELECT.args).toEqual([]);

    const data = {
        csrf_token: 'csrf-token'
    };

    next = generator.next(mockState.config);
    expect(next.value).toEqual(call(removeOrcid, mockState.config, data));

    const action = {
      type: actions.POST_ORCID_REMOVE_SUCCESS,
      payload: {
        csrf_token: 'csrf-token',
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
    next = generator.next();
    delete(action.payload.csrf_token);
    expect(next.value).toEqual(put(action));
  });
});

function setupComponent() {
  const props = {
    orcid: {},
    handleOrcidConnect: mock.fn(),
    handleOrcidDelete: mock.fn(),
    langs: [],
  };

  const wrapper = shallow(<Provider store={fakeStore(mockState)}>
                             <AccountLinkingContainer {...props} />
                          </Provider>)
  return {
    props,
    wrapper,
  }
}

describe("AccountLinking Component", () => {

    it("Renders", () => {
        const {wrapper, props} = setupComponent(),
            intro = wrapper.find('div.intro'),
            orcid = wrapper.find('div.orcid')
    });
});


describe("AccountLinking Container", () => {
  let mockProps,
    language,
    getWrapper,
    getState,
    dispatch,
    store;

  beforeEach(() => {

    getState = function () {
      return {
        account_linking: {
          failed: false,
          error: '',
          message: '',
          orcid: {
            id: 'https://sandbox.orcid.org/0000-0000-0000-0000',
            name: null,
            given_name: 'Test',
            family_name: 'Testsson'
          }
        },
        config: {
          csrf_token: 'csrf-token',
          ORCID_URL: '/dummy-orcid-url/'
        },
        intl: {
            locale: 'en',
            messages: messages
        },
        notifications: {
            messages: [],
            errors: [],
            warnings: []
        }
      }
    };

    mockProps = {
        orcid: {},
        language: 'en',
    };

    getWrapper = function ({ props=mockProps } = {}) {
      store = fakeStore(getState());
      dispatch = store.dispatch;

      const wrapper = mount(
          <Provider store={store}>
              <AccountLinkingContainer {...props}/>
          </Provider>
      );
      return wrapper;
    };
    language = getWrapper().find(AccountLinkingContainer).props().language;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders test", () => {
      expect(language).toEqual('en');
  });


  it("Clicks remove orcid", () => {

    expect(dispatch.mock.calls.length).toEqual(0);
    getWrapper().find('EduIDButton#remove-orcid-button').props().onClick();
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(actions.POST_ORCID_REMOVE);
  });
});
