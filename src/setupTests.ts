// This ensures you can use `window.fetch()` in your Jest tests.
require("whatwg-fetch");

import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

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
      console.error("%s: Found an unhandled %s request to %s", "color: red", req.method, req.url.href);
    },
  })
);
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

// re-export rest for convenience in imports to tests
export { rest } from "msw";
