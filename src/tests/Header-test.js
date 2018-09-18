
import React from 'react';
import expect from "expect";

import HeaderContainer from "containers/Header";
import { setupComponent } from "tests/SignupMain-test";


describe("Header Component", () => {

    const state = {
        main: {
            dashboard_url: 'http://example.com',
            students_link: 'http://example.com/student',
            technicians_link: 'http://example.com',
            staff_link: 'http://example.com',
            faq_link: 'http://example.com',
            window_size: 'lg'
        }
    };

    it("Renders the header component", () => {

        const wrapper = setupComponent({component: <HeaderContainer withButtons={true} />,
                                        overrides: state}),
              buttons = wrapper.find('div.buttons'),
              link = wrapper.find('a.nav-link'),
              logoLarge = wrapper.find('div#eduid-logo-large'),
              logoSmall = wrapper.find('div#eduid-logo-small');

        expect(buttons.length).toEqual(1);
        expect(link.length).toEqual(4);
        expect(logoLarge.length).toEqual(1);
        expect(logoSmall.length).toEqual(0);
    });

    it("Renders the header component without login signup buttons", () => {

        const wrapper = setupComponent({component: <HeaderContainer withButtons={false} />,
                                        overrides: state}),
              buttons = wrapper.find('div.buttons');

        expect(buttons.length).toEqual(0);
    });

    const smallState = {
        main: {
            ...state.main,
            window_size: 'xs'
        }
    };

    it("Renders the header component - small", () => {

        const wrapper = setupComponent({component: <HeaderContainer withButtons={true} />,
                                        overrides: smallState}),
              link = wrapper.find('a.nav-link'),
              logoLarge = wrapper.find('div#eduid-logo-large'),
              logoSmall = wrapper.find('div#eduid-logo-small');

        expect(link.length).toEqual(4);
        expect(logoLarge.length).toEqual(0);
        expect(logoSmall.length).toEqual(1);
    });
});

