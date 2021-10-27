import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNavId } from "../../../redux/actions/addDataToStoreActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "../Invites/InvitesParent";
import DeleteGroup from "./DeleteGroup";

const RenderHeader = ({ group, toggleGroupsListOrEditGroup }) => {
  const { display_name } = group;
  return (
    <div className="title">
      <p>Edit {display_name}</p>
      <button
        className="save-button"
        onClick={() => {
          toggleGroupsListOrEditGroup(group);
        }}
      >
        save
      </button>
    </div>
  );
};

const RenderNav = () => {
  const [navId, setNavId] = useState(
    useSelector((state) => state.groups.navId)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addNavId(navId));
  }, [navId]);
  const navContent = [
    { "create-invite": "Invite" },
    { "edit-invite": "Membership" },
    { "delete-group": "Delete" },
  ];
  return (
    <nav>
      {navContent.map((item, i) => {
        let id = Object.keys(item).toString();
        let text = Object.values(item);
        return (
          <li key={i} onClick={(e) => setNavId(e.target.id)}>
            <p className={navId === id ? "active" : null} id={id}>
              {text}
            </p>
          </li>
        );
      })}
    </nav>
  );
};

const RenderNavParent = ({ group, toggleGroupsListOrEditGroup }) => {
  const navId = useSelector((state) => state.groups.navId);
  if (navId === "create-invite" || navId === "edit-invite") {
    return <InvitesParent group={group} />;
  } else if (navId === "delete-group") {
    return (
      <DeleteGroup
        toggleGroupsListOrEditGroup={toggleGroupsListOrEditGroup}
        groupId={group.identifier}
      />
    );
  }
};

const EditGroup = ({ group, toggleGroupsListOrEditGroup }) => {
  return (
    <div className="edit-data">
      <RenderHeader
        group={group}
        toggleGroupsListOrEditGroup={toggleGroupsListOrEditGroup}
      />
      <RenderNav />
      <RenderNavParent
        toggleGroupsListOrEditGroup={toggleGroupsListOrEditGroup}
        group={group}
      />
    </div>
  );
};

EditGroup.propTypes = {};

export default InjectIntl(EditGroup);
