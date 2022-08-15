import { Route, Routes } from "react-router-dom-v5-compat";
import Login from "./Login/Login";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import ResetPassword from "./ResetPassword/ResetPassword";

function LoginApp(): JSX.Element {
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
