
import React from 'react';
import expect from "expect";

import { setupComponent } from "tests/Main-test";
import CodeVerifiedContainer from "containers/CodeVerified";
import * as actions from "actions/CodeVerified";


describe("CodeVerified Component", () => {

    const state = {
        verified: {
          dashboard_url: 'http://dummy.example.com',
          password: 'dummy-passwd',
          eppn: 'hubba-bubba',
          nonce: 'dummy-nonce',
          timestamp: 'dummy-ts',
          auth_token: 'dummy-token',
          email: 'dummy@example.com',
          status: 'verified',
          gotten: false
        }
    };

    it("Renders the code verified component", () => {

        const wrapper = setupComponent(<CodeVerifiedContainer />, state),
              lead = wrapper.find('p.lead'),
              completed = wrapper.find('p.registration-completed'),
              passwd = wrapper.find('pre.pre-big'),
              buttons = wrapper.find('EduIDButton'),
              inputs = wrapper.find('input');

        expect(lead.length).toEqual(2);
        expect(completed.text()).toContain('dummy@example.com');
        expect(passwd.length).toEqual(1);
        expect(passwd.text()).toContain('dummy-passwd');
        expect(buttons.length).toEqual(1);
        expect(inputs.length).toEqual(0);
    });

    const gottenState = {
        verified: {
            ...state.verified,
            gotten: true
        }
    };

    it("Renders the code verified component - passwd gotten", () => {

        const wrapper = setupComponent(<CodeVerifiedContainer />, gottenState),
              lead = wrapper.find('p.lead'),
              passwd = wrapper.find('pre.pre-big'),
              buttons = wrapper.find('EduIDButton'),
              inputs = wrapper.find('input');

        expect(lead.length).toEqual(1);
        expect(lead.text()).toContain('dummy@example.com');
        expect(passwd.length).toEqual(0);
        expect(buttons.length).toEqual(2);
        expect(inputs.length).toEqual(4);
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

    it("Should remove nin", () => {
      const expectedAction = {
        type: actions.SHOW_EXITS,
      };
      expect(actions.showExits()).toEqual(expectedAction);
    });
});
