import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import { withRouter } from "react-router-dom";
import AddNin from "containers/AddNin";
import vettingRegistry from "vetting-registry";

import "../login/styles/index.scss";

class VerifyIdentity extends Component {
  render() {
    // page text depend on nin status (verified or not)
    let pageHeading = "";
    let pageText = "";

    // nin is not verified (add nin)
    let AddNumber = (props) => {
      pageHeading = this.props.translate(
        "verify-identity.unverified_main_title"
      );
      pageText = this.props.translate(
        "verify-identity.unverified_page-description"
      );
      return (
        <div key="0" className="intro">
          <h4>{pageHeading}</h4>
          <p>{pageText}</p>
          <h3>{this.props.translate("verify-identity.add-nin_heading")}</h3>
        </div>
      );
    };

    let NumberAdded = (props) => {
      // nin is verified (nin added)
      pageHeading = this.props.translate("verify-identity.verified_main_title");
      pageText = this.props.translate(
        "verify-identity.verified_page-description"
      );
      recoverIdentityTip = this.props.translate(
        "verify-identity.verified_pw_reset_extra_security"
      );
      return (
        <div key="0" className="intro">
          <h4>{pageHeading}</h4>
          <p>{pageText}</p>
        </div>
      );
    };

    // top half of page: add nin/nin added
    let VerifyIdentity_Step1 = (props) => {
      if (this.props.verifiedNinStatus) {
        return <NumberAdded {...this.props} />;
      } else {
        return <AddNumber {...this.props} />;
      }
    };

    // rendering of vetting buttons from options in an object in another file
    let VettingButtons = (props) => {
      // this is the help text under the first 3 vetting buttons
      let helpTextArray = [
        this.props.translate("letter.initialize_proofing_help_text"),
        this.props.translate("lmp.initialize_proofing_help_text"),
        this.props.translate("eidas.initialize_proofing_help_text"),
      ];

      // this is an object listing all the vetting components in another file (src/vetting-registry.js)
      const vettingOptionsObject = vettingRegistry(!this.props.valid_nin);
      // extract the keys from the vettingOptionsObject
      const vettingOptionsKeys = Object.keys(vettingOptionsObject);

      // this is where each button is rendered based on the vettingOptionsList object
      return vettingOptionsKeys.map((key, i) => {
        let helpText = helpTextArray[i];
        return (
          <div key={i}>
            {vettingOptionsObject[key]}
            <p key={i} className="proofing-btn-help">
              {helpText}
            </p>
          </div>
        );
      });
    };

    // bottom half of page: vetting on added nin
    let VerifyIdentity_Step2 = (props) => {
      if (this.props.is_configured && !this.props.verifiedNinStatus) {
        return (
          <div key="1" className="intro">
            <h3>
              {this.props.translate("verify-identity.connect-nin_heading")}
            </h3>
            <p>
              {this.props.translate("verify-identity.connect-nin_description")}
            </p>
            <div key="1" id="nins-btn-grid">
              <VettingButtons {...this.props} />
            </div>
          </div>
        );
      } else {
        return <div />;
      }
    };
  
    return (
      <Fragment>
        <VerifyIdentity_Step1 />
        <AddNin {...this.props} />
        <VerifyIdentity_Step2 />
      </Fragment>
    );
  }
}

VerifyIdentity.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array,
};

export default i18n(withRouter(VerifyIdentity));
