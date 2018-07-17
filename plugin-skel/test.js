
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

const pluginState = {
    // central state.plugin for testing
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
    });
});

describe("Some action reducer", () => {

    const mockState = {
    };

    it("Receives plugin config loaded action", () => {
        expect(
            actionReducer(
                mockState,
                {
                    type: actions.GET_ACTIONS_CONFIG_SUCCESS,
                    payload: {
                        // some payload
                    }
                }
            )
        ).toEqual(
          {
              ...mockState,
              // whatever the payload is reduced to
          }
        );
    });
});

describe("Some plugin async actions", () => {

    it("Tests some saga", () => {

    });
});
