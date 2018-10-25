
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import SplashContainer from "containers/Splash";
import NotificationsContainer from "containers/Notifications";
import FooterContainer from "containers/Footer";
import HeaderContainer from "containers/HeaderAnon";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/SignupMain.scss';


export const history = createHistory()

export const FetchingContext = React.createContext({
    fetching: false,
    setFetching: () => {}
});

class ActionWrapper extends Component {

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

        return (
            <FetchingContext.Provider value={this.state}>
                <SplashContainer />
                <div className="container-fluid">
                    <HeaderContainer withButtons={false} />
                    <ConnectedRouter history={history}>
                        <div  className="jumbotron">
                            <div className="row">
                                <div className="col-lg-2"></div>
                                <div className="col-lg-8">
                                    <NotificationsContainer />
                                </div>
                                <div className="col-lg-2"></div>
                            </div>
                            <Route exact path={`${BASE_PATH}`} component={() => (<Redirect to={this.props.redirect} />)} />
                            {this.props.children}
                        </div>
                    </ConnectedRouter>
                    <FooterContainer />
                </div>
            </FetchingContext.Provider>
        );
    }
}

ActionWrapper.propTypes = {
    handleWindowSizeChange: PropTypes.func,
    redirect: PropTypes.string,
    resize_timeout: PropTypes.number,
    is_fetching: PropTypes.bool
}

export default ActionWrapper;

