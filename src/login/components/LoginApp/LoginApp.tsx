import { LoginExternalReturnHandler } from "components/LoginExternalReturnHandler";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import { ResetPassword } from "./ResetPassword/ResetPassword";

function LoginApp(): JSX.Element {
  return (
    <div id="content" className="horizontal-content-margin content">
      <Routes>
        <Route path="/login/ext-return/:app_name/:authn_id" element={<LoginExternalReturnHandler />} />
        <Route path="/login/other/:state_id" element={<UseOtherDevice2 />} />
        <Route path="/login/password/:ref" element={<Login />} />
        <Route path="/login/:ref" element={<Login />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default LoginApp;
