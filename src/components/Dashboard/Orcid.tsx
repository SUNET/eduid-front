import { urlJoin } from "apis/common";
import { removeOrcid } from "apis/eduidOrcid";
import EduIDButton from "components//Common/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { Fragment } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const orcidIcon = require("../../../img/vector_iD_icon-w.svg");

export function Orcid(): JSX.Element {
  const dispatch = useDashboardAppDispatch();
  const orcid = useDashboardAppSelector((state) => state.account_linking.orcid);
  const orcid_url = useDashboardAppSelector((state) => state.config.orcid_url);
  const intl = useIntl();

  async function handleOrcidDelete() {
    await dispatch(removeOrcid());
  }

  function handleOrcidConnect() {
    if (orcid_url) {
      const auth_url = urlJoin(orcid_url, "authorize");
      window.location.assign(auth_url);
    }
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
            <img className="orcid-logo" src={orcidIcon} alt="Orcid logo" />
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
      <table className="table-form orcid" role="presentation">
        <tbody>
          <tr className="display-none">
            <th>
              <FormattedMessage description="orcid logo" defaultMessage="orcid logo" />
            </th>
            <th>
              <FormattedMessage description="orcid id" defaultMessage="orcid id" />
            </th>
            <th>
              <FormattedMessage description="orcid remove" defaultMessage="remove" />
            </th>
          </tr>
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
