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
    let vettingButtons = "";
    let buttonHelpTextArray = [
      this.props.translate("letter.initialize_proofing_help_text"),
      this.props.translate("lmp.initialize_proofing_help_text"),
      this.props.translate("eidas.initialize_proofing_help_text"),
    ];

    // nin is not verified (add nin)
    let AddNumber = (props) => {
      pageHeading = props.translate("verify-identity.unverified_main_title");
      pageText = props.translate("verify-identity.unverified_page-description");
      return (
        <div key="0" className="intro">
          <h4>{pageHeading}</h4>
          <p>{pageText}</p>
          <h3>{props.translate("verify-identity.add-nin_heading")}</h3>
        </div>
      );
    };

    let NumberAdded = (props) => {
      // nin is verified (nin added)
      pageHeading = props.translate("verify-identity.verified_main_title");
      pageText = props.translate("verify-identity.verified_page-description");
      recoverIdentityTip = props.translate(
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
    let VerifyIdentity_Step1 = () => {
      if (this.props.verifiedNinStatus) {
        return <NumberAdded {...this.props} />;
      } else {
        return <AddNumber {...this.props} />;
      }
    };

    // this is where the buttons are generated
    // this needs to be outside of <VerifyIdentity_Step2> for the second modal to render
    if (this.props.is_configured) {
      //this is an object listing all the vetting components in another file (src/vetting-registry.js)
      const vettingOptionsObject = vettingRegistry(!this.props.valid_nin);
      // extract the keys from the vettingOptionsObject
      const vettingOptionsKeys = Object.keys(vettingOptionsObject);
      vettingButtons = [
        <div id="nins-btn-grid"> 
          {vettingOptionsKeys.map((key, index) => {
            let helpText = buttonHelpTextArray[index];
            return (
              <div key={index}>
                {vettingOptionsObject[key]}
                <p key={index} className="proofing-btn-help">
                  {helpText}
                </p>
              </div>
            )
          })}
        </div>
      ]
    }

    // bottom half of page: vetting on added nin
    let VerifyIdentity_Step2 = () => {
      if (this.props.is_configured && !this.props.verifiedNinStatus) {
        return (
          <div key="1" className="intro">
            <h3>
              {this.props.translate("verify-identity.connect-nin_heading")}
            </h3>
            <p>
              {this.props.translate("verify-identity.connect-nin_description")}
            </p>
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
        {vettingButtons}
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
