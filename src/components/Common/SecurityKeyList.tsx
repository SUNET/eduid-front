import { fetchApprovedSecurityKeys } from "apis/eduidSecurity";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

export function SecurityKeyList(): JSX.Element {
  const dispatch = useDashboardAppDispatch();

  useEffect(() => {
    dispatch(fetchApprovedSecurityKeys());
  });
  console.log("ssshdd");
  return (
    <article>
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
      <form>
        <fieldset className="key-update">
          <div>
            <label>Last updated:</label>
            <time>xxxxxx</time>
          </div>
          <div>
            <label>Next update:</label>
            <time>xxxxxx</time>
          </div>
        </fieldset>
        <table className="keys">
          <thead>
            <tr>
              <th>No.</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Great example model X2000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Superduper key option</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Skj fskjf skjfk lfjksfj ksjf skjf skjfkfjeriwoptu wiug wojgoiwuf sjsjf sjskfjiosf skfj skjf sklfj slkjf
                skljfksjfkjkjkjksjfksjkjkjskjkjkj
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Just get Yubi and you´ll be fine</td>
            </tr>
          </tbody>
        </table>
      </form>
    </article>
  );
}
