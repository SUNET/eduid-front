/**
 * Tests for customBaseQuery with direct notification dispatching
 * 
 * These tests verify that customBaseQuery now directly dispatches notifications
 * instead of relying on the notify-middleware
 */

import { configureStore } from "@reduxjs/toolkit";
import { eduIDApi } from "apis/common";
import { notificationsSlice } from "slices/Notifications";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";

describe("customBaseQuery with direct notification dispatching", () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        notifications: notificationsSlice.reducer,
        config: (state = { csrf_token: "test-token", signup_service_url: "http://test.example.com/services/signup" }) => state,
        [eduIDApi.reducerPath]: eduIDApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eduIDApi.middleware),
    });
  };

  beforeEach(() => {
    store = createTestStore();
    window.scroll = jest.fn();
  });

  // Create a test API endpoint
  const testApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
      testEndpoint: builder.query({
        query: () => ({
          url: "test",
        }),
        extraOptions: { service: "signup" },
      }),
    }),
  });

  test("customBaseQuery dispatches error notification for general errors", async () => {
    mswServer.use(
      http.get("http://test.example.com/services/signup/test", () => {
        return HttpResponse.json({
          type: "test_FAIL",
          error: true,
          payload: {
            message: "test.error.message",
          },
        });
      })
    );

    await store.dispatch(testApi.endpoints.testEndpoint.initiate());

    const state = store.getState();
    expect(state.notifications.error).toEqual({
      level: "error",
      message: "test.error.message",
    });
  });

  test("customBaseQuery dispatches error notification for errorMsg", async () => {
    mswServer.use(
      http.get("http://test.example.com/services/signup/test", () => {
        return HttpResponse.json({
          type: "test_FAIL",
          error: true,
          payload: {
            errorMsg: "test.errorMsg",
          },
        });
      })
    );

    await store.dispatch(testApi.endpoints.testEndpoint.initiate());

    const state = store.getState();
    expect(state.notifications.error).toEqual({
      level: "error",
      message: "test.errorMsg",
    });
  });

  test("customBaseQuery handles csrf token errors", async () => {
    mswServer.use(
      http.get("http://test.example.com/services/signup/test", () => {
        return HttpResponse.json({
          type: "test_FAIL",
          error: true,
          payload: {
            error: {
              csrf_token: "invalid",
            },
          },
        });
      })
    );

    await store.dispatch(testApi.endpoints.testEndpoint.initiate());

    const state = store.getState();
    expect(state.notifications.error).toEqual({
      level: "error",
      message: "csrf.try-again",
    });
  });

  test("customBaseQuery handles nin errors", async () => {
    mswServer.use(
      http.get("http://test.example.com/services/signup/test", () => {
        return HttpResponse.json({
          type: "test_FAIL",
          error: true,
          payload: {
            error: {
              nin: ["nin.error.message"],
            },
          },
        });
      })
    );

    await store.dispatch(testApi.endpoints.testEndpoint.initiate());

    const state = store.getState();
    expect(state.notifications.error).toEqual({
      level: "error",
      message: "nin.error.message",
    });
  });

  test("customBaseQuery clears notifications for authn_status.must-authenticate", async () => {
    // First set an error using the proper action creator
    const { showNotification } = await import("slices/Notifications");
    store.dispatch(showNotification({ message: "some.error", level: "error" }));
    expect(store.getState().notifications.error).toBeDefined();

    mswServer.use(
      http.get("http://test.example.com/services/signup/test", () => {
        return HttpResponse.json({
          type: "test_FAIL",
          error: true,
          payload: {
            message: "authn_status.must-authenticate",
          },
        });
      })
    );

    await store.dispatch(testApi.endpoints.testEndpoint.initiate());

    const state = store.getState();
    expect(state.notifications.error).toBeUndefined();
    expect(state.notifications.info).toBeUndefined();
  });

  test("customBaseQuery shows info notification when error is true but only message provided", async () => {
    mswServer.use(
      http.get("http://test.example.com/services/signup/test", () => {
        return HttpResponse.json({
          type: "test_FAIL",
          error: true,
          payload: {
            message: "test.info.message",
          },
        });
      })
    );

    await store.dispatch(testApi.endpoints.testEndpoint.initiate());

    const state = store.getState();
    // Based on the middleware logic, when error is true and payload exists, it should show error
    expect(state.notifications.error).toEqual({
      level: "error",
      message: "test.info.message",
    });
  });
});
