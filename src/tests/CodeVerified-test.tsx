import { PayloadAction } from "@reduxjs/toolkit";
import { SIGNUP_SERVICE_URL, VerifyLinkResponseFail, VerifyLinkResponseSuccess } from "apis/eduidSignup";
import CodeVerified, { idFinishedButton, idUserEmail, idUserPassword } from "components/CodeVerified";
import { SIGNUP_BASE_PATH } from "components/SignupMain";
import { shallow } from "enzyme";
import { createMemoryHistory } from "history";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter, Route, Router, Switch } from "react-router";
import { showNotification } from "reducers/Notifications";
import { mswServer, rest } from "setupTests";
import { setImmediate } from "timers";
import { fakeStore, realStore, setupComponent } from "./helperFunctions/SignupTestApp";

const runAllPromises = () => new Promise(setImmediate);

describe("CodeVerified Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <CodeVerified />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Component verifies code with backend and renders successful response", async () => {
    const fakeResponse: PayloadAction<VerifyLinkResponseSuccess> = {
      type: "testing",
      payload: {
        status: "verified",
        password: "very-secret",
        dashboard_url: "https://dashboard.example.org/",
        email: "test@example.org",
      },
    };

    mswServer.use(
      rest.get(`${SIGNUP_SERVICE_URL}verify-link/abc123`, (req, res, ctx) => {
        return res(ctx.json(fakeResponse));
      })
    );

    const store = realStore();

    const wrapper = setupComponent({
      component: (
        <MemoryRouter initialEntries={["/code/abc123"]}>
          <Switch>
            <Route path={`/code/:code`} component={CodeVerified} />
          </Switch>
        </MemoryRouter>
      ),
      store,
    });

    // let all the async calls in the component finish, and then update the wrapper
    await runAllPromises();
    wrapper.update();

    const userEmail = wrapper.find(`#${idUserEmail}`);
    expect(userEmail.exists()).toEqual(true);
    expect(userEmail.text()).toEqual(fakeResponse.payload.email);

    const userPassword = wrapper.find(`#${idUserPassword}`);
    expect(userPassword.exists()).toEqual(true);
    expect(userPassword.text()).toEqual(fakeResponse.payload.password);

    const finishedButton = wrapper.find(`EduIDButton#${idFinishedButton}`);
    expect(finishedButton.exists()).toEqual(true);
  });

  it("Component handles 'already-verified'", () => {
    const fakeResponse: VerifyLinkResponseFail = {
      status: "already-verified",
    };

    const store = fakeStore();

    const wrapper = setupComponent({
      component: (
        <MemoryRouter initialEntries={["/code/abc123"]}>
          <Switch>
            <Route path={`/code/:code`} component={() => <CodeVerified responseForTests={fakeResponse} />} />
          </Switch>
        </MemoryRouter>
      ),
      store,
    });

    const actions = store.getActions();
    expect(actions).toEqual([showNotification({ message: "code.already-verified", level: "info" })]);
  });

  it("Component handles 'unknown-code'", () => {
    const fakeResponse: VerifyLinkResponseFail = {
      status: "unknown-code",
    };

    const store = fakeStore();

    const history = createMemoryHistory();

    const wrapper = setupComponent({
      component: (
        <Router history={history}>
          <CodeVerified responseForTests={fakeResponse} />
        </Router>
      ),
      store,
    });

    const actions = store.getActions();
    expect(actions).toEqual([showNotification({ message: "code.unknown-code", level: "info" })]);
    // test that user is sent off to the signup start page
    expect(history.location.pathname).toBe(`${SIGNUP_BASE_PATH}/email`);
  });
});
