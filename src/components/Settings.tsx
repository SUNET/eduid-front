import DeleteAccount from "components/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import { Fragment, useEffect } from "react";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import { useIntl } from "react-intl";

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
      <ChangePasswordDisplay />
      <DeleteAccount />
    </Fragment>
  );
}
