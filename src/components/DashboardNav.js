import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import i18n from "../login/translation/InjectIntl_HOC_factory";

function DashboardNav(props) {
  const [active, setActive] = useState(false);
  const nins = useSelector(state => state.nins.nins);
  const phones =  useSelector(state => state.phones.phones);
  const selectedLanguage = props.intl.locale;

  let tipsAtIdentity = "";
  if(!nins.length){
    tipsAtIdentity = <NotificationTip className={"show"} length={"short"} content={props.translate("dashboard_nav.identity-verify-freja")}/>;
  }
  else if(nins.length){
    tipsAtIdentity = <NotificationTip className={"show"} content={props.translate("dashboard_nav.identity-verify-post-freja")}/>;
    if(phones.length){
      if(phones[0].verified && phones[0].number.includes("+46")){
        tipsAtIdentity = <NotificationTip className={"show"} content={props.translate("dashboard_nav.identity-verify-post-phone-freja")}/>;
      }
    }
  } else null;

  let tipsAtSettings = "";
  if(nins.length){
    if(phones.length){
      if(!phones[0].verified)
        tipsAtSettings = 
          <NotificationTip 
            position={`settings ${selectedLanguage}`} 
            state={{active: [active, setActive]}}  
            className={"show"} 
            content={props.translate("dashboard_nav.settings-confirm-phone")}
          />;
    }
  } else null;

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
        <NavLink 
          className={tipsAtSettings && active ?  `nav-settings ${selectedLanguage}`: null} 
          activeClassName="active" to={`/profile/settings/`}
        >
          <li>
            {props.translate("dashboard_nav.settings")}
            {tipsAtSettings}
          </li>
        </NavLink>
        <NavLink
          className={tipsAtSettings && active ?  `nav-advanced-settings ${selectedLanguage}`: null} 
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
