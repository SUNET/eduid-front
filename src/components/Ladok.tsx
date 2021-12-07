import React, { useEffect, useState } from "react";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { fetchLadokUniversities, linkUser } from "reducers/Ladok";
import ButtonDropdown from "reactstrap/lib/ButtonDropdown";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
import DropdownMenu from "reactstrap/lib/DropdownMenu";
import DropdownItem from "reactstrap/lib/DropdownItem";

const LadokContainer = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.linked);
  const [switchChecked, setSwitchChecked] = useState(isLinked);

  const handleSwitchChange = (): void => {
    setSwitchChecked(!switchChecked);
  };
  return (
    <article id="ladok-container" className="ladok-container">
      <h3 className="heading-4">
        <FormattedMessage defaultMessage="Ladok information" description="Ladok account linking" />
      </h3>

      <p>
        <FormattedMessage
          defaultMessage="Data from Ladok might give you access to more services. Some universities allow eduID to fetch data from Ladok."
          description="Ladok account linking"
        />
      </p>

      <fieldset>
        <label className="toggle flex-between" htmlFor="ladok-connection">
          Link your account to Ladok
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
  const [statusMessage, setStatusMessage] = useState<JSX.Element | undefined>(undefined);
  const [dropdownOpen, setOpen] = useState(false);

  const dispatch = useDashboardAppDispatch();

  useEffect(() => {
    if (ladokUnis === undefined) {
      // initiate fetching of universities metadata when the user indicates they
      // are interested in linking their account
      dispatch(fetchLadokUniversities());
    }
  }, [ladokUnis]);

  useEffect(() => {
    if (fetchFailed === true) {
      setStatusMessage(
        <FormattedMessage
          defaultMessage="The list of universities could not be loaded at this time"
          description="Ladok account linking"
        />
      );
    }
  }, [fetchFailed]);

  function handleOnClick(e: React.SyntheticEvent): void {
    const ladok_name = e.currentTarget.getAttribute("uni");
    if (ladok_name) {
      dispatch(linkUser({ ladok_name }));
    }
    console.log("ladok name:", ladok_name);
  }

  // populate dropdown list of universities
  const unis: JSX.Element[] = [];
  if (ladokUnis !== undefined) {
    Object.keys(ladokUnis).forEach((key) => {
      unis.push(
        <option key={key} value={key} onClick={handleOnClick}>
          {ladokUnis[key].names[locale]}
        </option>
      );
    });
  }

  return (
    <React.Fragment>
      <span className="flex-between">
        <label htmlFor="ladok-universities">
          <FormattedMessage defaultMessage="Select university" description="Ladok account linking" />
        </label>

        <select id="ladok-universities">{unis}</select>
      </span>

      <div className="universities-status">{statusMessage !== undefined ? statusMessage : undefined}</div>
    </React.Fragment>
  );
};

const LadokLinkStatus = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.linked);
  return (
    <React.Fragment>
      {isLinked === true ? (
        <div className="status status-on">
          <FormattedMessage
            defaultMessage="STATUS: Your account is linked with Ladok"
            description="Ladok account linking"
          />
        </div>
      ) : (
        <div className="status status-off">
          <FormattedMessage
            defaultMessage="STATUS: No information could be found in Ladok using this university"
            description="Ladok account linking"
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default LadokContainer;
