import React, { useEffect, useState } from "react";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import ReactSwitch from "react-switch";
import { fetchLadokUniversities } from "reducers/Ladok";
import { InputGroup } from "reactstrap";
import InputGroupText from "reactstrap/lib/InputGroupText";

const LadokContainer = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.linked);
  const [switchChecked, setSwitchChecked] = useState(isLinked);

  const handleSwitchChange = async (checked: boolean) => {
    setSwitchChecked(checked);
  };
  return (
    <article className="ladok-container">
      <div id="ladok-container">
        <div className="intro">
          <div className="heading">
            <h4>
              <FormattedMessage defaultMessage="Link your account to Ladok" description="Ladok account linking" />
            </h4>
            <ReactSwitch onChange={handleSwitchChange} checked={switchChecked} className="switch" />
          </div>
          <div>
            {switchChecked ? (
              <LadokUniversitiesDropdown />
            ) : (
              <p className="ladok-connect-help">
                <FormattedMessage
                  defaultMessage="Data from Ladok might give you access to more services"
                  description="Ladok account linking"
                />
              </p>
            )}
          </div>
          {switchChecked ? <LadokLinkStatus /> : undefined}
        </div>
      </div>
    </article>
  );
};

const LadokUniversitiesDropdown = (): JSX.Element => {
  const ladokUnis = useDashboardAppSelector((state) => state.ladok.unis);
  const fetchFailed = useDashboardAppSelector((state) => state.ladok.unis_fetch_failed);
  const [statusMessage, setStatusMessage] = useState<JSX.Element | undefined>(undefined);

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

  return (
    <React.Fragment>
      <p>
        <div className="universities">
          <div className="text">
            <FormattedMessage defaultMessage="Choose your university" description="Ladok account linking" />
          </div>
          <div className="box">
            <InputGroup>
              <InputGroupText>Placeholder for universities dropdown</InputGroupText>
            </InputGroup>
          </div>
        </div>
        <div>
          <p className="universities-status">{statusMessage !== undefined ? statusMessage : undefined}</p>
        </div>
      </p>
    </React.Fragment>
  );
};

const LadokLinkStatus = (): JSX.Element => {
  const isLinked = useDashboardAppSelector((state) => state.ladok.linked);
  return (
    <React.Fragment>
      <div>
        <p className="ladok-link-status">
          {isLinked === true ? (
            <FormattedMessage
              defaultMessage="STATUS: Your account is linked with Ladok"
              description="Ladok account linking"
            />
          ) : (
            <FormattedMessage
              defaultMessage="STATUS: No information could be found in Ladok using this university"
              description="Ladok account linking"
            />
          )}
        </p>
      </div>
    </React.Fragment>
  );
};

export default LadokContainer;
