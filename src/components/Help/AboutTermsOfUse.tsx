import { AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { CommonToU } from "components/Common/CommonToU";
import { FormattedMessage } from "react-intl";

export function AboutTermsOfUse(): React.JSX.Element {
  return (
    <AccordionItemTemplate
      uuid="help-tou"
      title={
        <FormattedMessage
          id="aboutTermsOfUse.handle"
          description="about terms of use - handle"
          defaultMessage="Terms of use"
        />
      }
      additionalInfo={null}
    >
      <article>
        <h4>
          <FormattedMessage
            id="aboutTermsOfUse.heading"
            description="what are eduIDs terms of use - heading"
            defaultMessage="What are eduIDs terms of use?"
          />
        </h4>
        <p>
          <FormattedMessage
            id="aboutTermsOfUse.paragraph"
            description="what are eduIDs terms of use - paragraph"
            defaultMessage={`These terms are accepted by the user upon creating an eduID account. 
              It is a legal agreement between eduID and its users to abide by the terms.`}
          />
        </p>
        <CommonToU version="2016-v1" />
      </article>
    </AccordionItemTemplate>
  );
}
