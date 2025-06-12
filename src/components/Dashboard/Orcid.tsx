import { urlJoin } from "apis/common";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { Fragment } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { orcidApi } from "services/orcid";

const orcidIcon = require("../../../img/vector_iD_icon-w.svg");

export function Orcid(): JSX.Element {
  const orcid = useAppSelector((state) => state.account_linking.orcid);
  const orcid_service_url = useAppSelector((state) => state.config.orcid_service_url);
  const intl = useIntl();
  const [removeOrcid_trigger] = orcidApi.useLazyRemoveOrcidQuery()

  async function handleOrcidDelete() {
    const result = await removeOrcid_trigger();
    if ( result.isError) {
      console.error("Error removing orcid", result.error);
    }
  }

  function handleOrcidConnect() {
    try {
      if (orcid_service_url) {
        const auth_url = urlJoin(orcid_service_url, "authorize");
        window.location.assign(auth_url);
      }
    } catch (error) {
      console.error("Error connecting to orcid", error);
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
          <EduIDButton buttonstyle="primary icon" id="connect-orcid-button" onClick={handleOrcidConnect}>
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
                buttonstyle="close sm"
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
