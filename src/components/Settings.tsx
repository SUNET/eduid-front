import DeleteAccount from "components/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import { Fragment } from "react";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
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
