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
    if (this.props.nins[0].verified) {
      // console.log(this.props.nins[0].verified);
      return (
        <div key="1" className="intro">
          <label>national id number</label>
          <div key="1" id="add-nin-number">
            <div key="1" id="nin-form-container">
              <div key="1" id="add-nin-number" className="verified">
                <div
                  data-ninnumber={this.props.nins[0].number}
                  id="nin-number-container"
                >
                  <p id="nin-number">{this.props.nins[0].number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key="1" className="intro">
          <h3> Step 1. Add your national identity number</h3>
          <p>Your id number has been added and connected to your person.</p>
          <div key="1" id="add-nin-number">
            <div key="1" id="nin-form-container">
              <div key="1" id="add-nin-number" className="unverified">
                <div
                  data-ninnumber={this.props.nins[0].number}
                  id="nin-number-container"
                >
                  <p id="nin-number">{this.props.nins[0].number}</p>
                </div>
                <EduIDButton
                  className="btn-danger btn-sm"
                  onClick={this.props.handleDelete}
                >
                  X
                </EduIDButton>
              </div>
            </div>
          </div>
        </div>
      );
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
      // console.log("you're in handleDelete through ninDisplay!");
      const ninNumber = e.target.previousSibling.dataset.ninnumber;
      dispatch(actions.startRemove(ninNumber));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NinDisplay);
