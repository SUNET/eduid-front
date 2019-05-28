import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "actions/Nins";
import i18n from "i18n-messages";

import EduIDButton from "components/EduIDButton";

import "style/Nins.scss";

let NinNumber = props => {
  return (
    <div data-ninnumber={props.nin} id="nin-number-container">
      <p id="nin-number">{props.nin}</p>
    </div>
  );
};

let RemoveButton = props => {
  console.log("these are the props in remove button:", props);
  return (
    <EduIDButton
      className="btn-danger btn-sm"
      // id={"button-rm-nin-" + props.nin}
      onClick={e => {
        props.removeNin();
        props.handleDelete(e);
      }}
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

    if (this.props.nins.verified) {
      console.log(this.props.nins.verified);
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
    } else {
      console.log(this.props.nins.length == 1);
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
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleDelete: function (e) {
      console.log("you're in handleDelete through ninDisplay!");
      const ninNumber = e.target.previousSibling.dataset.ninnumber;
      dispatch(actions.startRemove(ninNumber));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NinDisplay);

// export default NinDisplay;
