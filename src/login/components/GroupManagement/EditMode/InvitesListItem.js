import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import ButtonRemoveData from "../../Buttons/ButtonRemoveData";

const InvitesListItem = (props) => {
  let { membersList } = props;
  return (
    <Fragment>
      {membersList.map((member) => (
        <li>
          <div className="list-grid">
            <div className="list-cell left-align">
              <p>{member.email_address}</p>
            </div>
            <div className="list-cell">
              <p></p>
            </div>
            <div className="list-cell">
              <p>X</p>
            </div>
            <div className="list-cell">
              <ButtonRemoveData
                className="icon-button"
                // onClick={this.props.handleRemove}
              />
            </div>
          </div>
        </li>
      ))}
    </Fragment>
  );
};


InvitesListItem.propTypes = {};

export default i18n(InvitesListItem);
