
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import SplashContainer from "containers/Splash";
import FooterContainer from "containers/Footer";
import HeaderContainer from "containers/Header";
import EmailContainer from "containers/Email";
import AccountCreatedContainer from "containers/AccountCreated";
import CodeVerifiedContainer from "containers/CodeVerified";
import ResendCodeContainer from "containers/ResendCode";
import CaptchaContainer from "containers/Captcha";
import NotificationsContainer from 'containers/Notifications';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Main.scss';


export const history = createHistory()

export const FetchingContext = React.createContext({
    fetching: false,
    setFetching: () => {}
});

class Main extends Component {

    constructor(props) {
        super(props);

        this.setFetching = (fetching) => {
            this.setState(state => ({
                fetching: fetching
            }));
        };

        this.state = {
            fetching: props.is_fetching,
            setFetching: this.setFetching,
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.props.handleWindowSizeChange.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.props.handleWindowSizeChange);
    }

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

        return (
            <FetchingContext.Provider value={this.state}>
                <SplashContainer />
                <div className="container-fluid">
                    <HeaderContainer />
                    <ConnectedRouter history={history}>
                        <div  className="container-fluid">
                            <NotificationsContainer />
                            <Route exact path="/" component={() => (<Redirect to={redirect} />)} />
                            <Route path="/email" component={EmailContainer} />
                            <Route path="/trycaptcha" component={CaptchaContainer} />
                            <Route path="/new" component={AccountCreatedContainer} />
                            <Route path="/code-verified" component={CodeVerifiedContainer} />
                            <Route path="/resend-code" component={ResendCodeContainer} />
                        </div>
                    </ConnectedRouter>
                    <FooterContainer />
                </div>
            </FetchingContext.Provider>
        );
    }
}

Main.propTypes = {
    handleWindowSizeChange: PropTypes.func,
    resize_timeout: PropTypes.integer,
    is_fetching: PropTypes.bool
}

export default Main;
