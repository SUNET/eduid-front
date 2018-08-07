
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux';
import { mount } from '@pisano/enzyme';
import expect from "expect";
import { put, call, select } from "redux-saga/effects";

import { genSetupComponent, getState } from "tests/ActionWrapper-test";
import MainContainer from "./component";
import { actionReducer } from "./store";
import * as actions from "actions/ActionWrapper";
import { U2FDATA_SIGNED } from "./component";

const pluginState = {
    token_response: {}
};

const setupComponent = genSetupComponent(pluginState);

describe("Some Component", () => {

    it("Renders the splash screen", () => {
        const wrapper = setupComponent({component: <MainContainer />,
                                        overrides: {main: {is_app_loaded: false}}}),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(1);
    });

    it("Renders", () => {
        const wrapper = setupComponent({component: <MainContainer />}),
              splash = wrapper.find('div#eduid-splash-screen'),
              title = wrapper.find('div.u2f-title'),
              subtitle = wrapper.find('div.u2f-subtitle'),
              animation = wrapper.find('div.key-animation');

        expect(splash.length).toEqual(0);
        expect(title.length).toEqual(1);
        expect(subtitle.length).toEqual(1);
        expect(animation.length).toEqual(1);
        expect(title.text()).toEqual('Two-factor authentication');
    });
});

describe("Some action reducer", () => {

    const mockState = {
        token_response: ''
    };

    it("Receives plugin config loaded action", () => {
        expect(
            actionReducer(
                mockState,
                {
                    type: "U2FDATA_SIGNED",
                    payload: {
                        data: 'dummy response'
                    }
                }
            )
        ).toEqual(
          {
              ...mockState,
              token_response: 'dummy response'
          }
        );
    });
});

describe("Some plugin async actions", () => {

    it("Tests some saga", () => {

    });
});
