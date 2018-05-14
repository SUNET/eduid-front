
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import SplashContainer from "containers/Splash";
import FooterContainer from "containers/Footer";
import EmailContainer from "containers/Email";
import AccountCreatedContainer from "containers/AccountCreated";
import CodeVerifiedContainer from "containers/CodeVerified";
import CaptchaContainer from "containers/Captcha";
import NotificationsContainer from 'containers/Notifications';

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
                <div  className="container-fluid">
                    <NotificationsContainer />
                    <Route exact path="/" component={() => (<Redirect to={redirect} />)} />
                    <Route path="/email" component={EmailContainer} />
                    <Route path="/trycaptcha" component={CaptchaContainer} />
                    <Route path="/new" component={AccountCreatedContainer} />
                    <Route path="/code-verified" component={CodeVerifiedContainer} />
                </div>
            </ConnectedRouter>,
            <FooterContainer key="3" />
        ]);
    }
}

Main.propTypes = {
}

export default Main;
