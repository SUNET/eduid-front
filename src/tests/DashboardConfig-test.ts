import expect from "expect";
import configSlice, { DashboardConfig, initialState as DashboardInitialConfig } from "reducers/DashboardConfig";
import { fetchJsConfig } from "apis/eduidJsConfig";

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
