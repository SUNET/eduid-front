import React, { Fragment } from "react";
import PersonalDataParent from "login/components/PersonalData/PersonalDataParent";
import Emails from "./Emails";
import Phones from "./Phones";
import { AccountId } from "./AccountId";

export default function Profile(): JSX.Element {
  return (
    <Fragment>
      <PersonalDataParent />
      <Emails />
      <Phones />
      <AccountId />
    </Fragment>
  );
}
