import { BrowserSupportCheck } from "components/Common/BrowserSupportCheck";
import { Notifications } from "components/Common/Notifications";
import * as browserSupport from "helperFunctions/browserSupport";
import { render, screen } from "../helperFunctions/LoginTestApp-rtl";

const App = () => (
  <>
    <BrowserSupportCheck />
    <Notifications />
  </>
);

describe("BrowserSupportCheck", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("shows nothing in a supported browser", () => {
    jest.spyOn(browserSupport, "detectBrowserSupport").mockReturnValue({ unsupported: false, noWebauthn: false });
    render(<App />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("shows the unsupported browser notification", () => {
    jest.spyOn(browserSupport, "detectBrowserSupport").mockReturnValue({ unsupported: true, noWebauthn: false });
    render(<App />);
    expect(screen.getByRole("alert")).toHaveTextContent(/your browser may not work well with eduID/i);
    expect(screen.getByRole("alert")).not.toHaveTextContent(/passkeys/i);
  });

  test("mentions passkeys when WebAuthn is missing", () => {
    jest.spyOn(browserSupport, "detectBrowserSupport").mockReturnValue({ unsupported: false, noWebauthn: true });
    render(<App />);
    expect(screen.getByRole("alert")).toHaveTextContent(/security keys and passkeys are not supported/i);
    expect(screen.getByRole("alert")).not.toHaveTextContent(/may not work well/i);
  });

  test("combines both messages", () => {
    jest.spyOn(browserSupport, "detectBrowserSupport").mockReturnValue({ unsupported: true, noWebauthn: true });
    render(<App />);
    expect(screen.getByRole("alert")).toHaveTextContent(/may not work well.*passkeys are not supported/i);
  });

  test("is shown once per browser session", () => {
    const detect = jest
      .spyOn(browserSupport, "detectBrowserSupport")
      .mockReturnValue({ unsupported: true, noWebauthn: false });
    const first = render(<App />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    first.unmount();

    render(<App />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(detect).toHaveBeenCalledTimes(1);
  });
});
