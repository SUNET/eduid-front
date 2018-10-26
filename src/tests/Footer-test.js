
import React from 'react';
import expect from "expect";

import FooterContainer from "containers/Footer";
import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";


describe("Footer Component", () => {

    const state = {
        config: {
          is_app_loaded: true,
          available_languages: {
            en: 'English',
            sv: 'Svenska'
          }
        },
        intl: {
          locale: 'en'
        }
    };

    it("Renders the footer component", () => {

        const wrapper = setupComponent({component: <FooterContainer />,
                                        overrides: state}),
              span = wrapper.find('span.langselector'),
              link = wrapper.find('span.langselector').find('a');

        expect(span.length).toEqual(2);
        expect(link.length).toEqual(1);
        expect(link.text()).toEqual('Svenska');
    });
});

describe("Test footer Container", () => {
    let wrapper,
        dispatch;

    beforeEach(() => {
        const store = fakeStore(getState({config: {
                                              is_app_loaded: true,
                                              available_languages: {
                                                  en: 'English',
                                                  sv: 'Svenska'
                                              }
                                         }}));
        dispatch = store.dispatch;
        wrapper = setupComponent({component: <FooterContainer />,
                                  store: store});
    });

    it("Clicks a language selector button", () => {
        const numCalls = dispatch.mock.calls.length;
        const mockEvent = {
            preventDefault: () => {},
            target: {
                closest: () => {return {dataset: { lang: 'sv' }}}
            }
        };
        wrapper.find('span.langselector').find('a').props().onClick(mockEvent);
        expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
    });
});
