import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "actions/Nins";
import i18n from "i18n-messages";

import EduIDButton from "components/EduIDButton";

import "style/Nins.scss";

class NinDisplay extends Component {
  render() {
    const url = window.location.href;
    if (url.includes("verify-identity")) {
      // VERIFY ID PROCESS: this is the display of a verified number (on the verify-identity page)
      if (this.props.verifiedNin) {
        return (
          <div key="1" className="profile-card">
            <label>national id number</label>
            <div data-ninnumber={this.props.nins[0].number}>
              <p id="nin-number" className="verified">
                {this.props.nins[0].number}
              </p>
            </div>
          </div>
        );
      } else {
        // VERIFY ID PROCESS: this is the display of an unverified number (on the verify-identity page)
        return (
          <div key="1" className="profile-card">
            <label> 1. Your national id number has been added</label>

            <div key="1" id="nin-display-container">
              <div
                data-ninnumber={this.props.nins[0].number}
                id="nin-number-container"
              >
                <p id="nin-number" className="unverified">
                  {this.props.nins[0].number}
                </p>
                <EduIDButton
                  className="btn-danger btn-sm"
                  onClick={this.props.handleDelete}
                >
                  <div>
                    <svg
                      class="remove"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#FF500D" d="M7 0h2v16H7z" />
                      <path fill="#FF500D" d="M0 9V7h16v2z" />
                    </svg>
                  </div>
                </EduIDButton>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (this.props.nins.length === 0) {
        return (
          <div key="1" className="profile-card">
            <label>National id number</label>
            <div id="nin-number-container">
              <Link
                to={`/profile/verify-identity/`}
                className="unverified profile-data"
              >
                Add number
              </Link>
            </div>
          </div>
        );
      } else {
        if (this.props.verifiedNin) {
          return (
            <div key="1" className="profile-card">
              <label>national id number</label>
              <div data-ninnumber={this.props.nins[0].number}>
                <p id="nin-number" className="verified">
                  {this.props.nins[0].number}
                </p>
              </div>
            </div>
          );
        }
        return (
          <div key="1" className="profile-card">
            <label>National id number</label>
            <div id="nin-number-container">
              <Link
                to={`/profile/verify-identity/`}
                id="nin-number"
                className="unverified profile-data"
              >
                {this.props.nins[0].number}
              </Link>
            </div>
          </div>
        );
      }
    }
  }
}

// NinDisplay.propTypes = {
// nin: PropTypes.string,
// nins: PropTypes.array,
// validateNin: PropTypes.func,
// handleDelete: PropTypes.func,
// proofing_methods: PropTypes.array
// };

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleDelete: function(e) {
      const ninNumber = e.target.closest("#nin-display-container").firstChild
        .dataset.ninnumber;
      dispatch(actions.startRemove(ninNumber));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NinDisplay);
