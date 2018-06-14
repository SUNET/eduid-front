
import React from 'react';
import expect from "expect";

import { setupComponent } from "tests/Main-test";
import ResendCodeContainer from "containers/ResendCode";
import * as actions from "actions/ResendCode";


describe("ResendCode Component", () => {

    it("Renders the resend code component", () => {

        const wrapper = setupComponent({component: <ResendCodeContainer />}),
              lead = wrapper.find('p.lead'),
              button = wrapper.find('EduIDButton');

        expect(lead.length).toEqual(1);
        expect(button.length).toEqual(1);
    });
});

describe("Resend code Actions", () => {

    it("Should trigger resending a verification code ", () => {
        const expectedAction = {
            type: actions.POST_SIGNUP_RESEND_VERIFICATION,
        };
        expect(actions.postResendCode()).toEqual(expectedAction);
    });
 
    it("Should fail when trying to trigger resending a verification code", () => {
        const err = new Error('Resending error');
        const expectedAction = {
            type: actions.POST_SIGNUP_RESEND_VERIFICATION_FAIL,
            error: true,
            payload: {
              error: err,
              message: err
            }
        };
        expect(actions.postResendCodeFail(err)).toEqual(expectedAction);
    });
});
