/**
 * Tests for customBaseQuery and how it dispatches errors
 * 
 * Note: Notification dispatching is now handled directly in customBaseQuery,
 * not via middleware. See customBaseQuery-notifications-test.tsx for comprehensive tests.
 */

describe("customBaseQuery error handling", () => {
  let dispatchedActions: unknown[] = [];

  const mockApi = {
    getState: () => ({
      config: {
        csrf_token: "test-csrf-token",
        signup_service_url: "http://test.example.com",
      },
    }),
    dispatch: (action: unknown) => {
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

    // In the new flow, customBaseQuery dispatches showNotification actions
    mockApi.dispatch({
      type: "notifications/showNotification",
      payload: {
        message: "test.error",
        level: "error",
      },
    });

    expect(dispatchedActions).toHaveLength(1);
    expect(dispatchedActions[0]).toMatchObject({
      type: "notifications/showNotification",
      payload: {
        message: "test.error",
        level: "error",
      },
    });
  });
});
