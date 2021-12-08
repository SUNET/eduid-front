import React, { useEffect, useState } from "react";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { fetchLadokUniversities, linkUser, unlinkUser } from "../apis/eduidLadok";
import { useIntl } from "react-intl";

const LadokContainer = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.linked);
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
    <article id="ladok-container" className="ladok-container">
      <h3 className="heading-4">
        <FormattedMessage defaultMessage="Ladok information" description="Ladok account linking" />
      </h3>

      <p>
        <FormattedMessage
          defaultMessage={`Data from Ladok might give you access to more services.
                          Some universities allow eduID to fetch data from Ladok.`}
          description="Ladok account linking"
        />
      </p>

      <fieldset>
        <label className="toggle flex-between" htmlFor="ladok-connection">
          <span>Link your account to Ladok</span>
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

      <fieldset>
        {switchChecked ? <LadokUniversitiesDropdown /> : undefined}
        {switchChecked ? <LadokLinkStatus /> : undefined}
      </fieldset>

      <p className="help-text">
        <FormattedMessage
          defaultMessage={`Linking your eduID account with data from Ladok is necessary
                                if you want to access a service requiring a European Student Identifier`}
          description="Ladok account linking"
        />
      </p>
    </article>
  );
};

const LadokUniversitiesDropdown = (): JSX.Element => {
  const locale = useDashboardAppSelector((state) => state.intl.locale);
  const ladokUnis = useDashboardAppSelector((state) => state.ladok.unis);
  const fetchFailed = useDashboardAppSelector((state) => state.ladok.unis_fetch_failed);

  const dispatch = useDashboardAppDispatch();
  const intl = useIntl();

  const placeholder = intl.formatMessage({
    id: "ladok.dropdown_placeholder",
    defaultMessage: "Choose your university",
    description: "Ladok account linking",
  });

  useEffect(() => {
    if (ladokUnis === undefined) {
      // initiate fetching of universities metadata when the user indicates they
      // are interested in linking their account
      dispatch(fetchLadokUniversities());
    }
  }, [ladokUnis]);

  function handleOnChange(e: React.SyntheticEvent): void {
    const ladok_name = (e.target as HTMLTextAreaElement).value;
    if (ladok_name) {
      dispatch(linkUser({ ladok_name }));
    }
  }

  // populate dropdown list of universities
  const unis: JSX.Element[] = [];
  if (ladokUnis !== undefined) {
    Object.keys(ladokUnis).forEach((key) => {
      unis.push(
        <option key={key} value={key}>
          {ladokUnis[key].names[locale]}
        </option>
      );
    });
  }

  return (
    <React.Fragment>
      <label htmlFor="ladok-universities">
        <FormattedMessage defaultMessage="Select university" description="Ladok account linking" />
      </label>
      <select defaultValue="" onChange={handleOnChange} disabled={fetchFailed}>
        <option hidden value="">
          {placeholder}
        </option>
        {unis}
      </select>

      <div className="universities-status">
        {fetchFailed ? (
          <FormattedMessage
            defaultMessage="The list of universities could not be loaded at this time"
            description="Ladok account linking"
          />
        ) : undefined}
      </div>
    </React.Fragment>
  );
};

const LadokLinkStatus = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.linked);
  const unis = useDashboardAppSelector((state) => state.ladok.unis);
  const ladok_name = useDashboardAppSelector((state) => state.ladok.uni_ladok_name);
  const locale = useDashboardAppSelector((state) => state.intl.locale);

  let university_name = "unknown";
  if (unis && ladok_name && unis[ladok_name]) {
    if (locale && unis[ladok_name]) {
      const uni = unis[ladok_name];
      if (uni.names[locale]) {
        university_name = uni.names[locale];
      } else if (uni.names.en) {
        university_name = uni.names.en;
      }
    }
  }

  return (
    <React.Fragment>
      {isLinked === true ? (
        <div className="status status-on">
          <FormattedMessage
            defaultMessage="Your account is linked with Ladok information from {university}"
            description="Ladok account linking"
            values={{
              university: university_name,
            }}
          />
        </div>
      ) : (
        <div className="status status-off">
          <FormattedMessage defaultMessage="Choose a university in the list" description="Ladok account linking" />
        </div>
      )}
    </React.Fragment>
  );
};

export default LadokContainer;
