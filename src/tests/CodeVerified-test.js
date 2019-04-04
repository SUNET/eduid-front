
import React from 'react';
import expect from "expect";

import { setupComponent, fakeStore, getState } from "tests/Main-test";
import CodeVerifiedContainer from "containers/CodeVerified";
import * as actions from "actions/CodeVerified";
import verifiedReducer from "reducers/CodeVerified";


describe("CodeVerified Component", () => {

    const state = {
        verified: {
          dashboard_url: 'http://dummy.example.com',
          password: 'dummy-passwd',
          email: 'dummy@example.com',
          status: 'verified',
          gotten: false
        }
    };

    it("Renders the code verified component", () => {

        const wrapper = setupComponent({component: <CodeVerifiedContainer />,
                                        overrides: state}),
              lead = wrapper.find('p.lead'),
              completed = wrapper.find('p.registration-completed'),
              passwd = wrapper.find('pre.pre-big'),
              buttons = wrapper.find('EduIDButton');

        expect(lead.length).toEqual(2);
        expect(completed.text()).toContain('dummy@example.com');
        expect(passwd.length).toEqual(1);
        expect(passwd.text()).toContain('dummy-passwd');
        expect(buttons.length).toEqual(1);
    });
});


describe("CodeVerified Actions", () => {

    it("Should fail when trying to verify the code", () => {
        const err = new Error('CodeVerified error');
        const expectedAction = {
            type: actions.GET_SIGNUP_VERIFY_LINK_FAIL,
            error: true,
            payload: {
              error: err,
              message: err
            }
        };
        expect(actions.getCodeStatusFail(err)).toEqual(expectedAction);
    });
});

describe("Code verification reducer", () => {

    const mockState = {
        password: '',
        email: '',
        status: '',
        dashboard_url: '',
    };

    it("Receives a successful verification action", () => {
        expect(
            verifiedReducer(
                mockState,
                {
                    type: actions.GET_SIGNUP_VERIFY_LINK_SUCCESS,
                    payload:{
                        status: 'verified',
                        password: 'dummy password',
                        email: 'dummy@example.com',
                        dashboard_url: 'http://example.com'
                    }
                }
            )
        ).toEqual(
          {
              password: 'dummy password',
              email: 'dummy@example.com',
              status: 'verified',
              dashboard_url: 'http://example.com',
          }
        );
    });

});
