
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux';
import { mount } from 'enzyme';
import expect from "expect";
import { put, call, select } from "redux-saga/effects";

import { genSetupComponent, getState } from "tests/ActionWrapper-test";
import MainContainer from "./component";
import { actionReducer } from "./store";
import * as actions from "actions/ActionWrapper";
import { postCompleteWebauthn, requestCompleteWebauthn } from "./root-saga";

const pluginState = {
    webauthn_assertion: {}
};

const setupComponent = genSetupComponent(pluginState);

describe("Some Component", () => {

    it("Renders the splash screen", () => {
        const wrapper = setupComponent({component: <MainContainer />,
                                        overrides: {config: {is_app_loaded: false}}}),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(1);
    });

    it("Renders", () => {
        const wrapper = setupComponent({component: <MainContainer />}),
              splash = wrapper.find('div#eduid-splash-screen'),
              title = wrapper.find('div.webauthn-title'),
              subtitle = wrapper.find('div.webauthn-subtitle'),
              animation = wrapper.find('div.key-animation');

        expect(splash.length).toEqual(0);
        expect(title.length).toEqual(1);
        expect(subtitle.length).toEqual(1);
        expect(animation.length).toEqual(1);
        expect(title.text()).toEqual('Two-factor authentication');
    });

    it("Renders no webauthn", () => {
        const creds = window.navigator.credentials;
        Object.defineProperty(window.navigator, 'credentials', {value: undefined, configurable: true});

        const wrapper = setupComponent({component: <MainContainer />}),
              splash = wrapper.find('div#eduid-splash-screen'),
              title = wrapper.find('div.webauthn-title'),
              subtitle = wrapper.find('div.webauthn-subtitle'),
              animation = wrapper.find('div.key-animation');

        expect(splash.length).toEqual(0);
        expect(title.length).toEqual(1);
        expect(subtitle.length).toEqual(1);
        expect(animation.length).toEqual(0);
        expect(title.text()).toEqual('No support for security keys');

        Object.defineProperty(window.navigator, 'credentials', {value: creds, configurable: true});
    });
});

describe("Some action reducer", () => {

    const mockState = {
        webauthn_assertion: {}
    };

    it("Receives plugin config loaded action", () => {
        expect(
            actionReducer(
                mockState,
                {
                    type: "WEBAUTHN_CREDS_GOT",
                    payload: {
                        dummy: 'assertion'
                    }
                }
            )
        ).toEqual(
          {
              ...mockState,
              webauthn_assertion: {dummy: 'assertion'},
          }
        );
    });
});

describe("Some plugin async actions", () => {

    it("Tests post webauthn response saga", () => {

        const assertion = {
            rawId: new TextEncoder("utf-8").encode('dummy-id').buffer,
            response: {
                authenticatorData: new TextEncoder("utf-8").encode('dummy authn data').buffer,
                clientDataJSON: new TextEncoder("utf-8").encode('dummy json').buffer,
                signature: new TextEncoder("utf-8").encode('dummy signature').buffer
            }
        },
              state = getState({
                  config: {
                      csrf_token: 'dummy-token',
                      webauthn_options: '',
                  },
                  plugin: {
                      webauthn_assertion: assertion
                  }
              });
        const data = {
            csrf_token: state.config.csrf_token,
            credentialId: assertion.rawId,
            authenticatorData: assertion.response.authenticatorData,
            clientDataJSON: assertion.response.clientDataJSON,
            signature: assertion.response.signature
        };
        const generator = postCompleteWebauthn();
        generator.next();
        let resp = generator.next(state);
        expect(resp.value).toEqual(call(requestCompleteWebauthn, data));
        const action = {
            type: actions.POST_ACTIONS_ACTION_SUCCESS,
            payload: {
                csrf_token: 'csrf-token'
            }
        };
        generator.next(action);
        resp = generator.next();
        delete action.payload.csrf_token;
        resp = generator.next();
        expect(resp.value).toEqual(put(action));
    });
});
