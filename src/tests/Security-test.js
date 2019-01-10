
const mock = require('jest-mock');
import React from 'react';
import { register } from 'u2f-api'
import { shallow, mount, render } from 'enzyme';
import { put, select, call } from "redux-saga/effects";
import expect, { createSpy, spyOn, isSpy } from "expect";
import Security from 'components/Security';
import DeleteModal from 'components/DeleteModal';
import SecurityContainer from 'containers/Security';
import * as actions from "actions/Security";
import * as notifyActions from "actions/Notifications";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import securityReducer from "reducers/Security";
import { Provider } from 'react-intl-redux';
import { eduidNotify } from "actions/Notifications";

import { requestCredentials, fetchCredentials,
  requestPasswordChange, postDeleteAccount, deleteAccount,
  getU2FEnroll, enrollU2F, registerU2F, postU2FToken,
  removeU2FToken, removeToken } from 'sagas/Security';

import { addLocaleData } from 'react-intl';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("Security Actions", () => {
   it("Should get the credentials ", () => {
       const expectedAction = {
           type: actions.GET_CREDENTIALS
       };
       expect(actions.getCredentials()).toEqual(expectedAction);
   });

   it("Should fail when trying to get the credentials", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_CREDENTIALS_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.getCredentialsFail(err)).toEqual(expectedAction);
  });

  it("Should start password change ", () => {
     const expectedAction = {
         type: actions.START_CHANGE_PASSWORD
     };
     expect(actions.startConfirmationPassword()).toEqual(expectedAction);
  });

  it("Should stop password change ", () => {
     const expectedAction = {
         type: actions.STOP_CHANGE_PASSWORD
     };
     expect(actions.stopConfirmationPassword()).toEqual(expectedAction);
  });

  it("Should really start password change ", () => {
     const expectedAction = {
         type: actions.GET_CHANGE_PASSWORD
     };
     expect(actions.confirmPasswordChange()).toEqual(expectedAction);
  });

  it("Should fail when trying to change password", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_CHANGE_PASSWORD_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.getPasswordChangeFail(err)).toEqual(expectedAction);
  });

  it("Should start account deletion", () => {
     const expectedAction = {
         type: actions.START_DELETE_ACCOUNT
     };
     expect(actions.startConfirmationDeletion()).toEqual(expectedAction);
  });

  it("Should stop account deletion", () => {
     const expectedAction = {
         type: actions.STOP_DELETE_ACCOUNT
     };
     expect(actions.stopConfirmationDeletion()).toEqual(expectedAction);
  });

  it("Should start confirmed account deletion", () => {
     const expectedAction = {
         type: actions.POST_DELETE_ACCOUNT
     };
     expect(actions.confirmDeletion()).toEqual(expectedAction);
  });

  it("Should POST confirmed account deletion", () => {
     const expectedAction = {
         type: actions.SEND_POST_DELETE_ACCOUNT
     };
     expect(actions.postConfirmDeletion()).toEqual(expectedAction);
  });

  it("Should signal failure when trying to remove the account", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.POST_DELETE_ACCOUNT_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.removeAccountFail(err)).toEqual(expectedAction);
  });

  it("Should start asking U2F description", () => {
    const expectedAction = {
      type: actions.START_ASK_U2F_DESCRIPTION
    };
    expect(actions.startAskU2FDescription()).toEqual(expectedAction);
  });

  it("Should stop asking U2F description", () => {
    const expectedAction = {
      type: actions.STOP_ASK_U2F_DESCRIPTION
    };
    expect(actions.stopAskU2FDescription()).toEqual(expectedAction);
  });

  it("Should start U2F registration", () => {
    const expectedAction = {
      type: actions.START_U2F_REGISTRATION,
      payload: {
          description: 'description'
      }
    };
    expect(actions.startU2fRegistration('description')).toEqual(expectedAction);
  });

  it("Should stop U2F registration", () => {
    const expectedAction = {
      type: actions.STOP_U2F_REGISTRATION,
    };
    expect(actions.stopU2fRegistration()).toEqual(expectedAction);
  });

  it("Should signal failure when trying to enroll for U2F", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_U2F_ENROLL_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.enrollU2FFail(err)).toEqual(expectedAction);
  });

  it("Should signal failure when trying to register for U2F", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_U2F_REGISTER_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.registerU2FFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    credentials: [],
    code: '',
    confirming_change: false,
    confirming_deletion: false,
    location: '',
    deleted: false,
    u2f_asking_description: false,
    u2f_token_description: '',
    u2f_is_fetching: false,
    u2f_failed: false,
    u2f_is_enrolled: false,
    u2f_request: {}
  };

  it("Receives a GET_CREDENTIALS action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CREDENTIALS
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a GET_CREDENTIALS_SUCCESS action", () => {
    const credentials = [
            {
              credential_type: 'password',
              created_ts: '',
              success_ts: ''
            }
          ];
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CREDENTIALS_SUCCESS,
          payload: {
              credentials: credentials
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: credentials,
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a GET_CREDENTIALS_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CREDENTIALS_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: error,
        message: err,
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a START_CHANGE_PASSWORD action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.START_CHANGE_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: true,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a STOP_CHANGE_PASSWORD action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.STOP_CHANGE_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a GET_CHANGE_PASSWORD action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CHANGE_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a GET_CHANGE_PASSWORD_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CHANGE_PASSWORD_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: error,
        message: err,
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a START_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.START_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: true,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a STOP_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.STOP_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT_SUCCESS action", () => {
    const location = 'dummy-location';
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT_SUCCESS,
          payload: {
            location: location
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: location,
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: error,
        message: err,
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a START_ASK_U2F_DESCRIPTION action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.START_ASK_U2F_DESCRIPTION
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: true,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a STOP_ASK_U2F_DESCRIPTION action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.STOP_ASK_U2F_DESCRIPTION
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_asking_description: false,
        u2f_token_description: '',
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a START_U2F_REGISTRATION action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.START_U2F_REGISTRATION,
          payload: {
              description: 'description'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_token_description: 'description',
        u2f_asking_description: false,
        u2f_is_fetching: true,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a STOP_U2F_REGISTRATION action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.STOP_U2F_REGISTRATION
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_token_description: '',
        u2f_asking_description: false,
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a GET_U2F_ENROLL_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_U2F_ENROLL_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: error,
        message: err,
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_token_description: '',
        u2f_asking_description: false,
        u2f_is_fetching: false,
        u2f_failed: true,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a GET_U2F_ENROLL_SUCCESS action", () => {
    const challenge = 'dummy',
          version = 'v2',
          registerRequests = [{challenge: challenge, version: version}],
          appId = 'app-id';
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_U2F_ENROLL_SUCCESS,
          payload: {
            registerRequests: registerRequests,
            appId: appId
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_token_description: '',
        u2f_asking_description: false,
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: true,
        u2f_request: {registerRequests: [{challenge: challenge,
                                           version: version,
                                           appId: appId}],
                      appId: appId}
      }
    );
  });

  it("Receives a GET_U2F_REGISTER_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_U2F_REGISTER_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: error,
        message: err,
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_token_description: '',
        u2f_asking_description: false,
        u2f_is_fetching: false,
        u2f_failed: true,
        u2f_is_enrolled: false,
        u2f_request: {}
      }
    );
  });

  it("Receives a POST_U2F_BIND_SUCCESS action", () => {
    const credentials = [
            {
              credential_type: 'password',
              created_ts: '',
              success_ts: ''
            }
          ];
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_U2F_BIND_SUCCESS,
          payload: {
              credentials: credentials
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        credentials: credentials,
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: '',
        deleted: false,
        u2f_token_description: '',
        u2f_asking_description: false,
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_request: {}
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
  security: {
    location: 'dummy-location',
    u2f_request:{
      registerRequests: [ 'dummy' ]
    },
    u2f_token_remove: 'dummy-key'
  },
  config: {
    csrf_token: 'csrf-token',
    DASHBOARD_URL: '/dummy-dash-url/',
    TOKEN_SERVICE_URL: '/dummy-tok-url/',
    SECURITY_URL: '/dummy-sec-url'
  },
  intl: {
    locale: 'en',
    messages: messages
  }
};

describe("Async component", () => {

  it("Sagas requestCredentials", () => {

      const generator = requestCredentials();

      let next = generator.next();
      expect(next.value).toEqual(put(actions.getCredentials()));

      next = generator.next();
      const config = state => state.config;
      const credentials = generator.next(config);
      expect(credentials.value).toEqual(call(fetchCredentials,config));

      const action = {
        type: actions.GET_CREDENTIALS_SUCCESS,
        payload: {
          csrf_token: 'csrf-token',
          credentials: [
            {
              credential_type: 'password',
              created_ts: '',
              success_ts: ''
            }
          ]
        }
      }
      next = generator.next(action);
      expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
      next = generator.next();
      delete(action.payload.csrf_token);
      expect(next.value).toEqual(put(action));      
  });

  it("Sagas requestPasswordChange", () => {

    const oldLoc = window.location.href;
    let mockWindow = {
      location:{
        href: oldLoc
      }
    };

    const generator = requestPasswordChange(mockWindow);

    let next = generator.next();
    expect(next.value).toEqual(put(actions.stopConfirmationPassword()));

    next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    generator.next(mockState.config);
    expect(mockWindow.location.href).toEqual('/dummy-tok-url/chpass?next=%2Fdummy-dash-url%2Fchpass');
  });

  it("Sagas postDeleteAccount", () => {

    const generator = postDeleteAccount();
    let next = generator.next();
    expect(next.value).toEqual(put(actions.postConfirmDeletion()));

    next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    const data = {
        csrf_token: 'csrf-token'
    };

    next = generator.next(mockState);
    expect(next.value).toEqual(call(deleteAccount, mockState.config, data));


      const action = {
        type: actions.POST_DELETE_ACCOUNT_SUCCESS,
        payload: {
          csrf_token: 'csrf-token',
        }
      }
      next = generator.next(action);
      expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
      next = generator.next();
      delete(action.payload.csrf_token);
      expect(next.value).toEqual(put(action));      
  });

  it("Sagas U2F enroll", () => {

      const generator = getU2FEnroll();
      generator.next();
      let next = generator.next(mockState);
      expect(next.value).toEqual(call(enrollU2F, mockState.config));      
      const action = {
        type: actions.GET_U2F_ENROLL_SUCCESS,
        payload: {
          csrf_token: 'csrf-token',
          u2f_request: 'dummy'
        }
      }
      next = generator.next(action);
      expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
      expect(next.value.PUT.action.payload.csrf_token).toEqual('csrf-token');
      next = generator.next();
      delete(action.payload.csrf_token);
      expect(next.value).toEqual(put(action));      
  });

  it("Sagas U2F register", () => {

      const generator = registerU2F();
      generator.next();
      let next = generator.next(mockState);
      expect(next.value).toEqual(call(register, mockState.security.u2f_request.registerRequests));      
      const response = {
        registrationData: 'dummy-reg-data',
        clientData: 'dummy-client-data'
      };
      const data = {
        ...response,
        version: 'U2F_V2',
        csrf_token: mockState.config.csrf_token
      };
      next = generator.next(response);
      expect(next.value).toEqual(call(postU2FToken, mockState.config, data));
      const action = {
        type: actions.POST_U2F_BIND_SUCCESS,
        payload: {
          csrf_token: mockState.config.csrf_token,
          credentials: [ 'dummy-credentials' ]
        }
      }
      next = generator.next(action);
      expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
      expect(next.value.PUT.action.payload.csrf_token).toEqual('csrf-token');
      next = generator.next();
      delete(action.payload.csrf_token);
      expect(next.value).toEqual(put(action));      
      next = generator.next();
      expect(next.value.PUT.action.type).toEqual('STOP_U2F_REGISTRATION');
  });

  it("Sagas U2F register error", () => {

      const generator = registerU2F();
      generator.next();
      let next = generator.next(mockState);
      expect(next.value).toEqual(call(register, mockState.security.u2f_request.registerRequests));      
      const response = {
        errorCode: 1
      };
      next = generator.next(response);
      expect(next.value.PUT.action.type).toEqual('NEW_NOTIFICATION');
      next = generator.next();
      expect(next.value.PUT.action.type).toEqual('STOP_U2F_REGISTRATION');
  });

  it("Sagas U2F remove token", () => {

    const generator = removeU2FToken();
    let next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    const data = {
        csrf_token: 'csrf-token',
        keyHandle: 'dummy-key'
    };

    next = generator.next(mockState);
    expect(next.value).toEqual(call(removeToken, mockState.config, data));


      const action = {
        type: actions.POST_U2F_REMOVE_SUCCESS,
        payload: {
          csrf_token: 'csrf-token',
        }
      }
      next = generator.next(action);
      expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
      next = generator.next();
      delete(action.payload.csrf_token);
      expect(next.value).toEqual(put(action));      
  });
});


function setupComponent() {
  const props = {
    credentials: [],
    creation_date: '',
    last_used: '',
    language: '',
    langs: [],
    is_fetching: false,
    confirming_change: false,
    confirming_deletion: false,
    u2f_is_fetching: false,
    u2f_is_enrolled: false,
    handleStartConfirmationPassword: mock.fn(),
    handleStopConfirmationPassword: mock.fn(),
    handleConfirmationPassword: mock.fn(),
    handleStartConfirmationDeletion: mock.fn(),
    handleStopConfirmationDeletion: mock.fn(),
    handleConfirmationDeletion: mock.fn(),
    handleStartU2fRegistration: mock.fn()
  };

  const wrapper = shallow(<Provider store={fakeStore(mockState)}>
                             <SecurityContainer {...props} />
                          </Provider>)
  return {
    props,
    wrapper,
  }
}

describe("Security Component", () => {

    it("Renders", () => {
        const {wrapper, props} = setupComponent(),
            table = wrapper.find('table.passwords'),
            buttonChange = wrapper.find('EduIDButton#security-change-button'),
            buttonU2F = wrapper.find('EduIDButton#security-u2f-button'),
            buttonDelete = wrapper.find('EduIDButton#delete-button'),
            modalChange = wrapper.find('GenericConfirmModal'),
            modalU2FDescription = wrapper.find('ConfirmModal'),
            modalDelete = wrapper.find('DeleteModal');
    });
});


describe("Security Container", () => {
  let mockProps,
    language,
    getWrapper,
    getState,
    dispatch,
    store;

  beforeEach(() => {

    getState = function (deleting, askingDescription) {
      return {
        security: {
            is_fetching: false,
            failed: false,
            error: '',
            message: '',
            credentials: [{
                created_ts: "2018-03-28T09:39:11.001371",
                credential_type: "security.u2f_credential_type",
                description: "",
                key: "dummy-key",
                success_ts: "2018-03-28T09:39:11.001371"
            }],
            code: '',
            confirming_change: false,
            confirming_deletion: deleting,
            location: '',
            deleted: false,
            u2f_asking_description: askingDescription,
            u2f_token_description: '',
            u2f_is_fetching: false,
            u2f_failed: false,
            u2f_is_enrolled: false,
            u2f_request: {},
            u2f_token_remove: 'dummy-token'
        },
        config: {
            csrf_token: '',
            SECURITY_URL: '/dummy-sec-url',
            DASHBOARD_URL: '/dummy-dash-url/',
            TOKEN_SERVICE_URL: '/dummy-tok-url/'
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
        credentials: [],
        language: 'en',
        confirming_deletion: false,
        u2f_asking_description: false
    };

    getWrapper = function ({ deleting=false,
                             askingDesc=false,
                             props=mockProps } = {}) {
      store = fakeStore(getState(deleting, askingDesc));
      dispatch = store.dispatch;

      const wrapper = mount(
          <Provider store={store}>
              <SecurityContainer {...props}/>
          </Provider>
      );
      return wrapper;
    };
    language = getWrapper().find(SecurityContainer).props().language;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders test", () => {
      expect(language).toEqual('en');
  });

  it("Clicks change", () => {

    expect(dispatch.mock.calls.length).toEqual(0);
    getWrapper().find('EduIDButton#security-change-button').props().onClick();
    expect(dispatch.mock.calls.length).toEqual(2);
  });

  it("Clicks U2F", () => {

    expect(dispatch.mock.calls.length).toEqual(0);
    const wrapper = getWrapper();
    wrapper.find('EduIDButton#security-u2f-button').simulate('click');
    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(notifyActions.RM_ALL_NOTIFICATION);
    expect(dispatch.mock.calls[1][0].type).toEqual(actions.START_ASK_U2F_DESCRIPTION);
  });

  it("Clicks delete", () => {

    expect(dispatch.mock.calls.length).toEqual(0);
    getWrapper().find('EduIDButton#delete-button').props().onClick();
    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(notifyActions.RM_ALL_NOTIFICATION);
    expect(dispatch.mock.calls[1][0].type).toEqual(actions.START_DELETE_ACCOUNT);
  });

  it("Clicks confirm delete", () => {

    fetchMock.post('/dummy-sec-url',
       {
        type: actions.POST_DELETE_ACCOUNT
      });

    const newProps = {
        credentials: [],
        language: 'en',
        confirming_deletion: true
    };
    const deleteModal = getWrapper(true, false, newProps).find('DeleteModal');
    expect(dispatch.mock.calls.length).toEqual(0);
    deleteModal.props().handleConfirm();
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(actions.POST_DELETE_ACCOUNT);
  });

  it("Clicks remove U2F token", () => {

    const newProps = {
        credentials: [{
            created_ts: "2018-03-28T09:39:11.001371",
            credential_type: "security.u2f_credential_type",
            description: "",
            key: "dummy-key",
            success_ts: "2018-03-28T09:39:11.001371"
        }],
        language: 'en',
        confirming_deletion: false
    };

    expect(dispatch.mock.calls.length).toEqual(0);
    const wrapper = getWrapper(true, newProps);
    const btn = wrapper.find('button.btn-remove-u2f');
    btn.simulate('click');
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0].type).toEqual("POST_U2F_U2F_REMOVE");
  });
});
