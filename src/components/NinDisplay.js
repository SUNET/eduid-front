import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import EduIDButton from "components/EduIDButton";

export class NinDisplay extends Component {
  render() {
    const url = this.props.history.location.pathname;
    
    const showHideButton = (position) => {
      let toggleShowNin = "", showNin = "";
      if(position === "profile"){
        toggleShowNin = this.props.toggleShowNinAtProfile,
        showNin = this.props.showNinAtProfile
      } else (
        toggleShowNin = this.props.toggleShowNinAtIdentity,
        showNin = this.props.showNinAtIdentity
      )
      return(
        <button key="2" className="show-hide-button" onClick={toggleShowNin}>
          {showNin ? this.props.translate("nin_hide_last_four_digits") : this.props.translate("nin_show_last_four_digits")}
        </button> 
      )
    };

    const isShowLastFourDigits = (isShow, nin) => {
     if(isShow) 
      return nin;
     else 
      return nin.replace(/\d{4}$/, '****');
    };

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
              {showHideButton("identity")}
            </div>,
          ];
        }else 
          userData = [
            <div key="1" data-ninnumber={this.props.verifiedNin[0].number} className="display-nin-show-hide"> 
              <p key="0" className="display-data verified">
                {isShowLastFourDigits(this.props.showNinAtProfile, this.props.verifiedNin[0].number)}
              </p>
              {showHideButton("profile")}
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
              {showHideButton("identity")}
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
              {showHideButton("profile")}
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
