
import React from 'react';
import expect from "expect";
import fetchMock from 'fetch-mock';

import CaptchaContainer from "containers/Captcha";
import { setupComponent } from "tests/Main-test";


describe("Captcha Component", () => {

    afterEach(() => {
      fetchMock.restore()
    });

    it("Renders the captcha component", () => {

        fetchMock.get('https://www.google.com/recaptcha/api.js', 'dummy-script');
        const wrapper = setupComponent(<CaptchaContainer />, {main: {recaptcha_public_key: 'dummy-key'}}),
              lead = wrapper.find('p.lead'),
              captcha = wrapper.find('div.recaptcha-holder'),
              buttons = wrapper.find('EduIDButton');

        expect(lead.length).toEqual(1);
        expect(captcha.length).toEqual(1);
        expect(buttons.length).toEqual(2);
    });
});

