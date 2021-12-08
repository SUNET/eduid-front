import React, { useEffect, useState } from "react";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import ButtonDropdown from "reactstrap/lib/ButtonDropdown";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
import { fetchLadokUniversities, linkUser } from "../apis/eduidLadok";
import { useIntl } from "react-intl";
// import { Form, Field } from "react-final-form";

// export const SelectUniversityForm = (): JSX.Element => {
//   const onSubmit = async (values: any) => {
//     console.log("[VALUES]", values);
//   };
//   return (
//     <Form onSubmit={onSubmit}>
//       {({ handleSubmit }) => (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label></label>
//             <Field name="select university" component="select">
//               <option />
//               <option value="KTH">KTH</option>
//               <option value="KONSTFACK">KONSTFACK</option>
//               <option value="STOCKHOLMUNIVERSITY">STOCKHOLM UNIVERSITY</option>
//             </Field>
//           </div>
//         </form>
//       )}
//     </Form>
//   );
// };

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
      <div className="universities">
        <div className="text">
          <p>
            <FormattedMessage
              defaultMessage="Some universities allow eduID to fetch data from Ladok"
              description="Ladok account linking"
            />
          </p>
        </div>
        <span className="flex-between">
          {/* <ButtonDropdown
            toggle={() => {
              setOpen(!dropdownOpen);
            }}
            isOpen={dropdownOpen}
          > */}
          {/* <DropdownToggle className="btn-primary" caret disabled={fetchFailed}>
              <FormattedMessage defaultMessage="Choose your university" description="Ladok account linking" />
            </DropdownToggle> */}
          <select onChange={handleOnChange}>
            <option selected disabled hidden>
              {placeholder}
            </option>
            {unis}
          </select>
          {/* </ButtonDropdown> */}
        </span>
      </div>
      {/* Är detta annan status än LadokLinkStatus? */}
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
