import React, { Fragment, useState } from "react";
import PersonalDataForm from "./PersonalDataForm";
import NameDisplay from "../DataDisplay/Name/NameDisplay";
import { translate } from "login/translation";
import { useDashboardAppSelector } from "dashboard-hooks";
import { useIntl } from "react-intl";
import EduIDButton from "../../../components/EduIDButton";

interface NameStrings {
  first: string;
  last: string;
}

interface RenderAddPersonalDataPromptProps {
  setEditMode(value: boolean): void;
}

const RenderAddPersonalDataPrompt = ({ setEditMode }: RenderAddPersonalDataPromptProps) => (
  <div className="button-pair">
    <p>{translate("pd.no_data_added")}</p>
    <EduIDButton buttonstyle="primary" id="add-personal-data" onClick={() => setEditMode(true)}>
      {translate("button_add")}
    </EduIDButton>
  </div>
);

const RenderPersonalData = (props: { names: NameStrings }) => {
  const first_name = useDashboardAppSelector((state) => state.personal_data.given_name);
  const last_name = useDashboardAppSelector((state) => state.personal_data.surname);
  const pref_language = useDashboardAppSelector((state) => state.personal_data.language);
  // if language is set render label
  const hasPrefLanguage = pref_language !== undefined && pref_language !== null;
  let languageLabel;
  if (hasPrefLanguage) {
    languageLabel = pref_language === "sv" ? translate("pd.sv_lang") : translate("pd.en_lang");
  }
  return (
    <div className="personal-data-info">
      <NameDisplay label={props.names.first} name={first_name} />
      <NameDisplay label={props.names.last} name={last_name} />
      {hasPrefLanguage ? <NameDisplay label={translate("pd.language")} name={languageLabel} /> : null}
    </div>
  );
};

interface RenderEditBoxProps {
  setEditMode(value: boolean): void;
  names: NameStrings;
}

const RenderEditBox = (props: RenderEditBoxProps) => {
  // check if verified nin
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  return (
    <Fragment>
      <div className="edit-data">
        <div className="title">
          <h4>{translate("pd.edit.title")}</h4>
          <EduIDButton buttonstyle="close" id="cancel-edit-data" onClick={() => props.setEditMode(false)} />
        </div>
        <PersonalDataForm isVerifiedNin={nin?.verified} {...props} />
      </div>
    </Fragment>
  );
};

interface RenderEditButtonProps {
  isEditMode: boolean;
  setEditMode(value: boolean): void;
  hasPersonalData: boolean;
}

const RenderEditButton = ({ setEditMode, hasPersonalData, isEditMode }: RenderEditButtonProps) => (
  <Fragment>
    {isEditMode ||
      (hasPersonalData && (
        <EduIDButton buttonstyle="link" className="lowercase" onClick={() => setEditMode(true)}>
          {translate("pd.edit.button")}
        </EduIDButton>
      ))}
  </Fragment>
);

const PersonalDataParent = () => {
  const [isEditMode, setEditMode] = useState(false);
  // check if any data
  const personal_data = useDashboardAppSelector((state) => state.personal_data);
  // TODO: I think this can be... simplified as "const hasPersonalData = (personal_data.eppn !== undefined);"
  const hasPersonalData = Object.entries(personal_data)
    .filter((entry) => entry[0] !== "eppn")
    .some((entry) => entry[1] !== undefined);

  const intl = useIntl();
  // Field placeholders can't be Elements, we need to get the actual translated strings
  //  to use as placeholder/label throughout these components
  const names: NameStrings = {
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
  };

  return (
    <article className="personal-data">
      <div className="intro">
        <div className="heading">
          <h3>{translate("pd.main_title")}</h3>
          <RenderEditButton hasPersonalData={hasPersonalData} setEditMode={setEditMode} isEditMode={isEditMode} />
        </div>
        <p>{translate("pd.long_description")}</p>
        <Fragment>
          {!hasPersonalData && !isEditMode ? <RenderAddPersonalDataPrompt setEditMode={setEditMode} /> : null}
          {hasPersonalData && !isEditMode ? <RenderPersonalData names={names} /> : null}
          {isEditMode && <RenderEditBox setEditMode={setEditMode} names={names} />}
        </Fragment>
      </div>
    </article>
  );
};

export default PersonalDataParent;
