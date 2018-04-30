
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import SplashContainer from "containers/Splash";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Main.scss';


export const history = createHistory()

class Main extends Component {

    render () {

        return ([
          <SplashContainer key="0" />,
        ]);
    }
}

Main.propTypes = {
}

export default Main;
