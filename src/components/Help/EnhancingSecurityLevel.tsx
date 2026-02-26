import securityApi, { SecurityKeysResponse } from "apis/eduidSecurity";
import { Accordion, AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { useAppSelector } from "eduid-hooks";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

export function EnhancingSecurityLevel(): React.JSX.Element {
  const [approvedSecurityKeys, setApprovedSecurityKeys] = useState<SecurityKeysResponse>();
  const is_configured = useAppSelector((state) => state.config.is_configured);
  const [fetchApprovedSecurityKeys] = securityApi.useLazyFetchApprovedSecurityKeysQuery();

  useEffect(() => {
    if (is_configured) {
      (async () => {
        const response = await fetchApprovedSecurityKeys();
        if (response.isSuccess) {
          setApprovedSecurityKeys(response.data.payload);
        }
      })();
    }
  }, [fetchApprovedSecurityKeys, is_configured]);

  return (
    <AccordionItemTemplate
      uuid="help-security-key"
      title={
        <FormattedMessage
          description="about security key - handle"
          defaultMessage="Enhancing the security level of eduID"
        />
      }
      additionalInfo={
        <FormattedMessage description="about security key - info" defaultMessage="Adding an MFA Security Key" />
      }
    >
      <article>
        <h4>
          <FormattedMessage
            description="how more secure - heading"
            defaultMessage="How do I make my eduID more secure?"
          />
        </h4>
        <p>
          <FormattedMessage
            description="how more secure description 1"
            defaultMessage={`Some services will require a higher security level and to improve the security of 
                  your eduID, in addition to knowledge of your username (e.g. confirmed email address) and password 
                  combination, you can use another layer of authentication to log in. This is called multi-Factor 
                  authentication (MFA); and in eduID's case usually two-factor authentication (2FA).`}
          />
        </p>
        <p>
          <FormattedMessage
            description="how more secure description 2"
            defaultMessage={`Examples can be a physical device in your possession such as a USB security token, 
                  or biometric information such as fingerprint or face-recognition supported on the device you are 
                  using, and we refer to these techniques as a 'Security key'.`}
          />
        </p>
        <h4>
          <FormattedMessage
            description="how add security key - heading"
            defaultMessage="How do I implement MFA with eduID?"
          />
        </h4>
        <p>
          <FormattedMessage
            description="how add security key - paragraph 1"
            defaultMessage={`When logged in you can add and confirm security keys of your choice (provided you 
                    have access to any of these methods) in the Security area of eduID and follow the instructions.`}
          />
        </p>
        <p>
          <FormattedMessage
            description="how add security key - paragraph 2"
            defaultMessage="Note: if you have added a security key to your eduID it must be used to log in to eduID, unless you turn off this feature under Manage your security keys in Security. You might still need to use your security key if other connecting services require MFA."
          />
        </p>
        <h4>
          <FormattedMessage
            description="which type of security key - heading"
            defaultMessage="Which type of security key can I use with eduID?"
          />
        </h4>
        <p>
          <FormattedMessage
            description="which type of security key - paragraph"
            defaultMessage={`We follow a standard as well as our own policy for which security keys are allowed to be used with the service. More information on the standard as well as an updated list of valid keys can be found below.`}
          />
        </p>
        <Accordion id="eduid-security">
          <AccordionItemTemplate
            uuid="help-security-usb"
            title={<FormattedMessage description="about usb key - handle" defaultMessage="About Security Keys" />}
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage description="choosing usb key - heading" defaultMessage="Choosing a Security Key" />
              </h4>
              <p>
                <FormattedMessage
                  description="choosing usb key - paragraph"
                  defaultMessage={`Not all security keys meet the necessary specifications to be used as a security key for eduID.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="choosing usb key - list definition"
                  defaultMessage="Check with the manufacturer or retailer that the product meets the following requirements:"
                />
              </p>

              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="usb key - list item 1"
                    defaultMessage={`Certified FIDO 2.0, you can read more at {Fido}.`}
                    values={{
                      Fido: (
                        <a className="text-link" href="https://fidoalliance.org/" target="_blank" rel="noreferrer">
                          fidoalliance.org
                        </a>
                      ),
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="usb key - list item 2"
                    defaultMessage={`Releases a certificate issued by the manufacturer providing information about the device where used, as well as requiring the user physically present for the key to be used.`}
                  />
                </li>
              </ul>
              <section>
                <h5>
                  <FormattedMessage
                    description="usb key technical section - heading"
                    defaultMessage="Further technical information: "
                  />
                </h5>
                <ul className="bullets">
                  <li>
                    <FormattedMessage
                      description="usb key technical section - list item 1"
                      defaultMessage="The key must perform an attestation and exist in the metadata,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="usb key technical section - list item 2"
                      defaultMessage="it must not contain any other status in the metadata than a few variants of: "
                    />
                    &nbsp;
                    <code>
                      <FormattedMessage
                        description="usb key technical section - list item 2 code"
                        defaultMessage='"fido certified"'
                      />
                    </code>
                    ,
                  </li>
                  <li>
                    <FormattedMessage
                      description="usb key technical section - list item 3"
                      defaultMessage="it must support any of the following user verification methods: "
                    />
                    &nbsp;
                    <code>
                      <FormattedMessage
                        description="usb key technical section - list item 3 code"
                        defaultMessage='"faceprint_internal", "passcode_external", "passcode_internal", "handprint_internal",
                  "pattern_internal", "voiceprint_internal", "fingerprint_internal", "eyeprint_internal"'
                      />
                    </code>
                    ,
                  </li>
                  <li>
                    <FormattedMessage
                      description="usb key technical section - list item 4"
                      defaultMessage="and must not support any other key protection than: "
                    />
                    &nbsp;
                    <code>
                      <FormattedMessage
                        description="usb key technical section - list item 4 code"
                        defaultMessage='"remote_handle", "hardware", "secure_element", "tee"'
                      />
                    </code>
                    .
                  </li>
                </ul>
              </section>
            </article>
          </AccordionItemTemplate>
        </Accordion>
        {/* security key list */}
        {approvedSecurityKeys?.entries ? (
          <Accordion id="eduid-security-keys-list">
            <AccordionItemTemplate
              uuid="security-key-list"
              title={
                <FormattedMessage
                  defaultMessage="Currently valid physical Security Keys"
                  description="Security keys list - heading"
                />
              }
              additionalInfo={null}
            >
              <article>
                <p>
                  <FormattedMessage
                    defaultMessage={`This is a list, derived from Fido Alliance, of names of maker and models of external security keys that can be used for eduID, though there might be other keys that could work for this purpose. They are listed in alphabetical order and updated regularly.`}
                    description="Security keys list - paragraph"
                  />
                </p>
                <form>
                  <table className="keys">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Model</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedSecurityKeys?.entries.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              </article>
            </AccordionItemTemplate>
          </Accordion>
        ) : null}
      </article>
    </AccordionItemTemplate>
  );
}
