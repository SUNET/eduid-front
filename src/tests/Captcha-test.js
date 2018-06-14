
import mock from 'jest-mock';
import React from 'react';
import expect from "expect";
import fetchMock from 'fetch-mock';

import { setupComponent, fakeStore, getState } from "tests/Main-test";
import CaptchaContainer from "containers/Captcha";
import * as actions from "actions/Captcha";
import captchaReducer from "reducers/Captcha";


describe("Captcha Component", () => {

    afterEach(() => {
      fetchMock.restore()
    });

    it("Renders the captcha component", () => {

        fetchMock.get('https://www.google.com/recaptcha/api.js', 'dummy-script');
        const wrapper = setupComponent({component: <CaptchaContainer />,
                                        overrides: {main: {recaptcha_public_key: 'dummy-key'}}}),
              lead = wrapper.find('p.lead'),
              captcha = wrapper.find('div.recaptcha-holder'),
              buttons = wrapper.find('EduIDButton');

        expect(lead.length).toEqual(1);
        expect(captcha.length).toEqual(1);
        expect(buttons.length).toEqual(2);
    });
});


describe("Captcha Actions", () => {

    it("Should trigger the captcha verification ", () => {
        const expectedAction = {
            type: actions.CAPTCHA_VERIFICATION,
            payload: {
                response: 'dummy response'               
            }
        };
        expect(actions.verifyCaptcha('dummy response')).toEqual(expectedAction);
    });
 
    it("Should fail when trying to post the captcha", () => {
        const err = new Error('Captcha error');
        const expectedAction = {
            type: actions.POST_SIGNUP_TRYCAPTCHA_FAIL,
            error: true,
            payload: {
              error: err,
              message: err
            }
        };
        expect(actions.postCaptchaFail(err)).toEqual(expectedAction);
    });

    it("Should post the captcha", () => {
      const expectedAction = {
        type: actions.POST_SIGNUP_TRYCAPTCHA,
      };
      expect(actions.postCaptcha()).toEqual(expectedAction);
    });
});

describe("Captcha reducer", () => {

    const mockState = {
        captcha_verification: ''
    };

    it("Receives a captcha verification action", () => {
        expect(
            captchaReducer(
                mockState,
                {
                    type: actions.CAPTCHA_VERIFICATION,
                    payload:{
                        response: 'dummy verification'
                    }
                }
            )
        ).toEqual(
          {
              captcha_verification: 'dummy verification'
          }
        );
    });
});

describe("Test captcha Container", () => {
    let wrapper,
        dispatch;

    beforeEach(() => {
        const store = fakeStore(getState());
        dispatch = store.dispatch;
        wrapper = setupComponent({component: <CaptchaContainer />,
                                  store: store});
    });

    it("Clicks the send captcha button", () => {
        const numCalls = dispatch.mock.calls.length;
        wrapper.find('EduIDButton#send-captcha-button').props().onClick();
        expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
    });
});
