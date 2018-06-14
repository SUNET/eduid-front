
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux';
import { mount } from '@pisano/enzyme';
import expect from "expect";

import MainContainer from "containers/Main";
import * as actions from "actions/Main";

import { addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

addLocaleData([...en, ...sv])


const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
});

export function setupComponent(component, overrides={}) {
    const fakeState = {
        main: {
            dashboard_url: '',
            resize_timeout: 0,
            window_size: actions.getWindowSize(),
            csrf_token: '',
            recaptcha_public_key: '',
            captcha: '',
            code: '',
            tou: '',
            is_app_loaded: true,
            is_fetching: false,
            error: false,
            DEBUG: true,
            available_languages: {}
        },
        captcha: {
            captcha_verification: ''
        },
        verified: {
            password: '',
            eppn: '',
            nonce: '',
            timestamp: '',
            auth_token: '',
            email: '',
            status: '',
            dashboard_url: '',
            gotten: false
        },
        email: {
            email: '',
            acceptingTOU: false,
            tou_accepted: false
        },
        notifications: {
            messages: [],
            warnings: [],
            errors: []
        },
        intl: {
            locale: 'en',
            messages: {
                'en': en,
                'sv': sv
            }
        }
    };
    Object.getOwnPropertyNames(fakeState).forEach(propName => {
        const overriddenProps = Object.getOwnPropertyNames(overrides);
        if (overriddenProps.includes(propName)) {
            fakeState[propName] = {
                ...fakeState[propName],
                ...overrides[propName]
            }
        }
    });
    const store = fakeStore(fakeState);
    const wrapper = mount(<Provider store={ store }>
                              {component}
                          </Provider>);
    return wrapper;
}

describe("Main Component", () => {

    it("Renders the splash screen", () => {
        const wrapper = setupComponent(<MainContainer />, {main: {is_app_loaded: false}}),
              splash = wrapper.find('div#eduid-splash-screen'),
              router = wrapper.find('ConnectedRouter'),
              routes = wrapper.find('Route');

        expect(splash.length).toEqual(1);
        expect(router.length).toEqual(1);
        expect(routes.length).toEqual(7);
    });

    it("Doesn't Render the splash screen", () => {
        const wrapper = setupComponent(<MainContainer />),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(0);
    });

    it("Renders the email form", () => {
        const wrapper = setupComponent(<MainContainer />),
              splash = wrapper.find('div#eduid-splash-screen'),
              router = wrapper.find('ConnectedRouter'),
              routes = wrapper.find('Route');

        expect(splash.length).toEqual(0);
        expect(router.length).toEqual(1);
        expect(routes.length).toEqual(7);
    });
});

describe("Main Actions", () => {

    it("Should get code status ", () => {
        const expectedAction = {
            type: actions.GET_CODE_STATUS,
            payload: {
                code: 'dummy code'               
            }
        };
        expect(actions.getCodeStatus('dummy code')).toEqual(expectedAction);
    });

    it("Should signal the app has loaded", () => {
        const expectedAction = {
            type: actions.APP_LOADED,
        };
        expect(actions.appLoaded()).toEqual(expectedAction);
    });

    it("Should timeout the resizing", () => {
      const expectedAction = {
          type: actions.RESIZE_TIMEOUT,
          payload: {
              resize_timeout: 'dummy timeout'
          }
      };
      expect(actions.resizeTimeout('dummy timeout')).toEqual(expectedAction);
    });

    it("Should resize the app", () => {
      const expectedAction = {
          type: actions.RESIZE_WINDOW,
          payload: {
              window_size: 'dummy size'
          }
      };
      expect(actions.resizeWindow(true)).toEqual(expectedAction);
    });

    it("Should get the config", () => {
        const expectedAction = {
            type: actions.GET_SIGNUP_CONFIG,
        };
        expect(actions.getConfig()).toEqual(expectedAction);
    });

    it("Should fail when trying to get the config", () => {
        const err = new Error('Get config error');
        const expectedAction = {
            type: actions.GET_SIGNUP_CONFIG_FAIL,
            error: true,
            payload: {
                error: err,
                message: err
            }
        };
        expect(actions.getConfigFail(err)).toEqual(expectedAction);
    });

    it("Should store a new csrf token", () => {
        const expectedAction = {
            type: actions.NEW_CSRF_TOKEN,
            payload: {
                csrf_token: 'dummy token'
            }
        };
        expect(actions.newCsrfToken('dummy token')).toEqual(expectedAction);
    });
});
