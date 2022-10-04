import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import ResetPassword from "./ResetPassword/ResetPassword";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useIntl } from "react-intl";

function LoginApp(): JSX.Element {
  const location = useLocation();
  const intl = useIntl();

  useEffect(() => {
    if (location.pathname.includes("/login/"))
      document.title = intl.formatMessage({
        id: "document title Log in",
        defaultMessage: "Log in | eduID",
      });
    else if (location.pathname.includes("/reset-password/")) {
      document.title = intl.formatMessage({
        id: "document title Reset Password",
        defaultMessage: "Reset Password | eduID",
      });
    } else document.title = "eduID";
  }, [location]);

  return (
    <div id="content" className="horizontal-content-margin content">
      <Routes>
        <Route path="/login/other/:state_id" element={<UseOtherDevice2 />} />
        <Route path="/login/password/:ref" element={<Login />} />
        <Route path="/login/:ref" element={<Login />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default LoginApp;
