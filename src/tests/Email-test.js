
import React from 'react';
import expect from "expect";

import { setupComponent } from "tests/Main-test";
import EmailContainer from "containers/Email";
import * as actions from "actions/Email";
import emailReducer from "reducers/Email";


describe("Email Component", () => {

    it("Renders the email component", () => {
        const wrapper = setupComponent({component: <EmailContainer />,
                                        overrides: {main: {window_size: 'lg'}}}),
              input = wrapper.find('input#email-input'),
              button = wrapper.find('button#email-button'),
              faIcon = wrapper.find('FontAwesomeIcon');

        expect(input.length).toEqual(1);
        expect(button.length).toEqual(1);
        expect(faIcon.length).toEqual(1);
    });

    it("Renders the small email component", () => {
        const wrapper = setupComponent({component: <EmailContainer />,
                                        overrides: {main: {window_size: 'xs'}}}),
              input = wrapper.find('input#email-input'),
              button = wrapper.find('button#email-button'),
              faIcon = wrapper.find('FontAwesomeIcon');

        expect(input.length).toEqual(1);
        expect(button.length).toEqual(1);
        expect(faIcon.length).toEqual(0);
    });
});


describe("Email Actions", () => {

    it("Should add an email ", () => {
        const expectedAction = {
            type: actions.ADD_EMAIL,
            payload: {
                email: 'dummy@example.com'               
            }
        };
        expect(actions.addEmail('dummy@example.com')).toEqual(expectedAction);
    });

    it("Should accept tou", () => {
      const expectedAction = {
        type: actions.ACCEPT_TOU,
      };
      expect(actions.acceptTOU()).toEqual(expectedAction);
    });

    it("Should reject tou", () => {
      const expectedAction = {
        type: actions.REJECT_TOU,
      };
      expect(actions.rejectTOU()).toEqual(expectedAction);
    });
});

describe("Email reducer", () => {

    const mockState = {
        email: '',
        acceptingTOU: false,
        tou_accepted: false,
    };

    it("Receives add email action", () => {
        expect(
            emailReducer(
                mockState,
                {
                    type: actions.ADD_EMAIL,
                    payload:{
                        email: 'dummy@example.com'
                    }
                }
            )
        ).toEqual(
          {
              email: 'dummy@example.com',
              acceptingTOU: true,
              tou_accepted: false,
          }
        );
    });

    it("Receives an accept tou action", () => {
        expect(
            emailReducer(
                mockState,
                {
                    type: actions.ACCEPT_TOU,
                }
            )
        ).toEqual(
          {
              email: '',
              acceptingTOU: false,
              tou_accepted: true,
          }
        );
    });

    it("Receives a reject tou action", () => {
        expect(
            emailReducer(
                mockState,
                {
                    type: actions.REJECT_TOU,
                }
            )
        ).toEqual(
          {
              email: '',
              acceptingTOU: false,
              tou_accepted: false,
          }
        );
    });
});
