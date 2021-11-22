const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import { put, call } from "redux-saga/effects";
import expect from "expect";
import SecurityContainer from "containers/Security";
import * as actions from "actions/Security";
import * as notifyActions from "actions/Notifications";
import securityReducer from "reducers/Security";
import { ReduxIntlProvider } from "components/ReduxIntl";
import {
  requestCredentials,
  fetchCredentials,
  postDeleteAccount,
  deleteAccount,
  beginRegisterWebauthn,
  beginWebauthnRegistration,
  registerWebauthn,
  webauthnRegistration,
  removeWebauthnToken,
  removeToken,
} from "sagas/Security";

const messages = require("../login/translation/messageIndex");

describe("Security Actions", () => {
  it("Should get the credentials ", () => {
    const expectedAction = {
      type: actions.GET_CREDENTIALS,
    };
    expect(actions.getCredentials()).toEqual(expectedAction);
  });

  it("Should fail when trying to get the credentials", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_CREDENTIALS_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.getCredentialsFail(err)).toEqual(expectedAction);
  });

  // it("Should start password change ", () => {
  //   const expectedAction = {
  //     type: actions.START_CHANGE_PASSWORD
  //   };
  //   expect(actions.startConfirmationPassword()).toEqual(expectedAction);
  // });

  // it("Should stop password change ", () => {
  //   const expectedAction = {
  //     type: actions.STOP_CHANGE_PASSWORD
  //   };
  //   expect(actions.stopConfirmationPassword()).toEqual(expectedAction);
  // });

  it("Should really start password change ", () => {
    const expectedAction = {
      type: actions.GET_CHANGE_PASSWORD,
    };
    expect(actions.confirmPasswordChange()).toEqual(expectedAction);
  });

  it("Should fail when trying to change password", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_CHANGE_PASSWORD_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.getPasswordChangeFail(err)).toEqual(expectedAction);
  });

  it("Should start asking WEBAUTHN description", () => {
    const expectedAction = {
      type: actions.START_ASK_WEBAUTHN_DESCRIPTION,
    };
    expect(actions.startAskWebauthnDescription()).toEqual(expectedAction);
  });

  it("Should stop asking WEBAUTHN description", () => {
    const expectedAction = {
      type: actions.STOP_ASK_WEBAUTHN_DESCRIPTION,
    };
    expect(actions.stopAskWebauthnDescription()).toEqual(expectedAction);
  });

  it("Should start WEBAUTHN registration", () => {
    const expectedAction = {
      type: actions.START_WEBAUTHN_REGISTRATION,
      payload: {
        description: "description",
      },
    };
    expect(actions.startWebauthnRegistration("description")).toEqual(expectedAction);
  });

  it("Should signal failure when trying to enroll for WEBAUTHN", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_WEBAUTHN_BEGIN_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.beginWebauthnFail(err)).toEqual(expectedAction);
  });

  it("Should signal failure when trying to register for WEBAUTHN", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_WEBAUTHN_REGISTER_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.registerWebauthnFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    message: "",
    credentials: [],
    code: "",
    confirming_change: false,
    confirming_deletion: false,
    location: "",
    deleted: false,
    webauthn_asking_description: false,
    webauthn_token_description: "",
    webauthn_failed: false,
    webauthn_attestation: {},
    webauthn_token_remove: "",
    webauthn_token_verify: "",
  };

  it("Receives a GET_CREDENTIALS action", () => {
    expect(
      securityReducer(mockState, {
        type: actions.GET_CREDENTIALS,
      })
    ).toEqual({
      message: "",
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_asking_description: false,
      webauthn_token_description: "",
      webauthn_failed: false,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a GET_CREDENTIALS_SUCCESS action", () => {
    const credentials = [
      {
        credential_type: "password",
        created_ts: "",
        success_ts: "",
      },
    ];
    expect(
      securityReducer(mockState, {
        type: actions.GET_CREDENTIALS_SUCCESS,
        payload: {
          credentials: credentials,
        },
      })
    ).toEqual({
      message: "",
      credentials: credentials,
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_asking_description: false,
      webauthn_token_description: "",
      webauthn_failed: false,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a GET_CREDENTIALS_FAIL action", () => {
    const err = "Error";
    // error = new Error(err);
    expect(
      securityReducer(mockState, {
        type: actions.GET_CREDENTIALS_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: err,
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_asking_description: false,
      webauthn_token_description: "",
      webauthn_failed: false,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a START_ASK_WEBAUTHN_DESCRIPTION action", () => {
    expect(
      securityReducer(mockState, {
        type: actions.START_ASK_WEBAUTHN_DESCRIPTION,
      })
    ).toEqual({
      message: "",
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_asking_description: true,
      webauthn_token_description: "",
      webauthn_failed: false,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a STOP_ASK_WEBAUTHN_DESCRIPTION action", () => {
    expect(
      securityReducer(mockState, {
        type: actions.STOP_ASK_WEBAUTHN_DESCRIPTION,
      })
    ).toEqual({
      message: "",
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_asking_description: false,
      webauthn_token_description: "",
      webauthn_failed: false,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a START_WEBAUTHN_REGISTRATION action", () => {
    expect(
      securityReducer(mockState, {
        type: actions.START_WEBAUTHN_REGISTRATION,
        payload: {
          description: "description",
        },
      })
    ).toEqual({
      message: "",
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_token_description: "description",
      webauthn_asking_description: false,
      webauthn_failed: false,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a POST_WEBAUTHN_BEGIN_FAIL action", () => {
    const err = "Error";
    // error = new Error(err);
    expect(
      securityReducer(mockState, {
        type: actions.POST_WEBAUTHN_BEGIN_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: err,
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_token_description: "",
      webauthn_asking_description: false,
      webauthn_failed: true,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a POST_WEBAUTHN_BEGIN_SUCCESS action", () => {
    expect(
      securityReducer(mockState, {
        type: actions.POST_WEBAUTHN_BEGIN_SUCCESS,
        payload: {
          attestation: "dummy-attestation",
        },
      })
    ).toEqual({
      message: "",
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_token_description: "",
      webauthn_asking_description: false,
      webauthn_failed: false,
      webauthn_attestation: "dummy-attestation",
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });

  it("Receives a POST_WEBAUTHN_REGISTER_FAIL action", () => {
    const err = "Error";
    expect(
      securityReducer(mockState, {
        type: actions.POST_WEBAUTHN_REGISTER_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: err,
      credentials: [],
      code: "",
      confirming_change: false,
      confirming_deletion: false,
      location: "",
      deleted: false,
      webauthn_token_description: "",
      webauthn_asking_description: false,
      webauthn_failed: true,
      webauthn_attestation: {},
      webauthn_token_remove: "",
      webauthn_token_verify: "",
    });
  });
});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state }),
});

const mockState = {
  security: {
    location: "dummy-location",
    webauthn_attestation: {
      id: "dummy-id",
      rawId: "dummy-raw-id",
      response: {
        attestationObject: "dummy-attestation-object",
        clientDataJSON: "dummy-client-data",
      },
      type: "public-key",
    },
    webauthn_token_remove: "dummy-key",
    webauthn_token_description: "dummy-description",
    webauthn_authenticator: "cross-platform",
  },
  config: {
    csrf_token: "csrf-token",
    dashboard_url: "/dummy-dash-url/",
    token_service_url: "/dummy-tok-url/",
    security_url: "/dummy-sec-url",
  },
  intl: {
    locale: "en",
    messages: messages,
  },
};

describe("Async component", () => {
  it("Sagas requestCredentials", () => {
    const generator = requestCredentials();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.getCredentials()));

    next = generator.next();
    const config = (state) => state.config;
    const credentials = generator.next(config);
    expect(credentials.value).toEqual(call(fetchCredentials, config));

    const action = {
      type: actions.GET_CREDENTIALS_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        credentials: [
          {
            credential_type: "password",
            created_ts: "",
            success_ts: "",
          },
        ],
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas postDeleteAccount", () => {
    const generator = postDeleteAccount();
    let next = generator.next();
    expect(next.value).toEqual(put(actions.postConfirmDeletion()));

    next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    const data = {
      csrf_token: "csrf-token",
    };

    next = generator.next(mockState);
    expect(next.value).toEqual(call(deleteAccount, mockState.config, data));

    const action = {
      type: actions.POST_DELETE_ACCOUNT_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas WEBAUTHN begin", () => {
    const generator = beginRegisterWebauthn();
    generator.next();
    let next = generator.next(mockState);
    const data = {
      csrf_token: "csrf-token",
      authenticator: "cross-platform",
    };
    expect(next.value).toEqual(call(beginWebauthnRegistration, mockState.config, data));
    const action = {
      type: actions.POST_WEBAUTHN_BEGIN_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        webauthn_attestation: "dummy",
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual(actions.POST_WEBAUTHN_BEGIN_SUCCESS);
  });

  it("Sagas WEBAUTHN register", () => {
    const generator = registerWebauthn();
    generator.next();
    let next = generator.next(mockState);
    const attestation = mockState.security.webauthn_attestation;
    const data = {
      attestationObject: btoa(String.fromCharCode.apply(null, new Uint8Array(attestation.response.attestationObject))),
      clientDataJSON: btoa(String.fromCharCode.apply(null, new Uint8Array(attestation.response.clientDataJSON))),
      credentialId: attestation.id,
      description: mockState.security.webauthn_token_description,
      csrf_token: mockState.config.csrf_token,
    };
    expect(next.value).toEqual(call(webauthnRegistration, mockState.config, data));
    const action = {
      type: actions.POST_WEBAUTHN_REGISTER_SUCCESS,
      payload: {
        csrf_token: mockState.config.csrf_token,
        credentials: ["dummy-credentials"],
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    expect(next.value.PUT.action.payload.csrf_token).toEqual("csrf-token");
    delete action.payload.csrf_token;
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual(actions.POST_WEBAUTHN_REGISTER_SUCCESS);
  });

  it("Sagas WEBAUTHN register error", () => {
    const generator = registerWebauthn();
    generator.next();
    let next = generator.next(mockState);
    const attestation = mockState.security.webauthn_attestation;
    const data = {
      attestationObject: btoa(String.fromCharCode.apply(null, new Uint8Array(attestation.response.attestationObject))),
      clientDataJSON: btoa(String.fromCharCode.apply(null, new Uint8Array(attestation.response.clientDataJSON))),
      credentialId: attestation.id,
      description: mockState.security.webauthn_token_description,
      csrf_token: mockState.config.csrf_token,
    };
    expect(next.value).toEqual(call(webauthnRegistration, mockState.config, data));
    const action = {
      type: actions.POST_WEBAUTHN_REGISTER_SUCCESS,
      error: true,
      payload: {
        csrf_token: mockState.config.csrf_token,
        message: "error",
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    delete action.payload.csrf_token;
    next = generator.next();
    expect(next.value.PUT.action.type).toEqual(actions.POST_WEBAUTHN_REGISTER_SUCCESS);
  });

  it("Sagas WEBAUTHN remove token", () => {
    const generator = removeWebauthnToken();
    let next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    const data = {
      csrf_token: "csrf-token",
      credential_key: "dummy-key",
    };

    next = generator.next(mockState);
    expect(next.value).toEqual(call(removeToken, mockState.config, data));

    const action = {
      type: actions.POST_WEBAUTHN_REMOVE_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});

describe("Security Container", () => {
  let mockProps, language, getWrapper, getState, dispatch, store;

  beforeEach(() => {
    getState = function (deleting, askingDescription) {
      return {
        security: {
          message: "",
          credentials: [
            {
              created_ts: "2018-03-28T09:39:11.001371",
              credential_type: "security.webauthn_credential_type",
              description: "",
              key: "dummy-key",
              success_ts: "2018-03-28T09:39:11.001371",
            },
            {
              created_ts: "2018-03-28T09:39:11.001371",
              credential_type: "security.webauthn_credential_type",
              description: "",
              key: "dummy-key-2",
              success_ts: "2018-03-28T09:39:11.001371",
            },
          ],
          code: "",
          confirming_change: false,
          confirming_deletion: deleting,
          location: "",
          deleted: false,
          webauthn_asking_description: askingDescription,
          webauthn_token_description: "",
          webauthn_failed: false,
          webauthn_attestation: {},
          webauthn_token_remove: "dummy-token",
        },
        config: {
          csrf_token: "",
          security_url: "/dummy-sec-url",
          dashboard_url: "/dummy-dash-url/",
          token_service_url: "/dummy-tok-url/",
        },
        intl: {
          locale: "en",
          messages: messages,
        },
        notifications: {
          messages: [],
          errors: [],
        },
      };
    };

    mockProps = {
      credentials: [],
      language: "en",
      confirming_deletion: false,
      webauthn_asking_description: false,
    };

    getWrapper = function ({ deleting = false, askingDesc = false, props = mockProps } = {}) {
      store = fakeStore(getState(deleting, askingDesc));
      dispatch = store.dispatch;

      const wrapper = mount(
        <ReduxIntlProvider store={store}>
          <SecurityContainer {...props} />
        </ReduxIntlProvider>
      );
      return wrapper;
    };
    language = getWrapper().find(SecurityContainer).props().language;
  });

  it("Renders test", () => {
    expect(language).toEqual("en");
  });

  // it("Clicks change", () => {
  //   expect(dispatch.mock.calls.length).toEqual(0);
  //   getWrapper()
  //     .find("EduIDButton#security-change-button")
  //     .props()
  //     .onClick();
  //   expect(dispatch.mock.calls.length).toEqual(2);
  // });

  it("Clicks WEBAUTHN", () => {
    expect(dispatch.mock.calls.length).toEqual(0);
    const wrapper = getWrapper();
    wrapper.find("button#security-webauthn-button").simulate("click");
    expect(dispatch.mock.calls.length).toEqual(3);
    expect(dispatch.mock.calls[0][0].type).toEqual(notifyActions.RM_ALL_NOTIFICATION);
    expect(dispatch.mock.calls[1][0].type).toEqual(actions.AUTHENTICATOR);
    expect(dispatch.mock.calls[2][0].type).toEqual(actions.START_ASK_WEBAUTHN_DESCRIPTION);
  });

  it("Clicks remove WEBAUTHN token", () => {
    const newProps = {
      credentials: [
        {
          created_ts: "2018-03-28T09:39:11.001371",
          credential_type: "security.webauthn_credential_type",
          description: "",
          key: "dummy-key",
          success_ts: "2018-03-28T09:39:11.001371",
        },
        {
          created_ts: "2018-03-28T09:39:11.001371",
          credential_type: "security.webauthn_credential_type",
          description: "",
          key: "dummy-key-2",
          success_ts: "2018-03-28T09:39:11.001371",
        },
      ],
      language: "en",
      confirming_deletion: false,
    };

    expect(dispatch.mock.calls.length).toEqual(0);
    const wrapper = getWrapper(true, newProps);
    const btn = wrapper.find("button.btn-remove-webauthn").first();
    btn.simulate("click");
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0].type).toEqual("POST_WEBAUTHN_WEBAUTHN_REMOVE");
  });
});
