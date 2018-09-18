
import React from 'react';
import expect from "expect";

import AccountCreatedContainer from "containers/AccountCreated";
import { setupComponent } from "tests/SignupMain-test";


describe("Account Component", () => {

    it("Renders the account created component", () => {
        const wrapper = setupComponent({component: <AccountCreatedContainer />,
                                        overrides: {email: {email: 'dummy@example.com'}}}),
              lead = wrapper.find('h2.lead'),
              p = wrapper.find('p');

        expect(lead.length).toEqual(1);
        expect(p.length).toEqual(1);
        expect(p.text()).toContain('dummy@example.com');
    });
});
