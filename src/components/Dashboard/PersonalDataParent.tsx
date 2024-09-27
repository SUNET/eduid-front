import EduIDButton from "components/Common/EduIDButton";
import PersonalDataForm from "components/Common/PersonalDataForm";
import { useAppSelector } from "eduid-hooks";
import { Fragment, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import NameDisplay from "./NameDisplay";

export interface NameLabels {
  // These are translated labels for "First" and "Last" name input- or text-fields
  first: string;
  last: string;
  display_name: string;
}

interface RenderAddPersonalDataPromptProps {
  setEditMode(value: boolean): void;
}

function RenderAddPersonalDataPrompt({ setEditMode }: RenderAddPersonalDataPromptProps) {
  return (
    <div className="button-pair">
      <p>
        <FormattedMessage defaultMessage="No information has been added." description="pd no data added" />
      </p>
      <EduIDButton buttonstyle="primary" id="add-personal-data" onClick={() => setEditMode(true)}>
        <FormattedMessage defaultMessage="add" description="button add" />
      </EduIDButton>
    </div>
  );
}

function RenderPersonalData(props: { labels: NameLabels }) {
  const first_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const last_name = useAppSelector((state) => state.personal_data.response?.surname);
  const chosen_given_name = useAppSelector((state) => state.personal_data.response?.chosen_given_name);
  const is_verified = useAppSelector((state) => state.personal_data?.response?.identities?.is_verified);
  const displayName =
    chosen_given_name && last_name ? `${chosen_given_name} ${last_name}` : `${first_name} ${last_name}`;

  return (
    <div className="personal-data-info">
      <NameDisplay htmlFor="first name" label={props.labels.first} name={first_name} />
      <NameDisplay htmlFor="last name" label={props.labels.last} name={last_name} />
      {is_verified && <NameDisplay htmlFor="display name" label={props.labels.display_name} name={displayName} />}
    </div>
  );
}

interface RenderEditBoxProps {
  setEditMode(value: boolean): void;
  readonly labels: NameLabels;
}

function RenderEditBox(props: RenderEditBoxProps) {
  const identities = useAppSelector((state) => state.personal_data?.response?.identities);
  const isVerifiedIdentity = Boolean(identities?.is_verified);

  return (
    <div className="edit-data">
      <div className="title">
        <h4>
          <FormattedMessage defaultMessage="Edit name and language" description="personal data edit title" />
        </h4>
        <EduIDButton buttonstyle="close" id="cancel-edit-data" onClick={() => props.setEditMode(false)} />
      </div>
      <PersonalDataForm isVerifiedIdentity={isVerifiedIdentity} {...props} />
    </div>
  );
}

interface RenderEditButtonProps {
  readonly isEditMode: boolean;
  setEditMode(value: boolean): void;
  readonly hasPersonalData: boolean;
}

function RenderEditButton({ setEditMode, hasPersonalData, isEditMode }: RenderEditButtonProps) {
  return (
    <Fragment>
      {isEditMode ||
        (hasPersonalData && (
          <EduIDButton buttonstyle="link" className="lowercase" onClick={() => setEditMode(true)}>
            <FormattedMessage description="edit button" defaultMessage={`edit`} />
          </EduIDButton>
        ))}
    </Fragment>
  );
}

function PersonalDataParent() {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  // check if any data
  const personal_data = useAppSelector((state) => state.personal_data);
  const hasPersonalData = Boolean(personal_data?.response?.given_name) || Boolean(personal_data?.response?.surname);
  const intl = useIntl();
  // Field placeholders can't be Elements, we need to get the actual translated strings
  //  to use as placeholder/label throughout these components
  const names: NameLabels = {
    first: intl.formatMessage({
      id: "pd.given_name",
      defaultMessage: "First name",
      description: "First name label/template (edit personal data)",
    }),
    last: intl.formatMessage({
      id: "pd.surname",
      defaultMessage: "Last name",
      description: "Last name label/template (edit personal data)",
    }),
    display_name: intl.formatMessage({
      id: "pd.display_name",
      defaultMessage: "Display name",
      description: "Display name label/template (edit personal data)",
    }),
  };

  return (
    <article className="personal-data">
      <div className="heading">
        <h2>
          <FormattedMessage description="pd main title" defaultMessage={`Names & Display Name`} />
        </h2>
        <RenderEditButton hasPersonalData={hasPersonalData} setEditMode={setEditMode} isEditMode={isEditMode} />
      </div>
      <p>
        <FormattedMessage
          description="pd long description"
          defaultMessage="This information may be used to personalise services that you access with your eduID."
        />
      </p>
      {!hasPersonalData && !isEditMode ? <RenderAddPersonalDataPrompt setEditMode={setEditMode} /> : null}
      {hasPersonalData && !isEditMode ? <RenderPersonalData labels={names} /> : null}
      {isEditMode && <RenderEditBox setEditMode={setEditMode} labels={names} />}
    </article>
  );
}

export default PersonalDataParent;
