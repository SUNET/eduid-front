import { changePassword, fetchSuggestedPassword } from "apis/eduidSecurity";
import { ChangePasswordContainer } from "components/ChangePassword";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount } from "enzyme";
import expect from "expect";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";
import chpassSlice from "reducers/ChangePassword";
import { mswServer } from "setupTests";
import { fakeStore } from "./helperFunctions/DashboardTestApp";

describe("Reducers", () => {
  const mockState = {
    message: "",
    suggested_password: "",
    old_password: "",
    new_password: "",
    choose_custom: false,
  };

  it("Receives a fetchSuggestedPassword.fulfilled action", () => {
    const suggested = "2345";
    expect(chpassSlice.reducer(mockState, fetchSuggestedPassword.fulfilled(suggested))).toEqual({
      ...mockState,
      suggested_password: suggested,
    });
  });

  it("Receives a fetchSuggestedPassword.fulfilled action", () => {
    // Verify that suggested_password is cleared on changePassword.fulfilled
    const previousState = { ...mockState, suggested_password: "foo" };
    expect(chpassSlice.reducer(previousState, changePassword.fulfilled())).toEqual({
      ...mockState,
      suggested_password: undefined,
    });
  });
});

const mockState = {
  chpass: {
    suggested_password: "",
    old_password: "old-pw",
    new_password: "new-pw",
    choose_custom: false,
  },
  config: {
    csrf_token: "csrf-token",
    dashboard_url: "/dummy-dash-url/",
    token_service_url: "/dummy-tok-url/",
    security_url: "/dummy-sec-url",
  },
};

describe("API calls", () => {
  it("fetches suggested password", () => {
    const store = fakeStore(mockState);
    const suggested = "12345";

    mswServer.use(
      rest.get(`${mockState.config.security_url}/suggested-password`, (req, res, ctx) => {
        const payload = { suggested_password: suggested };
        return res(ctx.json({ type: "test response", payload: payload }));
      })
    );

    return store.dispatch(fetchSuggestedPassword()).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual([
        "chpass/fetchSuggestedPassword/pending",
        "chpass/fetchSuggestedPassword/fulfilled",
      ]);

      // apply all actions to the reducer, and verify the state afterwards
      const stateBefore = { ...store.getState() };
      let newState = { ...store.getState() };
      store.getActions().forEach((action) => {
        newState = chpassSlice.reducer(newState, action);
      });

      // we expect the suggested_password in the state to have been updated with the value from the mock response
      expect(newState).toEqual({ ...stateBefore, suggested_password: suggested });
    });
  });

  it("fails fetching suggested password", () => {
    const store = fakeStore(mockState);

    mswServer.use(
      rest.get(`${mockState.config.security_url}/suggested-password`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    return store.dispatch(fetchSuggestedPassword()).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual([
        "chpass/fetchSuggestedPassword/pending",
        "genericApi_FAIL",
        "chpass/fetchSuggestedPassword/rejected",
      ]);

      // apply all actions to the reducer, and verify the state afterwards
      const stateBefore = { ...store.getState() };
      let newState = { ...store.getState() };
      store.getActions().forEach((action) => {
        newState = chpassSlice.reducer(newState, action);
      });

      // We don't expect the state to change at all on a failed request. Showing errors is done in the
      // notification middleware reacting to the _FAIL action.
      expect(newState).toEqual(stateBefore);

      expect(store.getActions()[1]).toEqual({
        error: true,
        payload: { message: "Error: HTTP 500 Internal Server Error" },
        type: "genericApi_FAIL",
      });
    });
  });

  it("can change password", () => {
    const store = fakeStore({ ...mockState, suggested_password: "abc123" });
    const oldPassword = "12345";
    const newPassword = "secret";

    mswServer.use(
      rest.post(`${mockState.config.security_url}/change-password`, (req, res, ctx) => {
        const payload = {};
        if (req.body.old_password != oldPassword || req.body.new_password != newPassword) {
          return res(ctx.status(400));
        }
        return res(ctx.json({ type: "test response", payload: payload }));
      })
    );

    //fetchMock.doMockIf(`${mockState.config.security_url}/change-password`, JSON.stringify({}));

    return store.dispatch(changePassword({ old_password: oldPassword, new_password: newPassword })).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(["chpass/changePassword/pending", "chpass/changePassword/fulfilled"]);

      // apply all actions to the reducer, and verify the state afterwards
      const stateBefore = { ...store.getState() };
      let newState = { ...store.getState() };
      store.getActions().forEach((action) => {
        newState = chpassSlice.reducer(newState, action);
      });

      // we expect the suggested_password to be cleared on a successful password change
      expect(newState).toEqual({ ...stateBefore, suggested_password: undefined });
    });
  });
});

describe("ChangePassword Container", () => {
  let getWrapper;

  beforeEach(() => {
    getWrapper = function () {
      const store = fakeStore();

      const wrapper = mount(
        <ReduxIntlProvider store={store}>
          <MemoryRouter>
            <CompatRouter>
              <ChangePasswordContainer />
            </CompatRouter>
          </MemoryRouter>
        </ReduxIntlProvider>
      );
      return wrapper;
    };
  });

  it("Renders test", () => {
    const wrapper = getWrapper();
    const button = wrapper.find("#pwmode-button");
    expect(button.exists()).toEqual(true);
  });
});
