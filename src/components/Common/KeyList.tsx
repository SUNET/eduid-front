import { FormattedMessage } from "react-intl";

export function KeyList(): JSX.Element {
  return (
    <article id="uniqueId-container">
      <h2>
        <FormattedMessage
          defaultMessage="Currently valid physical Security Keys"
          description="Security keys list - heading"
        />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`This is a list of names of maker and models of external security keys that kan be used for eduID. The list is updated once a month`}
          description="Security keys list - paragraph"
        />
      </p>
      <fieldset className="flex-between">
        <div>
          <label>Last updated:</label>
          <time>xxxxxx</time>
        </div>
        <div>
          <label>Next update:</label>
          <time>xxxxxx</time>
        </div>
      </fieldset>
    </article>
  );
}
