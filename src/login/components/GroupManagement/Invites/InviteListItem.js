import React, { Component, Fragment } from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";

class InviteListItem extends Component {
  render() {
    let { membersList } = this.props;
    return (
      <Fragment>
        {membersList.map((list) =>
          list.map((member, i) => (
            <li key={i}>
              <div className="list-grid">
                <div className="hide-overflow list-cell left-align">
                  <p>{member.email_address}</p>
                </div>
                <div className="list-cell">X</div>
                <div className="list-cell">X</div>
              </div>
            </li>
          ))
        )}
      </Fragment>
    );
  }
}

InviteListItem.propTypes = {};

export default i18n(InviteListItem);
