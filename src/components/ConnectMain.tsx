import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchUsers } from "apis/eduidConnect";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import { useConnectAppDispatch, useConnectAppSelector } from "connect-hooks";
import Footer from "login/components/Footer/Footer";
import React, { useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes } from "react-router-dom";
import EduIDButton from "./EduIDButton";
import TextInput from "./EduIDTextInput";

function getHighlightedText({ value, highlight }: any) {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = value && value.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part: any, index: any) => (
    <React.Fragment key={index}>
      {part.toLowerCase() === highlight.toLowerCase() ? (
        <strong style={{ backgroundColor: "#ffe7dd" }}>{part}</strong>
      ) : (
        part
      )}
    </React.Fragment>
  ));
}

const SearchedLists = ({ highlight, value }: any) => {
  return <li>{getHighlightedText({ value, highlight })}</li>;
};

function SearchResults(props: { query: string; response: any }): JSX.Element | null {
  console.log("props.response", props.response);
  const searchText = props.query;
  if (!props.response.length) {
    return (
      <p>
        <FormattedMessage
          defaultMessage="Oops, Your search {searchText} did not match any results. please try again."
          description="searching text"
          values={{
            searchText: <strong>{searchText}</strong>,
          }}
        />
      </p>
    );
  }
  return (
    <div>
      <h2>Search results</h2>
      <ul>
        {props.response.map((user: any) => (
          <SearchedLists key={user.id} value={user.name} highlight={props.query} />
        ))}
      </ul>
    </div>
  );
}

function Connect(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const response = useConnectAppSelector((state) => state.connect.response);

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder search",
    defaultMessage: "Search here",
    description: "search placeholder",
  });
  const dispatch = useConnectAppDispatch();

  async function submitSearchForm(values: { query: string }): Promise<void> {
    const response = await dispatch(searchUsers(values.query));
    if (searchUsers.fulfilled.match(response)) {
      setQuery(values.query);
    }
  }

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

      <FinalForm
        onSubmit={submitSearchForm}
        render={({ handleSubmit, invalid, pristine }) => (
          <form id="search-user-form" className="search-user-form" onSubmit={handleSubmit}>
            <div className="search-user-form-wrapper">
              <FinalField
                // label={<FormattedMessage defaultMessage="User name" description="search user name label" />}
                component={TextInput}
                componentClass="input"
                type="text"
                name="query"
                autoFocus
                placeholder={placeholder}
                onChange={(val: any, prevVal: any) => console.log("onChange", val, prevVal)}
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
      {query ? <SearchResults query={query} response={response} /> : null}
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
