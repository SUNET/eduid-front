
import React from 'react';
import expect from "expect";

import EmailInUseContainer from "containers/EmailInUse";
import { setupComponent } from "tests/SignupMain-test";


describe("EmailInUse Component", () => {

    const state = {
        main: {
          reset_passwd_url: 'http://dummy.example.com/reset-password',
        }
    };

    it("Renders the email in use component", () => {

        const wrapper = setupComponent({component: <EmailInUseContainer />,
                                        overrides: state}),
              lead = wrapper.find('p.lead'),
              link = wrapper.find('a');

        expect(lead.length).toEqual(1);
        expect(link.length).toEqual(1);
        expect(link.props().href).toEqual('http://dummy.example.com/reset-password');
    });
});
