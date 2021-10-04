import React, { Component, Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonRemoveData from "../../Buttons/ButtonRemoveData";

export const RenderOwnerList = (props) => {
  let owners = props.group.owners;
  return (
    <Fragment>
      <label>Owner</label>
      {owners.map((owner, i) => (
        <p key={owner.identifier}>
          {i + 1}. {owner.display_name}
        </p>
      ))}
    </Fragment>
  );
};

export const RenderMemberList = (props) => {
  let members = props.group.members;
  return (
    <Fragment>
      <label>Member</label>
      {members.map((member, i) => (
        <p key={member.identifier}>
          {i + 1}. {member.display_name}
        </p>
      ))}
    </Fragment>
  );
};

const RenderOpenGroup = (props) => {
  return props.openGroup ? (
    <div className="open-group">
      <RenderOwnerList {...props} />
      <RenderMemberList {...props} />
    </div>
  ) : null;
};

class GroupListItem extends Component {
  state = {
    openGroup: false,
  };

  toggleGroupOpenClosed = () => {
    this.setState((prevState) => {
      return {
        openGroup: !prevState.openGroup,
      };
    });
  };

  render() {
    const { group } = this.props;
    const { display_name } = this.props.group;
    return (
      <li
        className="closed"
        onClick={() => {
          this.toggleGroupOpenClosed();
        }}
      >
        <div className="list-grid" id="five-columns">
          <div className="title hide-overflow list-cell">
            <div className="element-pair">
              <button
                className={
                  this.state.openGroup ? "dropdown-open" : "dropdown-closed"
                }
              >
                ^
              </button>
              <p>{display_name}</p>
            </div>
          </div>
          <div className="list-cell">
            <div className={this.state.openGroup ? "transparent" : null}>
              {group.is_member ? "X" : null}
            </div>
          </div>
          <div className="list-cell">
            <div className={this.state.openGroup ? "transparent" : null}>
              {group.is_owner ? "X" : null}
            </div>
          </div>
          <div className="list-cell">
            <button
              onClick={() => {
                this.props.toggleGroupsListOrEditGroup(group);
              }}
            >
              edit
            </button>
          </div>
          <div className="list-cell">
            <ButtonRemoveData
              className="icon-button"
              onClick={() => {
                console.log("you clicked the cross");
              }}
            />
          </div>
        </div>
        <RenderOpenGroup openGroup={this.state.openGroup} {...this.props} />
      </li>
    );
  }
}

GroupListItem.propTypes = {};

export default InjectIntl(GroupListItem);
