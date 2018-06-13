
import React from 'react';
import expect from "expect";

import EmailContainer from "containers/Email";
import { setupComponent } from "tests/Main-test";


describe("Email Component", () => {

    it("Renders the email component", () => {
        const wrapper = setupComponent(<EmailContainer />, {main: {window_size: 'lg'}}),
              input = wrapper.find('input#email-input'),
              button = wrapper.find('button#email-button'),
              faIcon = wrapper.find('FontAwesomeIcon');

        expect(input.length).toEqual(1);
        expect(button.length).toEqual(1);
        expect(faIcon.length).toEqual(1);
    });

    it("Renders the small email component", () => {
        const wrapper = setupComponent(<EmailContainer />, {main: {window_size: 'xs'}}),
              input = wrapper.find('input#email-input'),
              button = wrapper.find('button#email-button'),
              faIcon = wrapper.find('FontAwesomeIcon');

        expect(input.length).toEqual(1);
        expect(button.length).toEqual(1);
        expect(faIcon.length).toEqual(0);
    });
});

