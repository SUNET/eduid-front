import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  level: "errors" | "messages";
  message: string;
  values?: unknown[];
}

export interface Message {
  msg: string;
  vals?: unknown[];
}
// Define a type for the slice state
interface NotificationState {
  messages: Message[];
  errors: Message[];
}

const initialState: NotificationState = {
  messages: [],
  errors: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Notification>) => {
      const msg: Message = { msg: action.payload.message, vals: action.payload.values };
      switch (action.payload.level) {
        case "errors":
          state.errors = [msg];
          break;
        case "messages":
          state.errors = [msg];
          break;
      }
    },
    clearNotifications: (state) => {
      state.errors = [];
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase("@@router/LOCATION_CHANGE", (state) => {
      state.errors = [];
      state.messages = [];
    });
  },
});

// since all old code use imports like these
export const showNotification = notificationsSlice.actions.showNotification;
export const clearNotifications = notificationsSlice.actions.clearNotifications;
//export const intlReducer = intlSlice.reducer;
