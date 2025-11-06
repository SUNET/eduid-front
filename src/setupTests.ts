// jest-dom adds custom matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";

// Setup MSW to act as a mock backend in tests. In a test that accesses a backend endpoint,
// do something like this:
//
// mswServer.use(
//     rest.post("/next", (req, res, ctx) => {
//       const payload: LoginNextResponse = {
//         action: "FINISHED",
//         target: "/foo",
//       };
//       return res(ctx.json({ type: "test response", payload: payload }));
//     })
//   );
export const mswServer = setupServer();

beforeAll(() =>
  mswServer.listen({
    onUnhandledRequest(req) {
      // having this here instead of just onUnhandledRequest: 'warn' allows you to set a breakpoint here :)
      const url = new URL(req.url);
      console.error("%s: Found an unhandled %s request to %s", "color: red", req.method, url.href);
    },
  })
);
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
