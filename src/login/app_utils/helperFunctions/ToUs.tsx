import React, { ReactElement } from "react";
import { FormattedMessage } from "react-intl";

export const ToUs: { [key: string]: ReactElement } = {
  "1999-v1": (
    <React.Fragment>
      <p>
        <FormattedMessage defaultMessage="The following generally applies:" description="ToU paragraph 1 heading" />
      </p>
      <ul tabIndex={0}>
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
    <React.Fragment>
      <p>
        <FormattedMessage defaultMessage="The following generally applies:" description="ToU paragraph 1 heading" />
      </p>
      <ul tabIndex={0}>
        {[
          <FormattedMessage
            defaultMessage="that all usage of user accounts follow the laws and by-laws of Sweden,"
            description="ToU first paragraph"
          />,
          <FormattedMessage
            defaultMessage={`that all personal information that you provide,
                                 such as name and contact information shall be truthful,`}
            description="ToU first paragraph"
          />,
          <FormattedMessage
            defaultMessage={`that user accounts, password, security keys and codes are individual and
                                 shall only be used by the intended individual,`}
            description="ToU first paragraph"
          />,
          <FormattedMessage
            defaultMessage="that SUNET's ethical rules regulate the “other” usage."
            description="ToU first paragraph"
          />,
        ].map((list, index) => {
          return <li key={index}>{list}</li>;
        })}
      </ul>
      <ul tabIndex={0}>
        <p>
          <FormattedMessage
            defaultMessage="SUNET judges unethical behaviour to be when someone:"
            description="ToU 2016-v1 paragraph 2 heading"
          />
        </p>
        {[
          <FormattedMessage
            defaultMessage="attempts to gain access to network resources that they do not have the right"
            description="ToU second paragraph"
          />,
          <FormattedMessage
            defaultMessage="attempts to conceal their user identity"
            description="ToU second paragraph"
          />,
          <FormattedMessage
            defaultMessage="attempts to interfere or disrupt the intended usage of the network"
            description="ToU second paragraph"
          />,
          <FormattedMessage
            defaultMessage="clearly wastes available resources (personnel, hardware or software)"
            description="ToU second paragraph"
          />,
          <FormattedMessage
            defaultMessage="attempts to disrupt or destroy computer-based information"
            description="ToU second paragraph"
          />,
          <FormattedMessage defaultMessage="infringes on the privacy of others" description="ToU second paragraph" />,
          <FormattedMessage defaultMessage="attempts to insult or offend others" description="ToU second paragraph" />,
        ].map((list, index) => {
          return <li key={index}>{list}</li>;
        })}
      </ul>
    </React.Fragment>
  ),
};
