import { fetchAbort, fetchToU } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import loginSlice from "slices/Login";

export default function TermsOfUse(): JSX.Element {
  const dispatch = useAppDispatch();
  const availableTouVersions = useAppSelector((state) => state.login.tou.available_versions);
  // version is the version of the ToU the backend requests we ask the user to accept
  const version = useAppSelector((state) => state.login.tou.version);
  const loginRef = useAppSelector((state) => state.login.ref);

  useEffect(() => {
    if (!version && loginRef) {
      // Tell the backend what ToU versions are available in this bundle
      dispatch(fetchToU({ ref: loginRef, versions: availableTouVersions }));
    }
  }, []);

  async function handleAccept() {
    if (version && loginRef) {
      // Tell the backend which ToU version the user accepted
      const res = await dispatch(fetchToU({ ref: loginRef, user_accepts: version }));

      if (fetchToU.fulfilled.match(res)) {
        if (res.payload.finished) {
          dispatch(loginSlice.actions.callLoginNext());
        }
      }
    }
  }

  function handleCancel() {
    if (loginRef) {
      dispatch(fetchAbort({ ref: loginRef }));
    }
  }

  return (
    <Fragment>
      {/* Common for all messages */}
      <h1>
        <FormattedMessage defaultMessage="Important information" description="Temp info - title" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="The information below is relevant to you and we need confirmation that you have taken part of it. Please read before you press continue."
            description="Temp info - lead"
          />
        </p>
      </div>

      {/* Unique situation message */}
      <div className="notice-box">
        <h2>
          <FormattedMessage
            defaultMessage="We're no longer supporting phone numbers"
            description="Temp info - heading"
          />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="As an important step in improving the security of eduID we will shortly discontinue the use of phone numbers as a means of:"
            description="Temp info - message"
          />
        </p>
        <ul className="bullets">
          <li>verifying identity</li>
          <li>resetting password</li>
        </ul>
      </div>

      {/* "Don't show again" checkbox and "Continue" button */}
      <div className="buttons-center">
        <label htmlFor="show-check">
          <input type="checkbox" id="show-check" name="show-check" />
          <span>
            <FormattedMessage defaultMessage="Don't show this message again" description="Temp info - checkbox" />
          </span>
        </label>

        <EduIDButton type="submit" buttonstyle="primary" onClick={handleAccept} id="continue-button">
          <FormattedMessage defaultMessage="Continue" description="Temp info - continue button" />
        </EduIDButton>
      </div>

      {/* Maybe we can reuse the ToU way of showing one of several messages?? */}
      {/* {version && <CommonToU version={version} handleAccept={handleAccept} handleCancel={handleCancel} />} */}
    </Fragment>
  );
}
