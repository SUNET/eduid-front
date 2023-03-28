import { createSlice } from "@reduxjs/toolkit";
import { EduidJSAppCommonConfig } from "commonConfig";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FaqConfig extends EduidJSAppCommonConfig {}

// export for use in tests
export const initialState: FaqConfig = {
  debug: false,
  error: false,
  is_configured: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default configSlice;
