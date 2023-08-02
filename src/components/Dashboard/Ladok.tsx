import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect, useMemo, useState } from "react";
import { FieldRenderProps, Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import Select, { SingleValue } from "react-select";
import { fetchLadokUniversities, linkUser, unlinkUser } from "../../apis/eduidLadok";

interface SelectedUniProps {
  label: string;
  value: string;
}

const LadokContainer = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.isLinked);
  const [switchChecked, setSwitchChecked] = useState(isLinked);
  const dispatch = useDashboardAppDispatch();

  const handleSwitchChange = (): void => {
    // Easiest way to understand the logic in this function is to store the old switch status here.
    const wasChecked = switchChecked;
    setSwitchChecked(!switchChecked);

    if (wasChecked && isLinked) {
      dispatch(unlinkUser());
    }
  };

  // Update the switch to reflect changes in isLinked
  useEffect(() => setSwitchChecked(isLinked), [isLinked]);

  return (
    <article id="ladok-container" className="ladok">
      <h2>
        <FormattedMessage defaultMessage="Ladok information" description="Ladok account linking" />
      </h2>

      <p>
        <FormattedMessage
          defaultMessage={`Data from Ladok might give you access to more services.
                           Some higher education institutions allow eduID to fetch data from Ladok.`}
          description="Ladok account linking"
        />
      </p>

      <fieldset>
        <form>
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
        </form>
      </fieldset>
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

const LadokUniversitiesDropdown = (): JSX.Element => {
  const locale = useDashboardAppSelector((state) => state.intl.locale);
  const ladokUnis = useDashboardAppSelector((state) => state.ladok.unis);
  const fetchFailed = useDashboardAppSelector((state) => state.ladok.unisFetchFailed);
  const ladokName = useDashboardAppSelector((state) => state.ladok.ladokName);
  const dispatch = useDashboardAppDispatch();
  const intl = useIntl();

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
      dispatch(fetchLadokUniversities());
    }
  }, [ladokUnis]);

  function handleOnChange(newValue: SingleValue<SelectedUniProps>): void {
    if (newValue && newValue.value) {
      setSelected(newValue);
      dispatch(linkUser({ ladok_name: newValue.value }));
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
  }, [ladokUnis]);

  const SelectAdapter = ({ input, ...rest }: FieldRenderProps<string, HTMLElement>) => (
    <fieldset>
      <label htmlFor="ladok-universities">
        <FormattedMessage defaultMessage="Select higher education institution" description="Ladok account linking" />
      </label>
      <Select
        {...input}
        {...rest}
        onChange={handleOnChange}
        value={selected}
        isSearchable={false}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </fieldset>
  );

  return (
    <React.Fragment>
      <FinalForm
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FinalField
              name="ladok-universities"
              component={SelectAdapter}
              disabled={fetchFailed}
              options={selectOptions}
            />
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

const LadokLinkStatus = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.isLinked);
  const unis = useDashboardAppSelector((state) => state.ladok.unis);
  const ladok_name = useDashboardAppSelector((state) => state.ladok.ladokName);
  const locale = useDashboardAppSelector((state) => state.intl.locale);
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
