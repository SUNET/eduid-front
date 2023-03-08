import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faMagnifyingGlass,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
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
  const [mouseEnter, setMouseEnter] = useState(false);

  // when user invited, invite button is disabled but possibly to send a reminder. icon === check circle mark gray color.
  // when user not invited, invite button is enabled. icon === circle plus mark.
  // when user linked, invite button is disabled. icon === check circle mark background red color.

  const userInvited = false;
  const userLinked = true;
  return (
    <>
      <tr
        key={user.id}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        className={mouseEnter ? "hover" : expanded ? "selected" : "collapsed"}
      >
        <td
          className={mouseEnter ? "hover" : expanded ? "expanded" : "collapsed"}
          onClick={() => setExpanded(!expanded)}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
        >
          <FontAwesomeIcon icon={expanded ? (faChevronUp as IconProp) : (faChevronDown as IconProp)} />
        </td>
        <td>
          <p>
            <SearchedLists key={user.name} value={user.name} highlight={query} />
          </p>
          <p>
            <SearchedLists key={user.email} value={user.email} highlight={query} />
          </p>

          {userLinked ? (
            <span className="linked">linked</span>
          ) : userInvited ? (
            <>
              <span className="unlinked">Invited</span>
              &nbsp;
              <span>not yet responded.</span>
              {/* <br />
              <a href="#">Send a reminder?</a> */}
            </>
          ) : (
            <>
              <span className="unlinked">Not Invited</span>
              {/* <br />
              <a href="#">Send an invitation?</a> */}
            </>
          )}
        </td>
        <td>
          {userLinked ? (
            <FontAwesomeIcon icon={faCircleCheck as IconProp} />
          ) : userInvited ? (
            <EduIDButton type="button" id="add-users" size="sm" buttonstyle={"secondary"} className={"abled"}>
              <FontAwesomeIcon icon={faPaperPlane as IconProp} />

              <p className="text">
                <FormattedMessage defaultMessage="Resend" description="Resend invitation button text" />
              </p>
            </EduIDButton>
          ) : (
            <EduIDButton type="button" id="add-users" size="sm" buttonstyle={"primary"} className={"abled"}>
              <FontAwesomeIcon icon={faPaperPlane as IconProp} />
              <p className="text">
                <FormattedMessage defaultMessage="Invite" description="Invite button text" />
              </p>
            </EduIDButton>
          )}
        </td>
      </tr>
      {expanded && (
        <tr className="expanded">
          <td className="selected" colSpan={3}>
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
  return <>{getHighlightedText({ value, highlight })}</>;
}

function SearchResults(props: { query: string; response: any; currentPosts: any }): JSX.Element | null {
  const searchText = props.query;

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
            <th className="connect-see-more" />
            {/* <FormattedMessage description="connect-see-more" defaultMessage="More" /> */}
            <th className="connect-name">
              <FormattedMessage description="connect name" defaultMessage="Name / Email address" />
            </th>
            {/* <th className="connect-invite-status">
              <FormattedMessage description="connect-invite" defaultMessage="Status" />
            </th> */}
            <th className="connect-invite">
              <FormattedMessage description="connect email address" defaultMessage="Invite" />
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
                  onChange={() => setQuery(values.query)}
                />
                {/* Only visible clear button when there is a value in the input */}
                {values.query && (
                  <EduIDButton
                    id="clear-search"
                    buttonstyle="close"
                    type="button"
                    className="clear-input"
                    onClick={() => {
                      console.log("values.query", values.query);
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
                  &nbsp;
                  <FormattedMessage defaultMessage=" Search" description="button text" />
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
