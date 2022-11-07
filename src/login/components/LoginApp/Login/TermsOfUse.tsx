import { useEffect } from "react";
import loginSlice from "login/redux/slices/loginSlice";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import { FormattedMessage } from "react-intl";
import { CommonToU } from "components/CommonToU";
import { fetchAbort } from "apis/eduidLogin";

export default function TermsOfUse(): JSX.Element {
  const dispatch = useAppDispatch();
  const availableTouVersions = useAppSelector((state) => state.login.tou.available_versions);
  // version is the version of the ToU the backend requests we ask the user to accept
  const version = useAppSelector((state) => state.login.tou.version);
  const loginRef = useAppSelector((state) => state.login.ref);

  useEffect(() => {
    // TODO: So we render the ToU page, and *then* we fire off the request to ask the backend what version to show?
    //       We ought to send that request as soon as the backend /next call says that ToU is next.
    dispatch(loginSlice.actions.postTouVersions(availableTouVersions));
  }, []);

  function handleAccept() {
    dispatch(loginSlice.actions.updatedTouAccept(version));
  }

  function handleCancel() {
    if (loginRef) {
      dispatch(fetchAbort({ ref: loginRef }));
    }
  }

  return (
    <>
      <h1>
        <FormattedMessage defaultMessage="Log in: Terms of use" description="Terms of use (h2 heading)" />
      </h1>
      <div className="lead">
        <p tabIndex={0}>
          <FormattedMessage
            defaultMessage="We need an updated acceptance from you of the eduID terms of use."
            description="Terms of use (banner text)"
          />
        </p>
      </div>

      {version && <CommonToU version={version} handleAccept={handleAccept} handleCancel={handleCancel} />}
    </>
  );
}
