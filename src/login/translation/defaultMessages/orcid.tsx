import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "orc.authorization_success": (
    <FormattedMessage id="orc.authorization_success" defaultMessage={`ORCID connected successfully`} />
  ),

  "orc.already_connected": (
    <FormattedMessage id="orc.already_connected" defaultMessage={`ORCID already connected to this account`} />
  ),

  "orc.unknown_state": (
    <FormattedMessage
      id="orc.unknown_state"
      defaultMessage={`State was unknown when trying to connect ORCID account`}
    />
  ),

  "orc.sub_mismatch": (
    <FormattedMessage id="orc.sub_mismatch" defaultMessage={`Subject mismatch when trying to connect ORCID account`} />
  ),

  "orc.authorization_fail": (
    <FormattedMessage id="orc.authorization_fail" defaultMessage={`ORCID authentication failed`} />
  ),
};
