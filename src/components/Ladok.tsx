import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { fetchLadokUniversities, linkUser, unlinkUser } from "../apis/eduidLadok";
import { Form as FinalForm, Field } from "react-final-form";
import Select from "react-select";

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
      <h3 className="heading-4">
        <FormattedMessage defaultMessage="Ladok information" description="Ladok account linking" />
      </h3>

      <p>
        <FormattedMessage
          defaultMessage={`Data from Ladok might give you access to more services.
                           Some higher education institutions allow eduID to fetch data from Ladok.`}
          description="Ladok account linking"
        />
      </p>

      <fieldset>
        <label className="toggle flex-between" htmlFor="ladok-connection">
          <span>
            <FormattedMessage defaultMessage={`Link your account to Ladok`} description="Ladok account linking" />
          </span>
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
      <fieldset>{switchChecked ? <LadokLinkStatus /> : undefined}</fieldset>
      <fieldset>{switchChecked ? <LadokUniversitiesDropdown /> : undefined}</fieldset>
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
  const ladok_name = useDashboardAppSelector((state) => state.ladok.ladokName);
  const [selectUni, setSelectUni] = useState(ladok_name);

  const dispatch = useDashboardAppDispatch();
  const intl = useIntl();

  const placeholder = intl.formatMessage({
    id: "ladok.dropdown_placeholder",
    defaultMessage: "Available higher education institutions",
    description: "Ladok account linking",
  });

  useEffect(() => {
    if (ladokUnis === undefined) {
      // initiate fetching of universities metadata when the user indicates they
      // are interested in linking their account
      dispatch(fetchLadokUniversities());
    }
  }, [ladokUnis]);

  function handleOnChange(selectedUni: SelectedUniProps): void {
    const ladok_name = selectedUni.value;
    if (ladok_name) {
      dispatch(linkUser({ ladok_name }));
      setSelectUni(ladok_name);
    }
  }

  // populate dropdown list of universities
  const unis: object[] = [];
  if (ladokUnis !== undefined) {
    Object.values(ladokUnis).forEach((item) => {
      // Get the name of the university in the users locale, fallback to English and then to ladok_name.
      const uni_name = item.name[locale] || item.name.en || item.ladok_name;
      unis.push({ label: uni_name, value: item.ladok_name });
    });
  }

  //TODO: add specific type for rest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SelectAdapter = ({ input, ...rest }: any) => <Select {...input} {...rest} isSearchable={false} />;

  return (
    <React.Fragment>
      {/* <label htmlFor="ladok-universities">
        <FormattedMessage defaultMessage="Select higher education institution" description="Ladok account linking" />
      </label>
      <select value={selectUni} onChange={handleOnChange} disabled={fetchFailed}>
        <option hidden value="">
          {placeholder}
        </option>
        {unis}
      </select> */}
      <FinalForm
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="ladok"
              component={SelectAdapter}
              placeholder={placeholder}
              value={selectUni}
              onChange={handleOnChange}
              disabled={fetchFailed}
              options={unis.length ? unis : null}
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

  let university_name = "unknown";
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
        <fieldset className="ladok-university flex-between">
          <label>
            <FormattedMessage
              defaultMessage="Your account is linked with Ladok information from"
              description="Ladok account linking"
            />
          </label>
          <div className="text-large ladok-university-name">{university_name}</div>
        </fieldset>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default LadokContainer;
