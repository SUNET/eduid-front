import { Accordion, AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

export function VerificationOfIdentity(): React.JSX.Element {
  const locale = useAppSelector((state) => state.intl.locale);
  const FrejaProtectedIdURL =
    locale === "en"
      ? " https://frejaeid.com/en/freja-for-swedes-with-protected-identities/"
      : "https://frejaeid.com/freja-for-svenskar-med-skyddad-identitet/";
  const FrejaAppURL =
    locale === "en" ? "https://frejaeid.com/en/get-freja-eid/" : "https://frejaeid.com/skaffa-freja-eid/";
  const FrejaeIdURL =
    locale === "en"
      ? "https://org.frejaeid.com/en/an-e-id-for-foreign-citizens/"
      : "https://org.frejaeid.com/en-e-legitimation-for-utlandska-medborgare/";
  const BankIdURL =
    locale === "en" ? "https://www.bankid.com/en/privat/skaffa-bankid" : "https://www.bankid.com/privat/skaffa-bankid";

  return (
    <AccordionItemTemplate
      uuid="help-verification"
      title={
        <FormattedMessage
          id="verifyIdentity.verificationHandle"
          description="about verification of identity - handle"
          defaultMessage="Verification of Identity"
        />
      }
      additionalInfo={
        <FormattedMessage
          id="verifyIdentity.info"
          description="about verification of identity - info"
          defaultMessage="Methods of verifying eduID for different user groups"
        />
      }
    >
      <article>
        <h4>
          <FormattedMessage
            id="verifyIdentity.whichHeading"
            description="which verification methods - heading"
            defaultMessage="What are the methods of verification for eduID?"
          />
        </h4>
        <p>
          <FormattedMessage
            id="verifyIdentity.whichVerification"
            description="which verification methods - paragraph1"
            defaultMessage={`The service is constantly being developed to better support the needs of our various 
                  users. At present the methods below are available, depending on your situation such as assurance 
                  level requirements, nationality and residence.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="verifyIdentity.which"
            description="which verification methods - paragraph2"
            defaultMessage="Note: you can remove a verified identity connected to your eduID in the Identity area."
          />
        </p>
        <section>
          <p>
            <strong>
              <FormattedMessage
                id="verifyIdentity.swedish"
                description="swedish nin - heading"
                defaultMessage="If you have a Swedish personal identity number or coordination number"
              />
            </strong>
            <FormattedMessage
              id="verifyIdentity.verification"
              description="verification methods - list definition"
              defaultMessage=", verifying it can be done via:"
            />
          </p>
          <ul className="bullets">
            <li>
              <em>
                <FormattedMessage
                  id="verifyIdentity.swedishNin"
                  description="swedish nin post - heading"
                  defaultMessage="post - for Swedish personal identity number holders:"
                />
              </em>
              &nbsp;
              <FormattedMessage
                id="verifyIdentity.verification1"
                description="verification methods - list item 1"
                defaultMessage={` the user receives a letter with a code sent to their home address as 
                      registered at Skatteverket (the Swedish Tax Agency), and instructions on how to complete the 
                      verification on eduid.se,`}
              />
            </li>
            <li>
              <em>
                <FormattedMessage
                  id="verifyIdentity.swedishHeading"
                  description="swedish nin freja - heading"
                  defaultMessage="Freja+ (digital ID) - for Swedish personal identity or coordination number holders:"
                />
              </em>
              &nbsp;
              <FormattedMessage
                id="verifyIdentity.frejaYgw"
                description="verification methods - list item 3"
                defaultMessage={` the user will be directed to the Freja eID website to
                      use their service. If you don't have Freja+ you have to create it separately before you can
                      complete verification of your eduID. Read more about Freja below.`}
              />
            </li>
            <li>
              <em>
                <FormattedMessage
                  id="verifyIdentity.swedishNinHeading"
                  description="swedish nin bankid - heading"
                  defaultMessage="BankID (electronic identification system) - for Swedish personal identity number holders:"
                />
              </em>
              &nbsp;
              <FormattedMessage
                id="verifyIdentity.bankid"
                description="verification methods - list item 3"
                defaultMessage={` the user will be asked to verify themself using their BankID service. If you don't 
                  have BankID you have to create it separately before you can complete verification of your eduID. 
                  Read more about BankID below.`}
              />
            </li>
          </ul>
          <p>
            <FormattedMessage
              id="verifyIdentity.frejaParagraph1"
              description="freja - protected I paragraph 1"
              defaultMessage={`Note: {strong} you can verify it using {emphasis}, by getting Freja eID and verifying your 
                Swedish passport visiting an authorised ATG agent.`}
              values={{
                strong: (
                  <strong>
                    <FormattedMessage
                      id="verifyIdentity.freja"
                      description="freja - protected strong"
                      defaultMessage="If you have a protected identity "
                    />
                  </strong>
                ),
                emphasis: <em>Freja+</em>,
              }}
            />
            <br />
            <FormattedMessage
              id="verifyIdentity.paragraph2"
              description="freja - protected ID paragraph 2"
              defaultMessage={`You can read more about using Freja with your eduID below in the "About Freja 
                (with Swedish ID/COORD number)" section and on their website at {FrejaProtectedId}.`}
              values={{
                FrejaProtectedId: (
                  <a href={FrejaProtectedIdURL} target="_blank" rel="noreferrer">
                    <FormattedMessage
                      id="verifyIdentity.link"
                      description="use freja protected id - link text"
                      defaultMessage="freja-for-swedes-with-protected-identities"
                    />
                  </a>
                ),
              }}
            />
          </p>
        </section>
        <section>
          <p>
            <strong>
              <FormattedMessage
                id="verifyIdentity.methodHeading"
                description="method eidas - heading"
                defaultMessage="If you are an EU citizen and without a Swedish personal identity number"
              />
            </strong>
            <FormattedMessage
              id="verifyIdentity.methodEidasParagraph"
              description="method eidas - paragraph"
              defaultMessage=", you could use {emphasis} to verify your identity. Read more about eIDAS below."
              values={{
                emphasis: <em>eIDAS</em>,
              }}
            />
          </p>
        </section>
        <section>
          <p>
            <strong>
              <FormattedMessage
                id="verifyIdentity.methodInternationalHeading"
                description="method international - heading"
                defaultMessage="If you are not an EU citizen and without a Swedish personal identity number"
              />
            </strong>
            <FormattedMessage
              id="verifyIdentity.methodParagraph"
              description="method international - paragraph"
              defaultMessage={`, you could use {emphasis} to verify your identity using your passport. 
                    Read more about Freja below.`}
              values={{
                emphasis: <em>Freja</em>,
              }}
            />
          </p>
          <p className="error-txt">
            <FormattedMessage
              id="verifyIdentity.error"
              description="freja - error"
              defaultMessage={`Note: not all nationalities are yet supported by this solution but the work to substantially 
                increase the range is in progress.`}
            />
          </p>
        </section>
      </article>

      <Accordion id="eduid-verification">
        <AccordionItemTemplate
          uuid="help-freja"
          title={
            <FormattedMessage
              id="verifyIdentity.handle"
              description="about freja - handle"
              defaultMessage="About Freja (with Swedish ID/COORD number)"
            />
          }
          additionalInfo={null}
        >
          <article>
            <h4>
              <FormattedMessage id="common.whatIsFreja" description="what is freja - heading" defaultMessage="What is Freja+?" />
            </h4>
            <p>
              <FormattedMessage
                id="verifyIdentity.frejaParagraph"
                description="what is freja - paragraph"
                defaultMessage={`Freja+ is a digital ID (a verified Freja eID) free of charge, available to 
                      holders of a Swedish personal identification number or coordination number.`}
              />
            </p>
            <p>
              <FormattedMessage
                id="verifyIdentity.useFreja"
                description="use freja - list definition"
                defaultMessage="How to use Freja+ with eduID:"
              />
            </p>

            <ul className="bullets">
              <li>
                <FormattedMessage
                  id="verifyIdentity.use1"
                  description="use freja - list item 1"
                  defaultMessage={`install the {Freja}  on your mobile device (iOS or Android) and create a 
                        Freja+ account according to the instructions,`}
                  values={{
                    Freja: (
                      <a href={FrejaAppURL} target="_blank" rel="noreferrer">
                        <FormattedMessage id="verifyIdentity.useLink" description="use freja - link text" defaultMessage={`Freja app`} />
                      </a>
                    ),
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  id="verifyIdentity.use2"
                  description="use freja - list item 2"
                  defaultMessage={`if you have a valid Swedish passport you can complete the verification of your 
                        account in the app using your device camera, or bring a valid ID (including drivers license or 
                          ID card) to the nearest ATG agent authorised to verify your identity,`}
                />
              </li>
              <li>
                <FormattedMessage
                  id="verifyIdentity.use3"
                  description="use freja - list item 3"
                  defaultMessage={`log in to eduID and choose the 'Freja+ digital ID' option in the Identity area 
                        and follow the instructions.`}
                />
              </li>
            </ul>

            <h4>
              <FormattedMessage
                id="verifyIdentity.needHeading"
                description="need visit atg agent for freja - heading"
                defaultMessage="Do I need to visit an authorised ATG agent to create Freja+?"
              />
            </h4>
            <p>
              <FormattedMessage
                id="verifyIdentity.needParagraph"
                description="need visit atg agent for freja - paragraph"
                defaultMessage={`Only if you use another means of identification than a Swedish passport, {protectedId}. 
                      On site, the agent can start the verification process by scanning a QR code in your 
                    app and follow the instructions in their terminal. You will be informed when you have passed the 
                    ID verification and will be able use your Freja+ with your eduID. It can take up to three hours for 
                    your Freja+ to be fully activated.`}
                values={{
                  protectedId: (
                    <strong>
                      <FormattedMessage
                        id="verifyIdentity.need"
                        description="need visit atg agent for freja - strong"
                        defaultMessage="or if you have a protected identity"
                      />
                    </strong>
                  ),
                }}
              />
            </p>

            <h4>
              <FormattedMessage
                id="verifyIdentity.verificationHeading"
                description="what if verification for freja fails - heading"
                defaultMessage="What should I do if my identity verification for Freja+ fails?"
              />
            </h4>

            <p>
              <FormattedMessage
                id="verifyIdentity.paragraph"
                description="what if verification for freja fails - paragraph"
                defaultMessage={`Reinstall the app, redo the registration and make sure that you have entered the 
                    correct expiration date as well as the correct reference number of the chosen form of 
                    ID and personal identity number or coordination number.`}
              />
            </p>
          </article>
        </AccordionItemTemplate>
        <AccordionItemTemplate
          uuid="help-bankid"
          title={<FormattedMessage id="verifyIdentity.bankidHandle" description="about bankid - handle" defaultMessage="About BankID" />}
          additionalInfo={null}
        >
          <article>
            <h4>
              <FormattedMessage id="verifyIdentity.bankidHeading" description="what is bankid - heading" defaultMessage="What is BankID?" />
            </h4>
            <p>
              <FormattedMessage
                id="verifyIdentity.bankidParagraph"
                description="what is bankid - paragraph"
                defaultMessage={`BankID is a widely used electronic verification system, available to 
                      holders of a Swedish personal identification number, an approved Swedish ID document (e.g. passport, drivers license or ID card) and connected to a bank in Sweden.`}
              />
            </p>
            <p>
              <FormattedMessage
                id="verifyIdentity.useBankid"
                description="use bankid - list definition"
                defaultMessage="How to use BankID with eduID:"
              />
            </p>

            <ul className="bullets">
              <li>
                <FormattedMessage
                  id="verifyIdentity.useBankid1"
                  description="use bankid - list item 1"
                  defaultMessage={`the BankID is obtained from your personal bank and installed on your device as an app or file. The process varies, so visit your bank's website and follow the instructions. You can read more about obtaining a BankID on {bankid},`}
                  values={{
                    bankid: (
                      <a href={BankIdURL} target="_blank" rel="noreferrer">
                        BankID.com
                      </a>
                    ),
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  id="verifyIdentity.useBankid2"
                  description="use bankid - list item 2"
                  defaultMessage={`log in to eduID and choose the 'Electronic BankID' option in the Identity area 
                        and follow the instructions.`}
                />
              </li>
            </ul>
          </article>
        </AccordionItemTemplate>
        <AccordionItemTemplate
          uuid="help-eidas"
          title={<FormattedMessage id="verifyIdentity.eidasHandle" description="about eidas - handle" defaultMessage="About eIDAS" />}
          additionalInfo={null}
        >
          <article>
            <h4>
              <FormattedMessage id="verifyIdentity.eidasHeading" description="what is eidas - heading" defaultMessage="What is eIDAS?" />
            </h4>
            <p>
              <FormattedMessage
                id="verifyIdentity.eidasParagraph"
                description="what is eidas - paragraph"
                defaultMessage={`eIDAS is a federation of EU countries providing electronic identification to allow 
                    access to public authority systems for EU citizens, using their country's electronic ID.`}
              />
            </p>
            <p>
              <FormattedMessage
                id="verifyIdentity.useEidas"
                description="use eidas - list definition"
                defaultMessage="How to use eIDAS with eduID:"
              />
            </p>
            <ul className="bullets">
              <li>
                <FormattedMessage
                  id="verifyIdentity.useEidas1"
                  description="use eidas - list item 1"
                  defaultMessage={`make sure you have an electronic ID from a connected country to have the possibility to 
                      authenticate yourself via eIDAS,`}
                />
              </li>
              <li>
                <FormattedMessage
                  id="verifyIdentity.useEidas2"
                  description="use eidas - list item 2"
                  defaultMessage={`to verify your identity in eduID, log in and choose the verification method for 
                      'EU-citizens' in the Identity area and follow the instructions.`}
                />
              </li>
            </ul>
            <p>
              <FormattedMessage
                id="verifyIdentity.eidasPersonalParagraph"
                description="eidas if personal number - paragraph"
                defaultMessage={`If you have a Swedish personal identity number, use that method instead e.g. to 
                      simplify communication with Swedish authorities. Note: if you initially verify your identity with 
                      eIDAS and later receive a Swedish personal identity number you can add it in eduID and verify 
                      yourself again using it in the Identity area.`}
              />
            </p>
          </article>
        </AccordionItemTemplate>
        <AccordionItemTemplate
          uuid="help-international"
          title={
            <FormattedMessage
              id="verifyIdentity.internationalHandle"
              description="about international - handle"
              defaultMessage="About Freja (outside EU and without Swedish ID/COORD number)"
            />
          }
          additionalInfo={null}
        >
          <article id="international">
            <h4>
              <FormattedMessage id="verifyIdentity.heading" description="what is international - heading" defaultMessage="What is Freja?" />
            </h4>
            <p>
              <FormattedMessage
                id="verifyIdentity.paragraph1"
                description="what is international - paragraph 1"
                defaultMessage={`Freja is an eID based on an identity verification platform using biometric passports, 
                  combined with the users mobile device to create a verified digital identity than can be used remotely.`}
              />
            </p>

            <p>
              <FormattedMessage
                id="verifyIdentity.internationalParagraph2"
                description="what is international - paragraph 2"
                defaultMessage={`Current information on included nationalities can be found at: {FrejaList}`}
                values={{
                  FrejaList: (
                    <a href={FrejaeIdURL} target="_blank" rel="noreferrer">
                      Freja eID
                    </a>
                  ),
                }}
              />
            </p>

            <p>
              <FormattedMessage
                id="verifyIdentity.use"
                description="use international - list definition"
                defaultMessage="How to use Freja with eduID:"
              />
            </p>
            <ul className="bullets">
              <li>
                <FormattedMessage
                  id="verifyIdentity.useInternational1"
                  description="use international - list item 1"
                  defaultMessage={`to verify your eduID using Freja you first need to get a Freja account with a verified
                         profile supported by your passport, by installing the {FrejaApp} on your mobile device (iOS or Android) 
                         and following the instructions,`}
                  values={{
                    FrejaApp: (
                      <a href={FrejaAppURL} target="_blank" rel="noreferrer">
                        <FormattedMessage id="verifyIdentity.useLink" description="use freja - link text" defaultMessage={`Freja app`} />
                      </a>
                    ),
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  id="verifyIdentity.useInternational2"
                  description="use international - list item 2"
                  defaultMessage={`login to eduID and scan the QR code produced by Freja from the 'Other 
                        countries' section in the Identity area of eduID by following the instructions.`}
                />
              </li>
            </ul>
            <p>
              <FormattedMessage
                id="verifyIdentity.internationalParagraph"
                description="international if personal number - paragraph"
                defaultMessage={`Note: holders of Swedish personal identity numbers or EU citizens are advised to use 
                  those supported methods instead.`}
              />
            </p>
          </article>
        </AccordionItemTemplate>
      </Accordion>
    </AccordionItemTemplate>
  );
}
