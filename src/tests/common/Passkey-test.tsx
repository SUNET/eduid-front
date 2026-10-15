import userEvent from "@testing-library/user-event";
import { PassKey } from "components/Common/Passkey";
import { ThemeProvider } from "components/Common/ThemeContext";
import {
  loginTestState,
  render,
  screen,
  waitFor,
} from "../helperFunctions/LoginTestApp-rtl";

const credentialsGet = jest.fn();

const originalCredentials = Object.getOwnPropertyDescriptor(
  navigator,
  "credentials",
);
const originalPublicKeyCredential = Object.getOwnPropertyDescriptor(
  globalThis,
  "PublicKeyCredential",
);

function restoreWebAuthnGlobals() {
  if (originalCredentials) {
    Object.defineProperty(navigator, "credentials", originalCredentials);
  } else {
    delete (navigator as { credentials?: unknown }).credentials;
  }
  if (originalPublicKeyCredential) {
    Object.defineProperty(
      globalThis,
      "PublicKeyCredential",
      originalPublicKeyCredential,
    );
  } else {
    delete (globalThis as { PublicKeyCredential?: unknown })
      .PublicKeyCredential;
  }
}
const fakeCredential = {
  toJSON: () => ({
    id: "cred-id",
    rawId: "cred-id",
    type: "public-key",
    response: { clientDataJSON: "x", authenticatorData: "x", signature: "x" },
    clientExtensionResults: {},
  }),
};
const options = { challenge: "c", allowCredentials: [] };

beforeEach(() => {
  Object.defineProperty(globalThis, "PublicKeyCredential", {
    configurable: true,
    writable: true,
    value: { parseRequestOptionsFromJSON: (o: unknown) => o },
  });
  Object.defineProperty(navigator, "credentials", {
    configurable: true,
    value: { get: credentialsGet },
  });
  credentialsGet.mockResolvedValue(fakeCredential);
});

afterEach(() => {
  restoreWebAuthnGlobals();
  credentialsGet.mockReset();
});

async function renderAndClick(
  onSuccess: jest.Mock,
  onComplete: jest.Mock,
  setup = jest.fn().mockResolvedValue(options),
) {
  render(
    <ThemeProvider>
      <PassKey setup={setup} onSuccess={onSuccess} onComplete={onComplete} />
    </ThemeProvider>,
    { state: loginTestState },
  );
  await userEvent.click(
    screen.getByRole("button", { name: /log in with passkey/i }),
  );
}

test("onComplete not called when onSuccess resolves true", async () => {
  const onSuccess = jest.fn().mockResolvedValue(true);
  const onComplete = jest.fn();
  await renderAndClick(onSuccess, onComplete);
  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: /log in with passkey/i }),
    ).toBeEnabled(),
  );
  expect(onComplete).not.toHaveBeenCalled();
});

test("onComplete called once when onSuccess resolves false", async () => {
  const onSuccess = jest.fn().mockResolvedValue(false);
  const onComplete = jest.fn();
  await renderAndClick(onSuccess, onComplete);
  await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  expect(onSuccess).toHaveBeenCalledTimes(1);
});

test("onComplete called when onSuccess rejects", async () => {
  const onSuccess = jest.fn().mockRejectedValue(new Error("boom"));
  const onComplete = jest.fn();
  await renderAndClick(onSuccess, onComplete);
  await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
});

test("onComplete called when credential request is cancelled", async () => {
  credentialsGet.mockRejectedValue(
    new DOMException("cancel", "NotAllowedError"),
  );
  const onSuccess = jest.fn();
  const onComplete = jest.fn();
  await renderAndClick(onSuccess, onComplete);
  await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  expect(onSuccess).not.toHaveBeenCalled();
});
