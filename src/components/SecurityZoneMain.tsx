import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ChangePasswordContainer } from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { Security } from "./Security";
import { Link } from "react-router-dom";
import { Breadcrumb } from "./BreadCrumb";
import { ExpiresMeter } from "login/components/LoginApp/Login/ExpiresMeter";
import { TimeRemainingWrapper } from "./TimeRemaining";
import EduIDButton from "./EduIDButton";

function SessionExpired(): JSX.Element {
  return (
    <article id="security-container" className="security-zone-container">
      <div className="intro">
        <h3>
          <FormattedMessage defaultMessage="Session expired" description="Dashboard security zone session expired" />
        </h3>
        <p>
          <FormattedMessage
            defaultMessage={`To continue with security settings you should log  in again or click cancel to return to 
              settings.`}
            description="Dashboard security zone session expired description"
          />
        </p>
      </div>
      <div className="buttons">
        <EduIDButton
          id="security-zone-cancel-button"
          buttonstyle="secondary"
          onClick={() => console.log("click cancel")}
        >
          <FormattedMessage defaultMessage="cancel" description="cancel" />
        </EduIDButton>
        <EduIDButton
          id="security-zone-reauthenticate-button"
          buttonstyle="primary"
          onClick={() => console.log("click login")}
        >
          <FormattedMessage defaultMessage="log in" description="login" />
        </EduIDButton>
      </div>
    </article>
  );
}

export function SecurityZoneMain(): JSX.Element {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const intl = useIntl();
  const links = [
    intl.formatMessage({
      id: "Security zone tab, Security Key",
      defaultMessage: "Security Key",
    }),
    intl.formatMessage({
      id: "Security zone tab, Change Password",
      defaultMessage: "Change password",
    }),
    intl.formatMessage({
      id: "Security zone tab, Delete Account",
      defaultMessage: "Delete Account",
    }),
  ];
  const [active, setActive] = useState<string | null>(links[0]);

  const items = [
    {
      to: "/profile/",
      label: intl.formatMessage({
        id: "Breadcrumb label, Home",
        defaultMessage: "Home",
      }),
    },
    {
      to: "/profile/settings/",
      label: intl.formatMessage({
        id: "Breadcrumb label, Settings",
        defaultMessage: "Settings",
      }),
    },
    {
      to: "/profile/security-zone/",
      label: intl.formatMessage({
        id: "Breadcrumb label, Security Zone",
        defaultMessage: "Security Zone",
      }),
    },
  ];

  function handleTimerReachZero() {
    setIsSessionExpired(true);
    setActive(null);
  }

  return (
    <React.Fragment>
      <Breadcrumb separator="/" activeLink={active}>
        {items.map(({ to, label }) => (
          <Link key={to} to={to}>
            {label}
          </Link>
        ))}
      </Breadcrumb>

      <h1>
        <FormattedMessage defaultMessage="Security Zone" description="Security Zone heading" />
      </h1>
      <div className="lead">
        <p tabIndex={0}>
          <FormattedMessage
            defaultMessage={`Security zone has a time limit before you need to
                reauthenticate yourself to continue accessing the security settings.`}
            description="Security zone description"
          />
        </p>
        <div className="time-remaining">
          <span>
            <FormattedMessage defaultMessage="Session expires in" description="Security zone time remaining" />
          </span>

          <TimeRemainingWrapper
            name="security-zone-expires"
            unique_id="security-zone-expires"
            value={50}
            onReachZero={handleTimerReachZero}
          >
            <ExpiresMeter showMeter={false} expires_max={50} />
          </TimeRemainingWrapper>
        </div>
      </div>
      {isSessionExpired ? (
        <SessionExpired />
      ) : (
        <React.Fragment>
          <SecurityZoneNav setActive={setActive} links={links} active={active} />
          {active === links[0] && <Security />}
          {active === links[1] && <ChangePasswordContainer />}
          {active === links[2] && <DeleteAccount />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

interface SecurityZoneNavProps {
  links: string[];
  active: string | null;
  setActive: (active: string | null) => void;
}

export function SecurityZoneNav(props: SecurityZoneNavProps): JSX.Element {
  function handleOpenContent(link: string): void {
    props.setActive(link);
  }

  return (
    <nav id="security-zone-nav" className="security-zone-nav">
      <ul>
        {props.links.map((link: string, index: number) => (
          <li className={props.active == link ? "security-zone-nav-active" : "security-zone-nav-item"} key={index}>
            <a
              // href="blank"
              key={index}
              className={props.active == link ? "active" : undefined}
              onClick={() => handleOpenContent(link)}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
