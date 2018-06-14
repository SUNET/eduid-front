
import React from 'react';
import expect from "expect";

import { setupComponent } from "tests/Main-test";
import NotificationsContainer from "containers/Notifications";
import * as actions from "actions/Notifications";


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


describe("Notification Actions", () => {

    it("Should add new notification ", () => {
        const expectedAction = {
            type: actions.NEW_NOTIFICATION,
            payload: {
                message: 'dummy message',
                level: 'dummy level',
                values: null
            }
        };
        expect(actions.eduidNotify('dummy message', 'dummy level')).toEqual(expectedAction);
    });

    it("Should remove a notification ", () => {
        const expectedAction = {
            type: actions.RM_NOTIFICATION,
            payload: {
                level: 'dummy level',
                index: 0
            }
        };
        expect(actions.eduidRMNotify('dummy level', 0)).toEqual(expectedAction);
    });

    it("Should remove all notifications", () => {
        const expectedAction = {
            type: actions.RM_ALL_NOTIFICATION,
        };
        expect(actions.eduidRMAllNotify()).toEqual(expectedAction);
    });
});
