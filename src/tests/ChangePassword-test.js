import { changePassword, fetchSuggestedPassword } from "apis/eduidSecurity";
import { ChangePasswordContainer } from "components/ChangePassword";
import expect from "expect";
import fetchMock from "jest-fetch-mock";
import React from "react";
import chpassSlice from "reducers/ChangePassword";
import { fakeStore, setupComponent } from "./helperFunctions/DashboardTestApp";

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

    fetchMock.doMockIf(
      `${mockState.config.security_url}/suggested-password`,
      JSON.stringify({ payload: { suggested_password: suggested } })
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

    fetch.mockReject(new Error("testing"));

    return store.dispatch(fetchSuggestedPassword()).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual([
        "chpass/fetchSuggestedPassword/pending",
        "security_FAIL",
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
        payload: { message: "Error: testing" },
        type: "security_FAIL",
      });
    });
  });

  it("can change password", () => {
    const store = fakeStore({ ...mockState, suggested_password: "abc123" });
    const oldPassword = "12345";
    const newPassword = "secret";

    fetchMock.doMockIf(`${mockState.config.security_url}/change-password`, JSON.stringify({}));

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

      expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
        csrf_token: "csrf-token",
        new_password: "secret",
        old_password: "12345",
      });
    });
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
});

describe("ChangePassword Container", () => {
  let getWrapper;

  beforeEach(() => {
    getWrapper = function () {
      return setupComponent({
        component: <ChangePasswordContainer />,
        overrides: { chpass: { suggested_password: "secret" } },
      });
    };
  });

  it("Renders test", () => {
    const wrapper = getWrapper();
    const button = wrapper.find("#pwmode-button");
    expect(button.exists()).toEqual(true);
  });
});
