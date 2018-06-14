
import React from 'react';
import expect from "expect";

import FooterContainer from "containers/Footer";
import { setupComponent } from "tests/Main-test";


describe("Footer Component", () => {

    const state = {
        main: {
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

