
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux';
import { mount } from 'enzyme';
import expect from "expect";

import SplashContainer from 'containers/Splash';


const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
});

function setupComponent(loaded) {
    const store = fakeStore({
        main: {
            is_app_loaded: loaded
        }
    });
    const wrapper = mount(<Provider store={ store }>
                              <SplashContainer />
                          </Provider>);
    return wrapper;
}

describe("Splash Component", () => {

    it("Renders", () => {
        const wrapper = setupComponent(false),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(1);
    });

    it("Doesn't Render", () => {
        const wrapper = setupComponent(true),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(0);
    });
});

