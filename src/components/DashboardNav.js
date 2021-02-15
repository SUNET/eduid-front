import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import * as ninActions from "../actions/Nins";
import * as mobileActions from "../actions/Mobile";

function DashboardNav(props) {
  const [active, setActive] = useState(false);
  const nins = useSelector(state => state.nins.nins);
  const phones =  useSelector(state => state.phones.phones);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(ninActions.getNins());
  }, [dispatch]);

  useEffect(() => { 
    dispatch(mobileActions.getMobiles());
  }, [dispatch]);

  let tipsAtIdentity = "";
  if(!nins.length){
    tipsAtIdentity = <NotificationTip className={"show"} content={props.translate("dashboard_nav.identity-verify-freja")}/>;
  }
  else if(nins.length > 0){
    tipsAtIdentity = <NotificationTip className={"show"} content={props.translate("dashboard_nav.identity-verify-post-freja")}/>;
    if(phones.length > 0){
      if(phones[0].verified && phones[0].number.includes("+46")){
        tipsAtIdentity = <NotificationTip className={"show"} content={props.translate("dashboard_nav.identity-verify-post-phone-freja")}/>;
      }
    }
  }else null;

  let tipsAtSettings = "";
  if(nins.length > 0){
    if(phones.length > 0){
      if(!phones[0].verified)
      tipsAtSettings = <NotificationTip direction={`left ${props.intl.locale}`} state={{active: [active, setActive]}}  className={"show"} content={props.translate("dashboard_nav.settings-confirm-phone")}/>;
    }
  }else null;

  return (
    <nav id="dashboard-nav">
      <ul>
        <NavLink exact activeClassName="active" to={`/profile/`}>
          <li>{props.translate("dashboard_nav.profile")}</li>
        </NavLink>
        <NavLink
          exact
          activeClassName="active"
          to={`/profile/verify-identity/`}
        >
          <li>
            {props.translate("dashboard_nav.identity")}
            {tipsAtIdentity}
          </li>
        </NavLink>
        <NavLink className={tipsAtSettings && active ?  `nav-settings ${props.intl.locale}`: null} activeClassName="active" to={`/profile/settings/`}>
          <li>
            {props.translate("dashboard_nav.settings")}
            {tipsAtSettings}
          </li>
        </NavLink>
        <NavLink
          className={tipsAtSettings && active ?  `nav-advanced-settings ${props.intl.locale}`: null} 
          activeClassName="active"
          to={`/profile/settings/advanced-settings`}
        >
          <li>{props.translate("dashboard_nav.advanced-settings")}</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default i18n(withRouter(DashboardNav));
