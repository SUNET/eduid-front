import { loginApi } from "apis/login";
import { CommonToU } from "components/Common/CommonToU";
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
  const [ fetchAbort_trigger ] = loginApi.useLazyFetchAbortQuery();
  const [ fetchToU_trigger ] = loginApi.useLazyFetchToUQuery();

  useEffect(() => {
    if (!version && loginRef) {
      // Tell the backend what ToU versions are available in this bundle
      fetchToU_trigger({ ref: loginRef, versions: availableTouVersions });
    }
  }, []);

  async function handleAccept() {
    if (version && loginRef) {
      // Tell the backend which ToU version the user accepted
      const response = await fetchToU_trigger({ ref: loginRef, user_accepts: version });

      if (response.isSuccess) {
        if (response.data.payload.finished) {
          dispatch(loginSlice.actions.callLoginNext());
        }
      }
    }
  }

  function handleCancel() {
    if (loginRef) {
      fetchAbort_trigger({ ref: loginRef });
    }
  }

  return (
    <Fragment>
      <h1>
        <FormattedMessage defaultMessage="Log in: Terms of use" description="Terms of use (h2 heading)" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="We need an updated acceptance from you of the eduID terms of use."
            description="Terms of use (banner text)"
          />
        </p>
      </div>

      {version && <CommonToU version={version} handleAccept={handleAccept} handleCancel={handleCancel} />}
    </Fragment>
  );
}
