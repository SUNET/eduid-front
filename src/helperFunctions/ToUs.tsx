import React, { ReactElement } from "react";
import { FormattedMessage } from "react-intl";

export const ToUs: { [key: string]: ReactElement } = {
  "1999-v1": (
    <React.Fragment>
      <p>
        <FormattedMessage id="tou.heading1" defaultMessage="The following generally applies:" description="ToU paragraph 1 heading" />
      </p>
      <ul>
        <li>
          <p>This a test version of terms of use version 1 from 2021,</p>
        </li>
        <li>
          <p>The versioning allows us to update terms if needed and keep parallel versions at the same time,</p>
        </li>
        <li>
          <p>And still ensure that we serve the correct version a specific users need to accept,</p>
        </li>
      </ul>
    </React.Fragment>
  ),

  "2016-v1": (
    <dl className="terms">
      <dt>
        <FormattedMessage id="tou.heading1" defaultMessage="The following generally applies:" description="ToU paragraph 1 heading" />
      </dt>
      <dd key="law-compliance">
        <FormattedMessage
          id="tou.laws"
          defaultMessage="that all usage of user accounts follow the laws and by-laws of Sweden,"
          description="ToU first paragraph"
        />
      </dd>
      <dd key="truthful-info">
        <FormattedMessage
          id="tou.personalInfo"
          defaultMessage={`that all personal information that you provide,
                                 such as name and contact information shall be truthful,`}
          description="ToU first paragraph"
        />
      </dd>
      <dd key="individual-accounts">
        <FormattedMessage
          id="tou.individual"
          defaultMessage={`that user accounts, password, security keys and codes are individual and
                                 shall only be used by the intended individual,`}
          description="ToU first paragraph"
        />
      </dd>
      <dd key="ethical-rules">
        <FormattedMessage
          id="tou.ethicalRules"
          defaultMessage="that SUNET's ethical rules (listed below) regulate all other permitted usage."
          description="ToU first paragraph"
        />
      </dd>

      <dt>
        <FormattedMessage
          id="tou.heading20162"
          defaultMessage="SUNET judges unethical behaviour to be when someone:"
          description="ToU 2016-v1 paragraph 2 heading"
        />
      </dt>
      <dd key="gain-access">
        <FormattedMessage
          id="tou.unauthorizedAccess"
          defaultMessage="attempts to gain access to network resources that they do not have the right"
          description="ToU second paragraph"
        />
      </dd>
      <dd key="conceal-identity">
        <FormattedMessage id="tou.concealIdentity" defaultMessage="attempts to conceal their user identity" description="ToU second paragraph" />
      </dd>
      <dd key="disrupt-usage">
        <FormattedMessage
          id="tou.disruptUsage"
          defaultMessage="attempts to interfere or disrupt the intended usage of the network"
          description="ToU second paragraph"
        />
      </dd>
      <dd key="waste-resources">
        <FormattedMessage
          id="tou.wasteResources"
          defaultMessage="clearly wastes available resources (personnel, hardware or software)"
          description="ToU second paragraph"
        />
      </dd>
      <dd key="destroy-info">
        <FormattedMessage
          id="tou.destroyInfo"
          defaultMessage="attempts to disrupt or destroy computer-based information"
          description="ToU second paragraph"
        />
      </dd>
      <dd key="infringe-privacy">
        <FormattedMessage id="tou.privacy" defaultMessage="infringes on the privacy of others" description="ToU second paragraph" />
      </dd>
      <dd key="insult-others">
        <FormattedMessage id="tou.offend" defaultMessage="attempts to insult or offend others" description="ToU second paragraph" />
      </dd>
    </dl>
  ),
};
