import React, { Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const InviteListItem = ({ invite }) => {
  let { email, member, owner } = invite;
  return (
    <Fragment>
      <li>
        <div className="list-grid" id="three-columns">
          <div className="hide-overflow list-cell left-align">
            <p>{email}</p>
          </div>
          <div className="list-cell">{owner ? "X" : null}</div>
          <div className="list-cell">{member ? "X" : null}</div>
        </div>
      </li>
    </Fragment>
  );
};

// InviteListItem.propTypes = {};

export default InjectIntl(InviteListItem);
