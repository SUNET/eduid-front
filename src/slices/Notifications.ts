import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type notificationLevel = "error" | "info";

export interface eduidNotification {
  level: notificationLevel;
  message: string;
}

// Define a type for the slice state
export interface NotificationState {
  info?: eduidNotification;
  error?: eduidNotification;
}

// export for use in tests
export const initialState: NotificationState = {};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<eduidNotification>) => {
      switch (action.payload.level) {
        case "error":
          state.error = action.payload;
          break;
        case "info":
          state.info = action.payload;
          break;
      }
    },
    clearNotifications: (state) => {
      state.error = undefined;
      state.info = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("@@router/LOCATION_CHANGE", (state) => {
      state.error = undefined;
      state.info = undefined;
    });
  },
});

// since all old code use imports like these
export const showNotification = notificationsSlice.actions.showNotification;
export const clearNotifications = notificationsSlice.actions.clearNotifications;
//export const intlReducer = intlSlice.reducer;
