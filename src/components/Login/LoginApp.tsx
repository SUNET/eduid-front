import { Help } from "components/Help";
import { LoginExternalReturnHandler } from "components/Login/LoginExternalReturnHandler";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "../ResetPassword/ResetPasswordMain";
import Login from "./Login";
import UseOtherDevice2 from "./UseOtherDevice2";

function LoginApp(): JSX.Element {
  return (
    <section id="content" className="horizontal-content-margin content">
      <Routes>
        <Route path="/login/ext-return/:app_name/:authn_id" element={<LoginExternalReturnHandler />} />
        <Route path="/login/other/:state_id" element={<UseOtherDevice2 />} />
        <Route path="/login/password/:ref" element={<Login />} />
        <Route path="/login/:ref" element={<Login />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
        <Route path="/login/faq" element={<Help />} />
      </Routes>
    </section>
  );
}

export default LoginApp;
