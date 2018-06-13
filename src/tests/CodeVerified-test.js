
import React from 'react';
import expect from "expect";

import CodeVerifiedContainer from "containers/CodeVerified";
import { setupComponent } from "tests/Main-test";


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


