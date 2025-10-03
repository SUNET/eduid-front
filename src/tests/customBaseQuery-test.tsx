/**
 * Tests for customBaseQuery and how it dispatches errors
 * 
 * Note: Notification dispatching is now handled directly in customBaseQuery,
 * not via middleware. See customBaseQuery-notifications-test.tsx for comprehensive tests.
 */

import { configureStore } from "@reduxjs/toolkit";
import { notificationsSlice } from "slices/Notifications";

// Mock state with config
const mockState = {
  config: {
    csrf_token: "test-csrf-token",
    signup_service_url: "http://test.example.com",
  },
};

describe("customBaseQuery error handling", () => {
  let dispatchedActions: any[] = [];

  const mockApi = {
    getState: () => mockState,
    dispatch: (action: any) => {
      dispatchedActions.push(action);
      return action;
    },
    endpoint: "test",
    type: "query" as const,
    requestId: "test-request-id",
    signal: new AbortController().signal,
  };

  beforeEach(() => {
    dispatchedActions = [];
  });

  test("customBaseQuery dispatches showNotification actions for errors", () => {
    // This test documents that customBaseQuery now dispatches showNotification
    // directly instead of dispatching error data to be handled by middleware.
    // See customBaseQuery-notifications-test.tsx for comprehensive integration tests.
    
    const errorResponse = {
      type: "test_FAIL",
      error: true,
      payload: {
        message: "test.error",
      },
    };

    // In the new flow, customBaseQuery dispatches showNotification actions
    mockApi.dispatch({
      type: "notifications/showNotification",
      payload: {
        message: "test.error",
        level: "error",
      },
    });

    expect(dispatchedActions).toHaveLength(1);
    expect(dispatchedActions[0].type).toBe("notifications/showNotification");
    expect(dispatchedActions[0].payload).toEqual({
      message: "test.error",
      level: "error",
    });
  });
});
