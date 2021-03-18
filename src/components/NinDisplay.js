import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import EduIDButton from "components/EduIDButton";

const showHideButton = (position, props) => {
  let toggleShowNin = "", showNin = "";
  if(position === "profile"){
    // If postion is profile this function will use onclick as toggleShowNinAtProfile and get state.showNinAtProfile(true, false)
    toggleShowNin = props.toggleShowNinAtProfile,
    showNin = props.showNinAtProfile
  } else (
    toggleShowNin = props.toggleShowNinAtIdentity,
    showNin = props.showNinAtIdentity
  )
  return(
    <button key="2" className="show-hide-button" onClick={toggleShowNin}>
      {showNin ? props.translate("nin_hide_last_four_digits") : props.translate("nin_show_last_four_digits")}
    </button> 
  )
};

const isShowLastFourDigits = (isShow, nin) => {
 if(isShow) 
 // If show is true the whole id number will be present
  return nin;
 else
 // else last four digits will be replace with **** 
  return nin.replace(/\d{4}$/, '****');
};

export class NinDisplay extends Component {
  render() {
    const url = this.props.history.location.pathname;

    let userData = "";
    if(this.props.nins.length === 0) {
      userData = [
        <Link
          key="1"
          to={`/profile/verify-identity/`}
          className="display-data unverified"
        >
          {this.props.translate("nin_display.profile.no_nin")}
        </Link>,
      ];
    }else{
      if(this.props.verifiedNinStatus) {
        if(url.includes("verify-identity")){
          userData = [
            <div key="1" data-ninnumber={this.props.verifiedNin[0].number} className="display-nin-show-hide">
              <p key="0" className="display-data verified">
                {isShowLastFourDigits(this.props.showNinAtIdentity, this.props.verifiedNin[0].number)}
              </p>
              {showHideButton("identity", this.props)}
            </div>,
          ];
        }else 
          userData = [
            <div key="1" data-ninnumber={this.props.verifiedNin[0].number} className="display-nin-show-hide"> 
              <p key="0" className="display-data verified">
                {isShowLastFourDigits(this.props.showNinAtProfile, this.props.verifiedNin[0].number)}
              </p>
              {showHideButton("profile", this.props)}
            </div>,
          ];
      } else {
        if (url.includes("verify-identity")) {
          userData = [
            <div
              key="0"
              data-ninnumber={this.props.nins[0].number}
              className="data-with-delete"
            >
              <p key="1" id="nin-number" className="display-data unverified">
                {isShowLastFourDigits(this.props.showNinAtIdentity, this.props.nins[0].number)}
              </p>
              {showHideButton("identity", this.props)}
              <EduIDButton
                key="3"
                className="icon-button"
                onClick={this.props.handleDelete}
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
            </div>,
          ];
        } else {
          userData = [
            <div key="1" className="display-nin-show-hide">
              <p key="1" className="display-data verified">
                {isShowLastFourDigits(this.props.showNinAtProfile, this.props.nins[0].number)}
              </p>
              {showHideButton("profile", this.props)}
            </div>
          ];
        }
      }
    }
    return (
      <div key="1" className="profile-grid-cell">
        <label key="0">
          {this.props.translate("nin_display.profile.main_title")}
        </label>
        {userData}
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
