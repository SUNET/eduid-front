
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import SplashContainer from "containers/Splash";
import EmailContainer from "containers/Email";
import CaptchaContainer from "containers/Captcha";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Main.scss';


export const history = createHistory()

class Main extends Component {

    render () {

        let redirect = '/email';

        if (this.props.email) {
            if (this.props.captcha) {
                if (this.props.code) {
                } else {
                }
            } else {
                redirect = '/trycaptcha';
            }
        }

        return ([
            <SplashContainer key="0" />,
            <ConnectedRouter history={history} key="1">
                <div className="row text-center">
                    <Route exact path="/" component={() => (<Redirect to={redirect} />)} />
                    <Route path="/email" component={EmailContainer} />
                    <Route path="/trycaptcha" component={CaptchaContainer} />
                </div>
            </ConnectedRouter>
        ]);
    }
}

Main.propTypes = {
}

export default Main;
