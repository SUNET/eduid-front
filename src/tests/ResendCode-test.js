
import React from 'react';
import expect from "expect";

import ResendCodeContainer from "containers/ResendCode";
import { setupComponent } from "tests/Main-test";


describe("ResendCode Component", () => {

    it("Renders the resend code component", () => {

        const wrapper = setupComponent(<ResendCodeContainer />),
              lead = wrapper.find('p.lead'),
              button = wrapper.find('EduIDButton');

        expect(lead.length).toEqual(1);
        expect(button.length).toEqual(1);
    });
});
