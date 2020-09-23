const mock = require("jest-mock");
import React from "react";
import { Provider } from "react-intl-redux";
import { mount } from "enzyme";
import expect from "expect";
import { put, call, select } from "redux-saga/effects";

import EduIDButton from "components/EduIDButton";
import ActionMainContainer from "containers/ActionMain";
import * as actions from "actions/ActionMain";
import actionMainReducer from "reducers/ActionMain";
import {
  requestConfig,
  requestNextAction,
  fetchActions,
  fetchConfig
} from "sagas/ActionMain";

import { addLocaleData } from "react-intl";

import en from "react-intl/locale-data/en";
import sv from "react-intl/locale-data/sv";

addLocaleData([...en, ...sv]);

const fakeState = {
  config: {
    csrf_token: "",
    is_app_loaded: true,
    redirect: "/",
    //is_fetching: false,
    available_languages: []
  },
  notifications: {
    messages: [],
    errors: []
  },
  intl: {
    locale: "en",
    messages: {
      en: en,
      sv: sv
    }
  },
  plugin: {}
};

export const getState = (overrides = {}) => {
  const refakeState = { ...fakeState };
  Object.getOwnPropertyNames(fakeState).forEach(propName => {
    const overriddenProps = Object.getOwnPropertyNames(overrides);
    if (overriddenProps.includes(propName)) {
      refakeState[propName] = {
        ...fakeState[propName],
        ...overrides[propName]
      };
    }
  });
  return refakeState;
};

export const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

export function genSetupComponent(pluginState) {
  const setupComponent = function({ component, overrides, store } = {}) {
    if (store === undefined) {
      if (overrides === undefined) {
        overrides = {};
      }
      if (pluginState !== undefined) {
        if (overrides.plugin === undefined) {
          overrides.plugin = pluginState;
        } else {
          overrides.plugin = {
            ...pluginState,
            ...overrides.plugin
          };
        }
      }
      store = fakeStore(getState(overrides));
    }
    const wrapper = mount(<Provider store={store}>{component}</Provider>);
    return wrapper;
  };
  return setupComponent;
}

export const setupComponent = genSetupComponent();

describe("ActionMain Component", () => {
  it("Renders the splash screen", () => {
    const wrapper = setupComponent({
        component: <ActionMainContainer />,
        overrides: { config: { is_app_loaded: false } }
      }),
      splash = wrapper.find("div#eduid-splash-screen"),
      router = wrapper.find("Router"),
      routes = wrapper.find("Route");

    expect(splash.length).toEqual(1);
    expect(router.length).toEqual(1);
    expect(routes.length).toEqual(1);
  });

  it("Doesn't Render the splash screen", () => {
    const wrapper = setupComponent({ component: <ActionMainContainer /> }),
      splash = wrapper.find("div#eduid-splash-screen"),
      spinner = wrapper.find("div.spin-holder");

    expect(splash.length).toEqual(0);
    expect(spinner.length).toEqual(0);
  });

  //it("Is fetching", () => {
  //const button = mount(<EduIDButton id="test-button">button</EduIDButton>),
  //comp = (<ActionWrapperContainer>
  //{button}
  //</ActionWrapperContainer>),
  //params = {component: comp,
  //overrides: {config: {is_fetching: true}}},
  //wrapper = setupComponent(params),
  //spinner = wrapper.find('div.spin-holder');

  //expect(spinner.length).toEqual(1);
  //});
});

describe("ActionMain Actions", () => {

  //it("Should signal the app is fetching data", () => {
    //const expectedAction = {
      //type: actions.APP_FETCHING
    //};
    //expect(actions.appFetching()).toEqual(expectedAction);
  //});

  it("Should get the config", () => {
    const expectedAction = {
      type: actions.GET_ACTIONS_CONFIG
    };
    expect(actions.getConfig()).toEqual(expectedAction);
  });

  it("Should fail when trying to get the config", () => {
    const err = "Get config error";
    const expectedAction = {
      type: actions.GET_ACTIONS_CONFIG_FAIL,
      error: true,
      payload: {
        message: err
      }
    };
    expect(actions.getConfigFail(err)).toEqual(expectedAction);
  });

  it("Should post action data", () => {
    const expectedAction = {
      type: actions.POST_ACTIONS_ACTION
    };
    expect(actions.postAction()).toEqual(expectedAction);
  });

  it("Should fail when trying to post action data", () => {
    const err = "Post action error";
    const expectedAction = {
      type: actions.POST_ACTIONS_ACTION_FAIL,
      error: true,
      payload: {
        message: err
      }
    };
    expect(actions.postActionFail(err)).toEqual(expectedAction);
  });

  it("Should store a new csrf token", () => {
    const expectedAction = {
      type: actions.NEW_CSRF_TOKEN,
      payload: {
        csrf_token: "dummy token"
      }
    };
    expect(actions.newCsrfToken("dummy token")).toEqual(expectedAction);
  });

  it("Should redirect", () => {
    const expectedAction = {
      type: actions.REDIRECT,
      payload: {
        path: "dummy/path"
      }
    };
    expect(actions.redirect("dummy/path")).toEqual(expectedAction);
  });
});

describe("ActionMain reducer", () => {
  const mockState = {
    csrf_token: "",
    is_app_loaded: false,
    redirect: "/",
    //is_fetching: false,
    available_languages: []
  };

  //it("Receives app fetching action", () => {
    //expect(
      //actionWrapperReducer(mockState, {
        //type: actions.APP_FETCHING
      //})
    //).toEqual({
      //...mockState,
      ////is_fetching: true
    //});
  //});

  it("Receives app loaded action", () => {
    expect(
      actionMainReducer(mockState, {
        type: actions.APP_LOADED
      })
    ).toEqual({
      ...mockState,
      is_app_loaded: true
    });
  });

  it("Receives get config sucessful action", () => {
    expect(
      actionMainReducer(mockState, {
        type: actions.GET_ACTIONS_CONFIG_SUCCESS,
        payload: {
          plugin_setting: "dummy setting"
        }
      })
    ).toEqual({
      ...mockState,
      plugin_setting: "dummy setting"
    });
  });

  it("Receives new csrf token", () => {
    expect(
      actionMainReducer(mockState, {
        type: actions.NEW_CSRF_TOKEN,
        payload: {
          csrf_token: "dummy token"
        }
      })
    ).toEqual({
      ...mockState,
      csrf_token: "dummy token"
    });
  });

  it("Receives a redirect action", () => {
    expect(
      actionMainReducer(mockState, {
        type: actions.REDIRECT,
        payload: {
          path: "dummy path"
        }
      })
    ).toEqual({
      ...mockState,
      redirect: "dummy path"
    });
  });
});

window.ACTIONS_SERVICE_URL = "/services/actions2/";

describe("ActionMain async actions", () => {
  it("Tests the request config saga", () => {
    const state = getState({
      config: {
        csrf_token: "dummy-token"
      }
    });
    const url = ACTIONS_SERVICE_URL + "config";
    const generator = requestConfig();
    let resp = generator.next();
    expect(resp.value).toEqual(call(fetchConfig, url));

    const action = {
      type: actions.GET_ACTIONS_CONFIG_SUCCESS,
      payload: {
        csrf_token: "csrf-token"
      }
    };
    resp = generator.next(action);
    expect(resp.value.PUT.action.type).toEqual(actions.NEW_CSRF_TOKEN);
    delete action.payload.csrf_token;
    resp = generator.next();
    expect(resp.value.PUT.action.type).toEqual(
      actions.GET_ACTIONS_CONFIG_SUCCESS
    );
    resp = generator.next();
    expect(resp.value).toEqual(put(actions.appLoaded()));
  });

  it("Tests the request next action saga", () => {
    const state = getState({
      config: {
        csrf_token: "dummy-token"
      }
    });
    const url = ACTIONS_SERVICE_URL + "get-actions";
    const generator = requestNextAction();
    let resp = generator.next();
    expect(resp.value).toEqual(call(fetchActions, url));

    const action = {
      action: false,
      url: "http://example.com",
      payload: {
        csrf_token: "csrf-token"
      }
    };
    resp = generator.next(action);
    expect(resp.value.PUT.action.type).toEqual(actions.NEW_CSRF_TOKEN);
  });
});
