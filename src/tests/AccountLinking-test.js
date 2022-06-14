const mock = require("jest-mock");
import * as actions from "actions/AccountLinking";
import { storeCsrfToken } from "commonConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import AccountLinkingContainer from "containers/AccountLinking";
import { mount } from "enzyme";
import expect from "expect";
import React from "react";
import accountlinkingReducer from "reducers/AccountLinking";
import { call, put } from "redux-saga/effects";
import { fetchOrcid, removeOrcid, requestConnectOrcid, requestOrcid, requestRemoveOrcid } from "sagas/AccountLinking";

const messages = require("../login/translation/messageIndex");

describe("AccountLinking Actions", () => {
  it("Should get orcid ", () => {
    const expectedAction = {
      type: actions.GET_ORCID,
    };
    expect(actions.getOrcid()).toEqual(expectedAction);
  });

  it("Should fail when trying to get orcid", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_ORCID_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.getOrcidFail(err)).toEqual(expectedAction);
  });

  it("Should start orcid connect ", () => {
    const expectedAction = {
      type: actions.GET_ORCID_CONNECT,
    };
    expect(actions.startOrcidConnect()).toEqual(expectedAction);
  });

  it("Should start orcid remove ", () => {
    const expectedAction = {
      type: actions.POST_ORCID_REMOVE,
    };
    expect(actions.startOrcidRemove()).toEqual(expectedAction);
  });

  it("Should fail when trying to remove orcid", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_ORCID_REMOVE_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.startOrcidRemoveFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    message: "",
    orcid: {},
  };

  it("Receives a GET_ORCID action", () => {
    expect(
      accountlinkingReducer(mockState, {
        type: actions.GET_ORCID,
      })
    ).toEqual({
      message: "",
      orcid: {},
    });
  });

  it("Receives a GET_PERSONAL_DATA_ORCID_SUCCESS action", () => {
    const orcid = {
      id: "https://sandbox.orcid.org/0000-0000-0000-0000",
      name: null,
      given_name: "Test",
      family_name: "Testsson",
    };
    expect(
      accountlinkingReducer(mockState, {
        type: actions.GET_PERSONAL_DATA_ORCID_SUCCESS,
        payload: {
          orcid: orcid,
        },
      })
    ).toEqual({
      message: "",
      orcid: orcid,
    });
  });

  it("Receives a GET_ORCID_FAIL action", () => {
    const err = "Error";
    expect(
      accountlinkingReducer(mockState, {
        type: actions.GET_ORCID_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: err,
      orcid: {},
    });
  });

  it("Receives a POST_ORCID_REMOVE action", () => {
    expect(
      accountlinkingReducer(mockState, {
        type: actions.POST_ORCID_REMOVE,
      })
    ).toEqual({
      message: "",
      orcid: {},
    });
  });

  it("Receives a POST_ORCID_REMOVE_SUCCESS action", () => {
    expect(
      accountlinkingReducer(mockState, {
        type: actions.POST_ORCID_REMOVE_SUCCESS,
      })
    ).toEqual({
      message: "",
      orcid: {},
    });
  });

  it("Receives a POST_ORCID_REMOVE_FAIL action", () => {
    const err = "Error";
    expect(
      accountlinkingReducer(mockState, {
        type: actions.POST_ORCID_REMOVE_FAIL,
        error: true,
        payload: {
          message: err,
        },
      })
    ).toEqual({
      message: err,
      orcid: {},
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
  account_linking: {
    message: "",
    orcid: {},
  },
  config: {
    csrf_token: "csrf-token",
    orcid_url: "/dummy-orcid-url/",
  },
  intl: {
    locale: "en",
    messages: messages,
  },
};

describe("Async component", () => {
  it("Sagas requestOrcid", () => {
    const generator = requestOrcid();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.getOrcid()));

    next = generator.next();
    const config = (state) => state.config;
    const orcid = generator.next(config);
    expect(orcid.value).toEqual(call(fetchOrcid, config));

    const action = {
      type: actions.GET_PERSONAL_DATA_ORCID_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        orcid: {
          id: "https://sandbox.orcid.org/0000-0000-0000-0000",
          name: null,
          given_name: "Test",
          family_name: "Testsson",
        },
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual(storeCsrfToken.type);
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas requestConnectOrcid", () => {
    const oldLoc = window.location.href;
    let mockWindow = {
      location: {
        href: oldLoc,
      },
    };

    const generator = requestConnectOrcid(mockWindow);

    let next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    generator.next(mockState.config);
    expect(mockWindow.location.href).toEqual("/dummy-orcid-url/authorize");
  });

  it("Sagas requestRemoveOrcid", () => {
    const generator = requestRemoveOrcid();
    let next = generator.next();

    expect(next.value.SELECT.args).toEqual([]);

    const data = {
      csrf_token: "csrf-token",
    };

    next = generator.next(mockState.config);
    expect(next.value).toEqual(call(removeOrcid, mockState.config, data));

    const action = {
      type: actions.POST_ORCID_REMOVE_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual(storeCsrfToken.type);
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});

describe("AccountLinking Component", () => {
  it("Renders", () => {
    // const { wrapper } = setupComponent(),
    //   intro = wrapper.find("div.intro"),
    //   orcid = wrapper.find("div.orcid");
  });
});

describe("AccountLinking Container", () => {
  let mockProps, language, getWrapper, getState, dispatch, store;

  beforeEach(() => {
    getState = function () {
      return {
        account_linking: {
          message: "",
          orcid: {
            id: "https://sandbox.orcid.org/0000-0000-0000-0000",
            name: null,
            given_name: "Test",
            family_name: "Testsson",
          },
        },
        config: {
          csrf_token: "csrf-token",
          orcid_url: "/dummy-orcid-url/",
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
      orcid: {},
      language: "en",
    };

    getWrapper = function ({ props = mockProps } = {}) {
      store = fakeStore(getState());
      dispatch = store.dispatch;

      const wrapper = mount(
        <ReduxIntlProvider store={store}>
          <AccountLinkingContainer {...props} />
        </ReduxIntlProvider>
      );
      return wrapper;
    };
    language = getWrapper().find(AccountLinkingContainer).props().language;
  });

  it("Renders test", () => {
    expect(language).toEqual("en");
  });

  it("Clicks remove orcid", () => {
    expect(dispatch.mock.calls.length).toEqual(0);
    getWrapper().find("EduIDButton#remove-orcid-button").props().onClick();
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(actions.POST_ORCID_REMOVE);
  });
});
