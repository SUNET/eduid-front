import expect from "expect";
import configSlice from "reducers/DashboardConfig";
import { requestConfig, fetchConfig } from "../sagas/DashboardConfig";
import { put, call } from "redux-saga/effects";
import { fetchJsConfig } from "apis/eduidJsConfig";

describe("Config reducers", () => {
  const mockState = {
    csrf_token: "",
    param1: "old value",
  };

  it("Receives a GET_CONFIG_SUCCESS action", () => {
    expect(
      configSlice.reducer(
        mockState,
        fetchJsConfig.fulfilled({
          csrf_token: "",
          param1: "new value",
        })
      )
    ).toEqual({
      csrf_token: "",
      param1: "new value",
      is_configured: true,
    });
  });

  it("Receives a GET_CONFIG_FAIL action", () => {
    expect(
      configSlice.reducer(
        mockState,
        fetchJsConfig.rejected({
          message: "Bad error",
        })
      )
    ).toEqual({
      csrf_token: "",
      param1: "old value",
      is_configured: false,
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      configSlice.reducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload",
      })
    ).toEqual({
      csrf_token: "",
      param1: "old value",
    });
  });
});

const mockState = {
  personal_data: {
    given_name: "",
    surname: "",
    display_name: "",
    language: "",
  },
  config: {
    csrf_token: "",
    is_configured: false,
    personal_data_url: "http://localhost/services/personal-data/user",
  },
};
const getState = () => mockState;

describe("Async component", () => {
  it("Sagas requestConfig", () => {
    const generator = requestConfig(getState);

    const url = "/services/jsconfig/config";
    let next = generator.next(url);
    expect(next.value).toEqual(call(fetchConfig, url));

    const config = next.value;
    next = generator.next(next.value);
    expect(next.value).toEqual(put(config));
  });
});
