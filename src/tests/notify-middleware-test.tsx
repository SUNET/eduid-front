/**
 * Tests for the notification middleware
 * 
 * The middleware now only handles WebAuthn-specific errors.
 * API error notifications are handled directly in customBaseQuery.
 */

import { configureStore } from "@reduxjs/toolkit";
import notifyAndDispatch from "middleware/notify-middleware";
import { notificationsSlice } from "slices/Notifications";

describe("notify-middleware WebAuthn error handling", () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        notifications: notificationsSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(notifyAndDispatch),
    });
  };

  beforeEach(() => {
    store = createTestStore();
    window.scroll = jest.fn();
  });

  test("middleware handles WebAuthn NotAllowedError from performAuthentication", () => {
    store.dispatch({
      type: "some/performAuthentication/rejected",
      error: {
        name: "NotAllowedError",
        message: "User cancelled authentication",
      },
    });

    const state = store.getState();
    expect(state.notifications.error).toEqual({
      level: "error",
      message: "User cancelled authentication",
    });
  });

  test("middleware handles WebAuthn NotAllowedError from createCredential", () => {
    store.dispatch({
      type: "some/createCredential/rejected",
      error: {
        name: "NotAllowedError",
        message: "User cancelled credential creation",
      },
    });

    const state = store.getState();
    expect(state.notifications.error).toEqual({
      level: "error",
      message: "User cancelled credential creation",
    });
  });

  test("middleware does not handle other action types", () => {
    store.dispatch({
      type: "someAction_FAIL",
      error: true,
      payload: {
        message: "test.error.message",
      },
    });

    const state = store.getState();
    // No notification should be dispatched for FAIL actions anymore
    expect(state.notifications.error).toBeUndefined();
  });

  test("middleware does not handle WebAuthn errors with different error names", () => {
    store.dispatch({
      type: "some/performAuthentication/rejected",
      error: {
        name: "SomeOtherError",
        message: "Some other error",
      },
    });

    const state = store.getState();
    // No notification should be dispatched
    expect(state.notifications.error).toBeUndefined();
  });
});
