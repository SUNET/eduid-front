import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchUsers } from "apis/eduidConnect";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import { useConnectAppDispatch, useConnectAppSelector } from "connect-hooks";
import Footer from "login/components/Footer/Footer";
import React from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes } from "react-router-dom";
import CustomInput from "../login/components/Inputs/CustomInput";
import EduIDButton from "./EduIDButton";

function SearchResults(): JSX.Element | null {
  const response = useConnectAppSelector((state) => state.connect.response);

  if (response && Object.keys(response).length > 0) {
    return (
      <div>
        <h2>Search results</h2>
        <ul>
          {Object.values(response).map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

function SearchUsersForm(): JSX.Element {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder search",
    defaultMessage: "Search here",
    description: "search placeholder",
  });
  const dispatch = useConnectAppDispatch();

  function submitSearchForm(values: { query: string }): void {
    dispatch(searchUsers(values.query));
  }

  return (
    <FinalForm
      onSubmit={submitSearchForm}
      render={({ handleSubmit, invalid, pristine }) => (
        <form id="search-user-form" className="search-user-form" onSubmit={handleSubmit}>
          <div className="search-user-form-wrapper">
            <FinalField
              // label={<FormattedMessage defaultMessage="User name" description="search user name label" />}
              component={CustomInput}
              componentClass="input"
              type="text"
              name="query"
              autoFocus
              placeholder={placeholder}
            />
            <EduIDButton
              type="submit"
              id="search-users"
              buttonstyle="primary"
              disabled={invalid || pristine}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </EduIDButton>
          </div>
        </form>
      )}
    />
  );
}

function Connect(): JSX.Element {
  return (
    <section id="content" className="horizontal-content-margin content">
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Welcome" description="Connect admin heading" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="You can search and invite other users"
              description="Connect admin description"
            />
          </p>
        </div>
      </section>
      <SearchUsersForm />
      <SearchResults />
    </section>
  );
}

export function ConnectMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header />
      <main id="panel" className="panel">
        <Notifications />
        <Routes>
          {/* <Route path="/" element={<Connect />} /> */}
          <Route path="/static/front-build/connect.dev.html" element={<Connect />} />
        </Routes>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
