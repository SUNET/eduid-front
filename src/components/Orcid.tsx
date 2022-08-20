import * as actions from "actions/AccountLinking";
import { PDOrcid } from "apis/eduidPersonalData";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { Fragment } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const orcidIcon = require("../../img/vector_iD_icon-w.svg");

export function Orcid(): JSX.Element {
  const dispatch = useDashboardAppDispatch();
  const orcid = useDashboardAppSelector((state) => state.account_linking.orcid) as unknown as PDOrcid;
  const intl = useIntl();

  function handleOrcidDelete(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch(actions.startOrcidRemove());
  }

  function handleOrcidConnect(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch(actions.startOrcidConnect());
  }

  // aria-label can't be an Element, we need to get the actual translated string here
  const removeLabel = intl.formatMessage({
    id: "orcid.remove",
    defaultMessage: "Remove",
    description: "Remove orcid aria label",
  });

  if (!orcid?.id) {
    return (
      <Fragment>
        <div className="buttons">
          <EduIDButton
            buttonstyle="primary"
            id="connect-orcid-button"
            className="btn-icon"
            onClick={handleOrcidConnect}
          >
            <img className="orcid-logo" src={orcidIcon} />
            <FormattedMessage description="orcid connect button" defaultMessage={`Add ORCID account`} />
          </EduIDButton>
        </div>
        <p className="help-text">
          <FormattedMessage
            description="orcid description"
            defaultMessage={`ORCID iD distinguishes you from other researchers and allows linking of your research
            outputs and activities to your identity, regardless of the organisation you are working with.`}
          />
        </p>
      </Fragment>
    );
  } else {
    return (
      <table className="table-form orcid">
        <tbody>
          <tr>
            <td>
              <span className="orcid-logo" />
            </td>
            <td className="orcid-link">
              <a href={orcid.id}>{orcid.id}</a>
            </td>
            <td>
              <EduIDButton
                buttonstyle="close"
                size="sm"
                id="remove-orcid-button"
                onClick={handleOrcidDelete}
                aria-label={removeLabel}
              ></EduIDButton>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
