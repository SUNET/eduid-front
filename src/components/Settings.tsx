import Emails from "components/Emails";
import Phones from "components/Phones";
import DeleteAccount from "containers/DeleteAccount";
import { Fragment } from "react";
import GroupManagement from "../login/components/GroupManagement/GroupManagement";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";

function RenderGroups(): JSX.Element | null {
  // functionality to be removed when groups feature is released
  const showComponent = false;
  if (!showComponent) return null;

  return <GroupManagement />;
}

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
  return (
    <Fragment>
      <PersonalDataParent />
      <Emails />
      <Phones />
      <RenderGroups />
      <ChangePasswordDisplay />
      <DeleteAccount />
    </Fragment>
  );
}
