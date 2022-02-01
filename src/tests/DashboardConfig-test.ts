import expect from "expect";
import configSlice, { DashboardConfig, initialState as DashboardInitialConfig } from "reducers/DashboardConfig";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { fakeStore } from "./helperFunctions/DashboardTestApp";
import fetchMock from "jest-fetch-mock";

describe("Config reducers", () => {
  const mockState: DashboardConfig = {
    ...DashboardInitialConfig,
    csrf_token: "",
    personal_data_url: "old value",
  };

  const mockRequest = { url: "/jsconfig" };

  it("Receives a GET_CONFIG_SUCCESS action", () => {
    expect(
      configSlice.reducer(
        mockState,
        fetchJsConfig.fulfilled(
          {
            csrf_token: "",
            personal_data_url: "new value",
          },
          "fakeRequestId",
          mockRequest
        )
      )
    ).toEqual({ ...mockState, personal_data_url: "new value", is_configured: true });
  });

  it("Receives a GET_CONFIG_FAIL action", () => {
    expect(
      configSlice.reducer(mockState, fetchJsConfig.rejected(new Error("Bad error"), "fakeRequestId", mockRequest))
    ).toEqual({ ...mockState, is_configured: false });
  });

  it("Receives a DUMMY action", () => {
    expect(
      configSlice.reducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload",
      })
    ).toEqual(mockState);
  });
});

describe("fetchJsConfig Thunk", () => {
  it("fetches configuration", () => {
    const store = fakeStore();
    const dispatch = store.dispatch;

    const url = "/test-jsconfig-url";
    const payload = { dashboard_url: "new-value", password_entropy: 42 };
    fetchMock.doMockIf(url, JSON.stringify({ payload }));

    return dispatch(fetchJsConfig({ url })).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(["config/fetchJsConfig/pending", "config/fetchJsConfig/fulfilled"]);

      // apply all actions to the reducer, and verify the state afterwards
      const stateBefore = { ...store.getState().config };
      let newState: DashboardConfig = { ...stateBefore };
      store.getActions().forEach((action) => {
        newState = configSlice.reducer(newState, action);
      });

      // we expect the suggested_password in the state to have been updated with the value from the mock response
      expect(newState).toEqual({ ...stateBefore, ...payload, is_configured: true });
    });
  });

  it("handles backend errors", () => {
    const store = fakeStore();
    const dispatch = store.dispatch;

    const url = "/test-jsconfig-url";
    fetchMock.doMockIf(
      url,
      JSON.stringify({ payload: { message: "failed" }, error: true, type: "TEST_JSCONFIG_FAIL" })
    );

    return dispatch(fetchJsConfig({ url })).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual([
        "config/fetchJsConfig/pending",
        "TEST_JSCONFIG_FAIL",
        "config/fetchJsConfig/rejected",
      ]);

      const fail = store.getActions()[1];
      expect(fail).not.toBeUndefined();
    });
  });

  it("handles network errors", () => {
    const store = fakeStore();
    const dispatch = store.dispatch;

    const url = "/test-jsconfig-url";
    fetchMock.mockReject(new Error("Service Unavailable"));

    return dispatch(fetchJsConfig({ url })).then(() => {
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(["config/fetchJsConfig/pending", "jsconfig_FAIL", "config/fetchJsConfig/rejected"]);
      const fail = store.getActions()[1];
      expect(fail).toEqual({ type: "jsconfig_FAIL", payload: { message: "Error: Service Unavailable" }, error: true });
    });
  });
});
