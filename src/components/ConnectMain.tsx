import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp, faMagnifyingGlass, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchUsers } from "apis/eduidConnect";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import { useConnectAppDispatch, useConnectAppSelector } from "connect-hooks";
import Footer from "login/components/Footer/Footer";
import CustomInput from "login/components/Inputs/CustomInput";
import NotificationModal from "login/components/Modals/NotificationModal";
import React, { useEffect, useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes } from "react-router-dom";
import EduIDButton from "./EduIDButton";
import Pagination from "./Pagination";
import Splash from "./Splash";

function UserLists({ user, query, handleShowModal }: any) {
  const [expanded, setExpanded] = useState(false);

  const userInvited = false;
  const userLinked = false;

  return (
    <tbody>
      <tr key={user.id} className={expanded ? "selected" : "collapsed"}>
        <td className={expanded ? "expanded" : "collapsed"} onClick={() => setExpanded(!expanded)}>
          <FontAwesomeIcon icon={expanded ? (faChevronUp as IconProp) : (faChevronDown as IconProp)} />
        </td>
        <td>
          <p>
            <SearchedLists key={user.name} value={user.name} highlight={query} />
          </p>
          <p className="text-small">
            <SearchedLists key={user.email} value={user.email} highlight={query} />
          </p>

          {userLinked ? (
            <span className="linked">linked</span>
          ) : userInvited ? (
            <React.Fragment>
              <span className="unlinked">Invited</span>
              &nbsp;
              <span className="invite-status">not yet responded.</span>
            </React.Fragment>
          ) : (
            <span className="unlinked">Not Invited</span>
          )}
        </td>
        <td>
          {/* if user is linked not show invite button */}
          {userLinked ? null : userInvited ? (
            <EduIDButton
              type="button"
              id="resend-button"
              size="sm"
              buttonstyle="secondary"
              onClick={() => console.log("resend")}
            >
              <FontAwesomeIcon icon={faPaperPlane as IconProp} />
              <div>
                <FormattedMessage defaultMessage="resend" description="Resend invitation button text" />
              </div>
            </EduIDButton>
          ) : (
            <EduIDButton type="button" id="invite-button" size="sm" buttonstyle="primary" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPaperPlane as IconProp} />
              <div>
                <FormattedMessage defaultMessage="Invite" description="Invite button text" />
              </div>
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
    </tbody>
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
  return <React.Fragment>{getHighlightedText({ value, highlight })}</React.Fragment>;
}

function SearchResults(props: { query: string; response: any; currentPosts: any }): JSX.Element | null {
  const searchText = props.query;
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: "", email: "", id: "" });

  function handleShowModal(user: any) {
    setShowModal(true);

    setSelectedUser(() => ({
      name: user.name,
      email: user.email,
      id: user.id,
    }));
  }

  if (!props.query) return null;

  if (!props.response.length) {
    return (
      <h3>
        <FormattedMessage
          defaultMessage="Oops, Your search {searchText} did not match any results. please try again."
          description="searching text"
          values={{
            searchText: <strong>{searchText}</strong>,
          }}
        />
      </h3>
    );
  }
  return (
    <React.Fragment>
      <div className="search-results">
        <h2>
          <FormattedMessage
            defaultMessage="Search: {searchText} "
            description="searching text"
            values={{
              searchText: searchText,
              length: props.response.length,
            }}
          />
        </h2>
        &nbsp;
        <span>
          <FormattedMessage
            defaultMessage=" {length} user was found."
            description="searching text"
            values={{
              length: props.response.length,
            }}
          />
        </span>
      </div>
      <table className="table-form responsive-table connect">
        <thead>
          <tr>
            <th className="connect-see-more">
              <p>
                <FormattedMessage description="connect-see-more" defaultMessage="More" />
              </p>
            </th>
            <th className="connect-name">
              <FormattedMessage description="connect name" defaultMessage="Name & Email" />
            </th>
            <th className="connect-invite">
              <p>
                <FormattedMessage description="connect email address" defaultMessage="Invite" />
              </p>
            </th>
          </tr>
        </thead>
        {props.currentPosts.map((user: any) => (
          <UserLists key={user.id} user={user} query={props.query} handleShowModal={() => handleShowModal(user)} />
        ))}
      </table>
      <NotificationModal
        id="invite-notification-modal"
        title={
          <FormattedMessage
            defaultMessage="Invite {user} to join your group"
            description="invite user to join your group modal title"
            values={{
              user: selectedUser.name,
            }}
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage={`Send an invitation to {email} to join your group. 
   The user will receive an email with a link to accept the invitation.`}
            description="invitation notification modal main text"
            values={{
              email: <strong>{selectedUser.email}</strong>,
            }}
          />
        }
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
        acceptModal={() => console.log("accept modal")}
        acceptButtonText={<FormattedMessage defaultMessage="Send an invitation" description="send button" />}
      />
    </React.Fragment>
  );
}

const required = (value?: string) => {
  if (value === undefined || !value.trim()) return "required";
};

function Connect(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const response = useConnectAppSelector((state) => state.connect.response);
  const loading = useConnectAppSelector((state) => state.connect.loading);
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
  }, [response, loading]);

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
                  disabled={invalid || pristine || loading}
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
      <Splash showChildren={!loading}>
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
      </Splash>
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
