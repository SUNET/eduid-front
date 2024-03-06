import { useErrorsAppSelector } from "errors-hooks";
import { FormattedMessage } from "react-intl";

export function PageNotFound(): JSX.Element {
  const eduid_site_url = useErrorsAppSelector((state) => state.config.eduid_site_url);

  return (
    <section className="intro">
      <h1>
        <FormattedMessage description="not found heading" defaultMessage="Page not found" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            description="not found paragraph"
            defaultMessage={`We can't find what you are looking for. This may be due to a technical error or a typo. 
                Please try again or use the link to move forward.`}
          />
        </p>
      </div>
      <div>
        <a href={eduid_site_url} id="not-found-link">
          <FormattedMessage description="not found link" defaultMessage="Go to eduID" />
        </a>
      </div>
    </section>
  );
}