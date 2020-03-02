import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";


class Success extends Component {

  render() {
    return (
      <div>
        <h3 className="success-page-header">
          {this.props.success_title}
        </h3>
        <div>
            <p>
            {this.props.success_body}
            </p>
        </div>
      </div>
    );
  }
}

Success.propTypes = {
  success_title: PropTypes.string,
  success_body: PropTypes.string,
};

export default i18n(Success);
