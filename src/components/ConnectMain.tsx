import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp, faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchUsers } from "apis/eduidConnect";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import { useConnectAppDispatch, useConnectAppSelector } from "connect-hooks";
import Footer from "login/components/Footer/Footer";
import CustomInput from "login/components/Inputs/CustomInput";
import React, { useEffect, useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes } from "react-router-dom";
import EduIDButton from "./EduIDButton";
import Pagination from "./Pagination";

function UserLists({ user, query }: any) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr key={user.id} onClick={() => setExpanded(!expanded)} className={expanded ? "selected" : "collapsed"}>
        <SearchedLists key={user.name} value={user.name} highlight={query} />
        <SearchedLists key={user.email} value={user.email} highlight={query} />
        <td>
          <EduIDButton type="button" id="add-users" buttonstyle="link">
            <FontAwesomeIcon icon={faUserPlus as IconProp} />
          </EduIDButton>
        </td>
        <td className={expanded ? "expanded" : "collapsed"}>
          <FontAwesomeIcon icon={expanded ? (faChevronUp as IconProp) : (faChevronDown as IconProp)} />
        </td>
      </tr>
      {expanded && (
        <tr className="expanded">
          <td className="selected" colSpan={4}>
            <FormattedMessage defaultMessage="History" description="History" />
            <br />
            {user.phone} <br />
            {user.company.name} <br />
          </td>
        </tr>
      )}
    </>
  );
}

// TODO: Add correct types and remove any
function getHighlightedText({ value, highlight }: any) {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = value && value.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part: any, index: number) => (
    <React.Fragment key={index}>
      {part.toLowerCase() === highlight.toLowerCase() ? (
        <strong style={{ backgroundColor: "#ffe7dd" }}>{part}</strong>
      ) : (
        part
      )}
    </React.Fragment>
  ));
}

function SearchedLists({ highlight, value }: any) {
  return <td>{getHighlightedText({ value, highlight })}</td>;
}

function SearchResults(props: { query: string; response: any; currentPosts: any }): JSX.Element | null {
  console.log("props.currentPosts", props.currentPosts);
  const searchText = props.query;
  console.log("props", searchText);

  if (!props.query) return null;

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
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="{length} user was found using query {searchText} "
          description="searching text"
          values={{
            length: <strong> {props.response.length}</strong>,
            searchText: <strong>{searchText}</strong>,
          }}
        />
      </p>
      <table className="table-form responsive-table connect">
        <thead>
          <tr>
            <th className="connect-name">
              <FormattedMessage description="connect name" defaultMessage="Name" />
            </th>
            <th className="connect-email-address">
              <FormattedMessage description="connect email address" defaultMessage="Email" />
            </th>
            <th className="connect-invite">
              <FormattedMessage description="connect-invite" defaultMessage="Invite" />
            </th>
            <th className="connect-see-more">
              <FormattedMessage description="connect-see-more" defaultMessage="More" />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.currentPosts.map((user: any) => (
            <UserLists key={user.id} user={user} query={props.query} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
//
const required = (value?: string) => {
  if (value === undefined || !value.trim()) return "required";
};

function Connect(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const response = useConnectAppSelector((state) => state.connect.response);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder search",
    defaultMessage: "username, phone number or email",
    description: "search placeholder",
  });
  const dispatch = useConnectAppDispatch();

  async function submitSearchForm(values: { query: string }): Promise<void> {
    const response = await dispatch(searchUsers(values.query));
    if (searchUsers.fulfilled.match(response)) {
      setQuery(values.query);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [response]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = response.slice(indexOfFirstPost, indexOfLastPost);
  //Change page
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section id="content" className="horizontal-content-margin content">
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Welcome" description="Connect admin heading" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="Here you can search for people and invite them to join your group."
              description="Connect admin description"
            />
          </p>
        </div>
      </section>

      <article className="intro">
        <FinalForm
          initialValues={{ query: "" }}
          onSubmit={submitSearchForm}
          render={({ handleSubmit, invalid, pristine, form, values }) => (
            <form id="search-user-form" className="search-user-form" onSubmit={handleSubmit}>
              <div className="search-user-form-wrapper">
                <FinalField
                  label={<FormattedMessage defaultMessage="Search" description="search user name label" />}
                  component={CustomInput}
                  componentClass="input"
                  type="text"
                  name="query"
                  autoFocus
                  placeholder={placeholder}
                  validate={required}
                />
                {/* Only visible clear button when there is a value in the input */}
                {values.query && (
                  <EduIDButton
                    id="clear-search"
                    buttonstyle="close"
                    type="button"
                    className="clear-input"
                    onClick={() => {
                      form.reset(), setQuery("");
                    }}
                  />
                )}
              </div>
              <div className="buttons">
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
      </article>
      {query ? (
        <article className="intro">
          <SearchResults query={query} currentPosts={currentPosts} response={response} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={response.length}
            // paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </article>
      ) : null}
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
