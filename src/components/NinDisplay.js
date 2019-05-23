import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "actions/Nins";
import i18n from "i18n-messages";

// import NinForm from "./NinForm";
import EduIDButton from "components/EduIDButton";

import "style/Nins.scss";

let NinNumber = props => {
  return (
    <div data-ninnumber={props.nins[0].number} id="nin-number-container">
      <p id="nin-number">{props.nins[0].number}</p>
    </div>
  );
};

let RemoveButton = props => {
  return (
    <EduIDButton
      className="btn-danger"
      className="btn-sm"
      id={"button-rm-nin-" + props.nins[0].number}
      onClick={props.handleDelete}
    >
      X
    </EduIDButton>
  );
};

let VerifyButton = props => {
  return (
    <Link id="verify-button" to="/profile/verify-identity/step2">
      <p>connect eduid to my person</p>
    </Link>
  );
};

class NinDisplay extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { nin: null };
  //   this.addNin = this.addNin.bind(this);
  // }
  // addNin(validNin) {
  //   this.setState((state, props) => {
  //     return { nin: validNin };
  //   }, console.log("this is state in AddNin:", this.state.nin));
  // }
  render() {
    let ninStatus = "nonin";

    // if (this.props.nins.length) {
    //   ninStatus = "unverified";
    //   const nins = this.props.nins.filter(nin => nin.verified);
    //   if (nins.length === 1) {
    //     ninStatus = "verified";
    //     verifiedNin = nins[0].number;
    //   }
    // }

    // let ninVerified = [
    //   <div key="1" id="add-nin-number">
    //     <NinNumber {...this.props} />
    //     <div id="nin-buttons">
    //       <RemoveButton {...this.props} />
    //     </div>
    //   </div>
    // ];

    if (this.props.nins.length) {
      return (
        <div key="1" className="intro">
          <h3> Step 1. Add your national id number</h3>
          <p>
            Your id number has been added,
            <Link id="verify-id-link" to="/profile/verify-identity/step2">
              but you still need to connect it to your person
            </Link>
          </p>
          <div key="1" id="add-nin-number">
            <div key="1" id="nin-form-container">
              <div key="1" id="add-nin-number" className="unverified">
                <NinNumber {...this.props} />
                <RemoveButton {...this.props} />
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
              <div key="1" id="add-nin-number" className="verified">
                <NinNumber {...this.props} />
                <RemoveButton {...this.props} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

// NinDisplay.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

const mapStateToProps = (state, props) => {
  return {
    nins: state.nins.nins,
    // is_configured: state.config.is_configured,
    // proofing_methods: state.config.PROOFING_METHODS,
    // valid_nin: isValid("nins")(state),
    nin: state.nins.nin,
    message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleDelete: function(e) {
      console.log("you're in hansleDelete through ninDisplay!")
      const ninNumber = e.target.previousSibling.dataset.ninnumber;
      dispatch(actions.startRemove(ninNumber));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NinDisplay);

// export default i18n(NinDisplay);

// export default NinDisplay;
