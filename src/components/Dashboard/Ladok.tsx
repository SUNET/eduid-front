import { ladokApi } from "apis/eduidLadok";
import { useAppSelector } from "eduid-hooks";
import React, { useEffect, useMemo, useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import Select, { SingleValue } from "react-select";

interface SelectedUniProps {
  label: string;
  value: string;
}

const LadokContainer = (): React.JSX.Element => {
  const isLinked = useAppSelector((state) => state.ladok.isLinked);
  const [switchChecked, setSwitchChecked] = useState(isLinked);
  const [unlinkUser] = ladokApi.useLazyUnlinkUserQuery();

  const handleSwitchChange = (): void => {
    // Easiest way to understand the logic in this function is to store the old switch status here.
    const wasChecked = switchChecked;
    setSwitchChecked(!switchChecked);

    if (wasChecked && isLinked) {
      unlinkUser();
    }
  };

  // Update the switch to reflect changes in isLinked
  useEffect(() => setSwitchChecked(isLinked), [isLinked]);

  return (
    <article className="ladok" id="ladok">
      <h2>
        <FormattedMessage defaultMessage="ESI information" description="Ladok account linking" />
      </h2>

      <p>
        <FormattedMessage
          defaultMessage={`Data from Ladok might give you access to more services.
                           Some higher education institutions allow eduID to fetch data from Ladok.`}
          description="Ladok account linking"
        />
      </p>

      <form>
        <fieldset>
          <label className="toggle flex-between" htmlFor="ladok-connection">
            <legend>
              <FormattedMessage defaultMessage={`Link your account to Ladok`} description="Ladok account linking" />
            </legend>
            <input
              onChange={handleSwitchChange}
              className="toggle-checkbox"
              type="checkbox"
              checked={switchChecked}
              id="ladok-connection"
            />
            <div className="toggle-switch"></div>
          </label>
        </fieldset>
      </form>
      {switchChecked ? <LadokLinkStatus /> : undefined}
      {switchChecked ? <LadokUniversitiesDropdown /> : undefined}
      <p className="help-text">
        <FormattedMessage
          defaultMessage={`Linking your eduID account with data from Ladok is necessary
                           if you want to access a service requiring a European Student Identifier.`}
          description="Ladok account linking"
        />
      </p>
    </article>
  );
};

const LadokUniversitiesDropdown = (): React.JSX.Element => {
  const locale = useAppSelector((state) => state.intl.locale);
  const ladokUnis = useAppSelector((state) => state.ladok.unis);
  const fetchFailed = useAppSelector((state) => state.ladok.unisFetchFailed);
  const ladokName = useAppSelector((state) => state.ladok.ladokName);
  const intl = useIntl();
  const [fetchLadokUniversities] = ladokApi.useLazyFetchLadokUniversitiesQuery();
  const [linkUser] = ladokApi.useLazyLinkUserQuery();

  const placeholder = intl.formatMessage({
    id: "ladok.dropdown_placeholder",
    defaultMessage: "Available higher education institutions",
    description: "Ladok account linking",
  });
  // if no university is selected, select box label will be placeholder
  const [selected, setSelected] = useState<SelectedUniProps>({ label: placeholder, value: "" });

  useEffect(() => {
    if (ladokUnis === undefined) {
      // initiate fetching of universities metadata when the user indicates they
      // are interested in linking their account
      fetchLadokUniversities();
    }
  }, [ladokUnis]);

  function handleOnChange(newValue: SingleValue<SelectedUniProps>): void {
    if (newValue?.value) {
      setSelected(newValue);
      linkUser({ ladok_name: newValue.value });
    }
  }

  // Convert ladokUnis to an array of SelectedUniProps that works with the Select component
  const selectOptions: SelectedUniProps[] = useMemo(() => {
    if (ladokUnis === undefined) {
      return [];
    }

    const res: SelectedUniProps[] = [];

    Object.values(ladokUnis).forEach((item) => {
      // Get the name of the university in the users locale, fallback to English and then to ladok_name.
      const localised = item.name[locale] || item.name.en || item.ladok_name;
      const curr: SelectedUniProps = { label: localised, value: item.ladok_name };

      // initialise 'selected'
      if (item.ladok_name == ladokName) {
        setSelected(curr);
      }

      res.push(curr);
    });

    return res;
  }, [ladokUnis, ladokName, locale]);

  return (
    <React.Fragment>
      <FinalForm
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <span className="form-label">
                <FormattedMessage
                  defaultMessage="Select higher education institution"
                  description="Ladok account linking"
                />
              </span>
              <Select
                isDisabled={fetchFailed}
                options={selectOptions}
                onChange={handleOnChange}
                value={selected}
                isSearchable={false}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </fieldset>
          </form>
        )}
      />

      <div className="ladok-universities-status">
        {fetchFailed ? (
          <FormattedMessage
            defaultMessage="The list of higher education institutions could not be loaded at this time"
            description="Ladok account linking"
          />
        ) : undefined}
      </div>
    </React.Fragment>
  );
};

const LadokLinkStatus = (): React.JSX.Element => {
  const isLinked = useAppSelector((state) => state.ladok.isLinked);
  const unis = useAppSelector((state) => state.ladok.unis);
  const ladok_name = useAppSelector((state) => state.ladok.ladokName);
  const locale = useAppSelector((state) => state.intl.locale);
  // Initial university name will be empty string until information has been updated
  let university_name = "";
  if (unis && ladok_name && unis[ladok_name]) {
    if (locale) {
      const uni = unis[ladok_name];
      if (uni.name[locale]) {
        university_name = uni.name[locale];
      } else if (uni.name.en) {
        university_name = uni.name.en;
      }
    }
  }

  return (
    <React.Fragment>
      {isLinked === true ? (
        <fieldset>
          <div className="ladok-university flex-between">
            <label>
              <FormattedMessage
                defaultMessage="Your account is linked with Ladok information from"
                description="Ladok account linking"
              />
            </label>
            <div className="text-large ladok-university-name">{university_name}</div>
          </div>
        </fieldset>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default LadokContainer;
