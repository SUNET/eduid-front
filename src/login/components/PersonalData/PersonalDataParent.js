import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
// import PersonalDataForm from "../../../containers/PersonalData";
import PersonalDataForm from "../../../components/PersonalData";
import NameDisplay from "../DataDisplay/Name/NameDisplay";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import { CloseButton } from "../../components/GroupManagement/Groups/CreateGroup";

const RenderAddPersonalDataPrompt = ({ translate, setEditMode }) => (
  <div className="button-pair">
    <p>{translate("pd.no_data_added")}</p>
    <ButtonPrimary id="add-personal-data" onClick={() => setEditMode(true)}>
      {translate("button_add")}
    </ButtonPrimary>
  </div>
);

const RenderPersonalData = ({ translate }) => {
  const first_name = useSelector(
    (state) => state.personal_data.data.given_name
  );
  const last_name = useSelector((state) => state.personal_data.data.surname);
  const display_name = useSelector(
    (state) => state.personal_data.data.display_name
  );
  // get language label from language code
  const pref_language = useSelector(
    (state) => state.personal_data.data.language
  );
  const prefLanguageLabel = AVAILABLE_LANGUAGES.filter(
    (lang) => lang[0] === pref_language
  );
  const languageLabel = prefLanguageLabel[0][1];
  return (
    <div className="personal-data-info">
      <NameDisplay label={translate("pd.given_name")} name={first_name} />
      <NameDisplay label={translate("pd.surname")} name={last_name} />
      <NameDisplay label={translate("pd.display_name")} name={display_name} />
      <NameDisplay label={translate("pd.language")} name={languageLabel} />
    </div>
  );
};

const RenderEditBox = (props) => {
  // check if verified nin
  const nins = useSelector((state) => state.nins.nins);
  const isVerifiedNin = nins.some((nin) => nin.verified);
  return (
    <Fragment>
      <div className="edit-data">
        <div className="title button-pair">
          <p>{props.translate("pd.edit.title")}</p>
          <button
            type="button"
            className="save-button"
            onClick={() => props.setEditMode(false)}
          >
            <CloseButton />
          </button>
        </div>
        <PersonalDataForm
          setEditMode={props.setEditMode}
          isVerifiedNin={isVerifiedNin}
          {...props}
        />
      </div>
    </Fragment>
  );
};

const RenderEditButton = ({
  setEditMode,
  hasPersonalData,
  isEditMode,
  translate,
}) => (
  <Fragment>
    {isEditMode ||
      (hasPersonalData && (
        <button className="create-group" onClick={() => setEditMode(true)}>
          {translate("pd.edit.button")}
        </button>
      ))}
  </Fragment>
);

const PersonalDataParent = (props) => {
  const [isEditMode, setEditMode] = useState(false);
  // check if any data
  const personal_data = useSelector((state) => state.personal_data.data);
  const hasPersonalData = Object.entries(personal_data)
    .filter((entry) => entry[0] !== "eppn")
    .some((entry) => entry[1].length > 0);
  return (
    <article className="personal-data">
      <div className="intro">
        <div className="heading">
          <h4>{props.translate("pd.main_title")}</h4>
          <RenderEditButton
            hasPersonalData={hasPersonalData}
            setEditMode={setEditMode}
            isEditMode={isEditMode}
            {...props}
          />
        </div>
        <p>{props.translate("pd.long_description")}</p>
        <Fragment>
          {!hasPersonalData && !isEditMode ? (
            <RenderAddPersonalDataPrompt
              setEditMode={setEditMode}
              isEditMode={isEditMode}
              {...props}
            />
          ) : null}
          {hasPersonalData && !isEditMode ? (
            <RenderPersonalData {...props} />
          ) : null}
          {isEditMode && (
            <RenderEditBox
              setEditMode={setEditMode}
              isEditMode={isEditMode}
              {...props}
            />
          )}
        </Fragment>
      </div>
    </article>
  );
};

PersonalDataParent.propTypes = {
  data: PropTypes.object,
  langs: PropTypes.array,
};

export default InjectIntl(PersonalDataParent);
