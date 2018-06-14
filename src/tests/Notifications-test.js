
import React from 'react';
import expect from "expect";

import NotificationsContainer from "containers/Notifications";
import { setupComponent } from "tests/Main-test";


describe("Notifications Component", () => {

    const state = {
        main: {
            debug: true
        },
        notifications: {
            messages: [{msg: 'dummy message', vals: null}],
            warnings: [],
            errors: []
        }
    };

    it("Renders the notifications component", () => {

        const wrapper = setupComponent(<NotificationsContainer />, state),
              alertElem = wrapper.find('Alert');

        expect(alertElem.length).toEqual(1);
        expect(alertElem.props().color).toEqual('success');
        expect(alertElem.text()).toContain('dummy message');
    });

    const prodState = {
        main: {
          debug: false,
        },
        notifications: {
            ...state.notifications
        }
    };

    it("Renders the notifications component - prod", () => {

        const wrapper = setupComponent(<NotificationsContainer />, prodState),
              alertElem = wrapper.find('Alert');

        expect(alertElem.length).toEqual(1);
        expect(alertElem.props().color).toEqual('success');
        expect(alertElem.text()).not.toContain('dummy message');
    });

    const warnState = {
        main: {
            ...state.main,
        },
        notifications: {
            messages: [],
            warnings: [{msg: 'dummy warning', vals: null}],
            errors: []
        }
    };

    it("Renders the notifications component - warning", () => {

        const wrapper = setupComponent(<NotificationsContainer />, warnState),
              alertElem = wrapper.find('Alert');

        expect(alertElem.length).toEqual(1);
        expect(alertElem.props().color).toEqual('warning');
        expect(alertElem.text()).toContain('dummy warning');
    });

    const errorState = {
        main: {
            ...state.main,
        },
        notifications: {
            messages: [],
            warnings: [],
            errors: [{msg: 'dummy error', vals: null}]
        }
    };

    it("Renders the notifications component - error", () => {

        const wrapper = setupComponent(<NotificationsContainer />, errorState),
              alertElem = wrapper.find('Alert');

        expect(alertElem.length).toEqual(1);
        expect(alertElem.props().color).toEqual('danger');
        expect(alertElem.text()).toContain('dummy error');
    });
});

