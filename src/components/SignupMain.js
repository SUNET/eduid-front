
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
import EmailInUseContainer from "containers/EmailInUse";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/SignupMain.scss';


export const history = createHistory()

export const FetchingContext = React.createContext({
    fetching: false,
    setFetching: () => {}
});

class SignupMain extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: props.is_fetching,
            setFetching: this.setFetching.bind(this),
        };
    }

    setFetching(fetching) {
        this.setState({
            fetching: fetching
        });
    }

    componentWillMount() {
        window.addEventListener('resize', this.props.handleWindowSizeChange.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.props.handleWindowSizeChange);
    }

    render () {

        let redirect = `${BASE_PATH}/email`;

        if (this.props.email) {
            if (this.props.captcha) {
                if (this.props.code) {
                } else {
                }
            } else {
                redirect = `${BASE_PATH}/trycaptcha`;
            }
        }

        return (
            <FetchingContext.Provider value={this.state}>
                <SplashContainer />
                <div className="container-fluid">
                    <HeaderContainer withButtons={true} />
                    <ConnectedRouter history={history}>
                        <div  className="jumbotron">
                            <div className="row">
                                <div className="col-lg-2"></div>
                                <div className="col-lg-8">
                                    <NotificationsContainer />
                                </div>
                                <div className="col-lg-2"></div>
                            </div>
                            <Route exact path={`${BASE_PATH}`} component={() => (<Redirect to={redirect} />)} />
                            <Route path={`${BASE_PATH}/email`} component={EmailContainer} />
                            <Route path={`${BASE_PATH}/trycaptcha`} component={CaptchaContainer} />
                            <Route path={`${BASE_PATH}/new`} component={AccountCreatedContainer} />
                            <Route path={`${BASE_PATH}/code-verified`} component={CodeVerifiedContainer} />
                            <Route path={`${BASE_PATH}/resend-code`} component={ResendCodeContainer} />
                            <Route path={`${BASE_PATH}/address-used`} component={EmailInUseContainer} />
                        </div>
                    </ConnectedRouter>
                    <FooterContainer />
                </div>
            </FetchingContext.Provider>
        );
    }
}

SignupMain.propTypes = {
    handleWindowSizeChange: PropTypes.func,
    resize_timeout: PropTypes.number,
    is_fetching: PropTypes.bool
}

export default SignupMain;
