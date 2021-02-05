import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import * as actions from "../actions/Nins";

function DashboardNav(props) {
  const nins = useSelector(state => state.nins.nins);
  const phones =  useSelector(state => state.phones.phones);

  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(actions.getNins())
    console.log("[dispatch]", props)
 }, [dispatch]);
  let tipsAtIdentity = "";
  console.log('nins',nins)

  if(nins !== undefined  && nins[0]){
    tipsAtIdentity = <NotificationTip content={"you can verify by post"}/>
    }else if(phones !== undefined  && phones[0]){
      tipsAtIdentity =  <NotificationTip content={"you can verify by post, by phone"}/>
    }else if(nins === undefined  && !nins[0]){
      tipsAtIdentity =  <div/>}else null;

  
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
        <NavLink activeClassName="active" to={`/profile/settings/`}>
          <li>
            {props.translate("dashboard_nav.settings")}
          </li>
        </NavLink>
        <NavLink
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
