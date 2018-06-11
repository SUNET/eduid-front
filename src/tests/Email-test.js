
import React from 'react';
import expect from "expect";

import EmailContainer from "containers/Email";
import { setupComponent } from "tests/Main-test";


describe("Email Component", () => {

    it("Renders the email component", () => {
        const wrapper = setupComponent(<EmailContainer />),
              splash = wrapper.find('input#email-input');

        expect(splash.length).toEqual(1);
    });
});

