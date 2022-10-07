import DeleteAccount from "components/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import { Fragment, useEffect } from "react";
import GroupManagement from "../login/components/GroupManagement/GroupManagement";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import { useIntl } from "react-intl";

function RenderGroups(): JSX.Element | null {
  // functionality to be removed when groups feature is released
  const showComponent = false;
  if (!showComponent) return null;

  return <GroupManagement />;
}

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Settings",
      defaultMessage: "Settings | eduID",
    });
  }, []);

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
