
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Collapse } from 'reactstrap';

import FetchingContext from 'components/FetchingContext';
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import PersonalDataContainer from 'containers/PersonalData';
import NinsContainer from 'containers/Nins';
import EmailsContainer from 'containers/Emails';
import MobileContainer from 'containers/Mobile';
import AccountLinkingContainer from 'containers/AccountLinking';
import SecurityContainer from 'containers/Security';
import ChangePasswordContainer from 'containers/ChangePassword';
import NotificationsContainer from 'containers/Notifications';
import ProfileFilledContainer from 'containers/ProfileFilled';
import PendingActionsContainer from 'containers/PendingActions';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/base.scss';
import 'style/DashboardMain.scss';


export const history = createHistory()

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetching: props.is_fetching,
            setFetching: this.setFetching.bind(this),
            openTabs: false
        };
    }

    setFetching(fetching) {
        this.setState({
            fetching: fetching
        });
    }

    componentWillMount() {
        window.addEventListener('resize', this.props.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.props.handleWindowSizeChange);
    }

    render () {

        let tabsElem = '',
            profElem = '';

        if (this.props.show_sidebar) {

            const size = this.props.window_size,
                  sm = size === 'md',
                  tabs = [{id: 'personaldata', label: sm ? 'main.personal_data_label_sm' : 'main.personal_data'},
                          {id: 'nins', label: sm ? 'main.nins_label_sm' : 'main.nins'},
                          {id: 'emails', label: sm ? 'main.emails_label_sm' : 'main.emails'},
                          {id: 'phones', label: sm ? 'main.phones_label_sm' : 'main.phones'},
                          {id: 'accountlinking', label: sm ? 'main.account_linking_label_sm' : 'main.account_linking'},
                          {id: 'security', label: sm ? 'main.security_label_sm' : 'main.security'}],
                  tabsElems = (classes) => {
                      return tabs.map( (tab, index) => {
                          return (
                              <li className="nav-item" key={index}>
                                <NavLink className={classes}
                                      activeClassName="active"
                                      onClick={() => this.setState({openTabs: false})}
                                      to={`/profile/${tab.id}`}
                                      id={`${tab.id}-router-link`}>
                                  {this.props.l10n(tab.label)}
                                </NavLink>
                              </li>
                          );
                      });
                  };
            if (size === 'xl' || size === 'lg') {
                tabsElem = (
                    <div className='col-lg-3'>
                      <div className="profile-head">
                        <h3>{this.props.l10n('main.profile_title')}</h3>
                        <PendingActionsContainer history={history} />
                      </div>

                      <div className="tabs-left" role="navigation" id="profile-menu-large">
                        <ul className='nav nav-tabs nav-stacked'>
                          {tabsElems('main-nav-tabs nav-link')}
                          <ProfileFilledContainer />
                          <li id="profile-menu-eppn-li">
                            <div className="profile-menu-eppn">
                              <p className="eppn-text-muted">{this.props.l10n('main.eduid_id')}: {this.props.eppn}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                );
            } else {
                tabsElem = [(
                    <div key="1" className='col-lg-3'>
                      <div className="profile-head">
                        <h3>{this.props.l10n('main.profile_title')}</h3>
                        <PendingActionsContainer history={history} />
                      </div>
                    </div>),
                    (<nav key="2" className="navbar navbar-toggleable-md navbar-light" role="navigation">
                       <div className="container-fluid">
                         <div className="navbar-header">
                           <button type="button"
                                   className="navbar-toggler collapsed"
                                   onClick={() => this.setState({openTabs: !this.state.openTabs})}>
                             <span className="sr-only">{this.props.l10n('main.toggle-navigation')}</span>
                             <span className="icon-bar"></span>
                             <span className="icon-bar"></span>
                             <span className="icon-bar"></span>
                           </button>
                           <a className="navbar-brand" href="#">
                            {this.props.l10n('main.menu')}
                           </a>
                         </div>
  
                         <Collapse isOpen={this.state.openTabs}>
                           <ul className="nav nav-stacked nav-tabs navbar-nav">
                            {tabsElems('main-nav-tabs tab-link btn btn-block')}
                           </ul>
                         </Collapse>
                       </div>
                     </nav>)];
                
                profElem = (
                      <ul className="nav nav-stacked nav-tabs navbar-nav">
                        <ProfileFilledContainer />
                        <li id="profile-menu-eppn-li">
                          <div className="profile-menu-eppn">
                            <p className="eppn-text-muted">{this.props.l10n('main.eduid_id')}: {this.props.eppn}</p>
                          </div>
                        </li>
                      </ul>
                );
            }
        }

        return (
          <FetchingContext.Provider value={this.state}>
            <SplashContainer />
            <div className="container-fluid">
              <HeaderContainer />
              <ConnectedRouter history={history}>
                  <div id="content-block">
                      <div className="row" id="profile-content-area">
                        {tabsElem}
                        <div className="tab-content col-lg-9 col-lg-offset-1">
                          <div className="tab-pane active">
                            <NotificationsContainer />
                            <Route exact path="/profile/" component={() => (<Redirect to="/profile/personaldata" />)} />
                            <Route path="/profile/personaldata" component={PersonalDataContainer} />
                            <Route path="/profile/nins" component={NinsContainer} />
                            <Route path="/profile/emails" component={EmailsContainer} />
                            <Route path="/profile/phones" component={MobileContainer} />
                            <Route path="/profile/accountlinking" component={AccountLinkingContainer} />
                            <Route path="/profile/security" component={SecurityContainer} />
                            <Route path="/profile/chpass" component={ChangePasswordContainer} />
                          </div>
                        </div>
                        {profElem}
                      </div>
                  </div>
              </ConnectedRouter>
            </div>
            <FooterContainer />
          </FetchingContext.Provider>);
    }
}

Main.propTypes = {
    window_size: PropTypes.string,
    show_sidebar: PropTypes.bool,
    eppn: PropTypes.string,
    handleWindowSizeChange: PropTypes.func,
    messages: PropTypes.object
}

export default Main;
