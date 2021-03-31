import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import EduIDButton from "components/EduIDButton";

const RenderShowHideNin = props => {
  const url = props.history.location.pathname;
  let toggleShowNin = "", showNin = "", nin = "";

  if(props.verifiedNinStatus)
    nin = props.verifiedNin[0].number;
  else 
    nin = props.nins[0].number;

  if(url === "/profile/"){
    toggleShowNin = props.toggleShowNinAtProfile,
    showNin = props.showNinAtProfile
  }else {
    toggleShowNin = props.toggleShowNinAtIdentity,
    showNin = props.showNinAtIdentity
  }

  return(
    <div key="1" data-ninnumber={nin} className={`${props.delete ? "data-with-delete" : "display-nin-show-hide"}`} >
      <p key="0" className={`display-data ${props.verifiedNinStatus ? "verified" : "unverified"}`}>
        {showNin ? nin : nin.replace(/\d{4}$/, '****')}
      </p>
      <button key="2" className="show-hide-button" onClick={toggleShowNin}>
        {showNin ? props.translate("nin_hide_last_four_digits") : props.translate("nin_show_last_four_digits")}
      </button> 
      {
        (url === "/profile/verify-identity/" && !props.verifiedNinStatus) &&
        <EduIDButton
          key="3"
          className="icon-button"
          onClick={props.handleDelete}
        >
        <svg
          key="0"
          className="remove"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0h2v16H7z" />
          <path d="M0 9V7h16v2z" />
        </svg>
        </EduIDButton>
      }  
  </div>
  )
}
export class NinDisplay extends Component {
  render() {
    return (
      <div key="1" className="profile-grid-cell">
        <label key="0">
          {this.props.translate("nin_display.profile.main_title")}
        </label>
        {this.props.nins.length === 0 ? 
        <Link
          key="1"
          to={`/profile/verify-identity/`}
          className="display-data unverified"
        >
        {this.props.translate("nin_display.profile.no_nin")}
        </Link>
        : 
       <RenderShowHideNin {...this.props}/>
      }
      </div>
    );
  }
}

NinDisplay.propTypes = {
  nins: PropTypes.array,
  verifiedNin: PropTypes.array,
  verifiedNinStatus: PropTypes.bool,
  handleDelete: PropTypes.func
};

export default withRouter(NinDisplay);
