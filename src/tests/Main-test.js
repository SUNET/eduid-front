
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
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(1);
    });

    it("Doesn't Render the splash screen", () => {
        const wrapper = setupComponent(<MainContainer />),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(0);
    });
});
