/*
 * Code and data structures for talking to the emails backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ConnectAppDispatch, ConnectRootState } from "../connect-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

// export interface AllUsersResponse {
//   users: User[];
// }

/*********************************************************************************************************************/
/**
 * @public
 * @function searchUsers
 * @desc Redux async thunk to search users
 */
export const searchUsers = createAsyncThunk<
  any, // return type
  string, // args type
  { dispatch: ConnectAppDispatch; state: ConnectRootState }
>("connect/searchUsers", async (args, thunkAPI) => {
  return makeConnectRequest<any>(thunkAPI, `users?q=${args}`)
    .then((response) => response)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeConnectRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  //   if (!state.config.emails_url) {
  //     throw new Error("Missing configuration emails_url");
  //   }

  return makeGenericRequest<T>(thunkAPI, "https://jsonplaceholder.typicode.com/", endpoint, body, data);
}
