import userEvent from "@testing-library/user-event";
import { PassKey } from "components/Common/Passkey";
import { SecurityKey } from "components/Common/SecurityKey";
import { ThemeProvider } from "components/Common/ThemeContext";
import { render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

const g = globalThis as unknown as Record<string, unknown>;

const requestOptions: PublicKeyCredentialRequestOptionsJSON = {
  challenge: "AAAA",
  rpId: "eduid.docker",
};

const fakeCredential = {
  toJSON: () => ({ id: "cred-id", rawId: "cred-id", type: "public-key", response: {}, clientExtensionResults: {} }),
};

describe("hints on the login buttons", () => {
  const originalPKC = g.PublicKeyCredential;
  const originalCredentials = Object.getOwnPropertyDescriptor(navigator, "credentials");
  let get: jest.Mock;

  beforeEach(() => {
    // no native parseRequestOptionsFromJSON: exercises the fallback parser
    g.PublicKeyCredential = function PublicKeyCredential() {};
    get = jest.fn().mockResolvedValue(fakeCredential);
    Object.defineProperty(navigator, "credentials", { value: { get }, configurable: true });
  });

  afterEach(() => {
    g.PublicKeyCredential = originalPKC;
    if (originalCredentials) {
      Object.defineProperty(navigator, "credentials", originalCredentials);
    } else {
      delete (navigator as unknown as Record<string, unknown>).credentials;
    }
  });

  test("the security key button prefers a security key", async () => {
    const setup = jest.fn().mockResolvedValue(requestOptions);
    render(<SecurityKey setup={setup} onSuccess={jest.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: /use security key/i }));

    await waitFor(() => expect(get).toHaveBeenCalledTimes(1));
    expect(get.mock.calls[0][0].publicKey.hints).toEqual(["security-key"]);
  });

  test("the passkey button prefers this device or a phone", async () => {
    const setup = jest.fn().mockResolvedValue(requestOptions);
    render(
      <ThemeProvider>
        <PassKey setup={setup} onSuccess={jest.fn()} />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(get).toHaveBeenCalledTimes(1));
    expect(get.mock.calls[0][0].publicKey.hints).toEqual(["client-device", "hybrid"]);
  });

  test("the challenge from the backend is otherwise untouched", async () => {
    const setup = jest.fn().mockResolvedValue({ ...requestOptions, userVerification: "preferred" });
    render(<SecurityKey setup={setup} onSuccess={jest.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: /use security key/i }));

    await waitFor(() => expect(get).toHaveBeenCalledTimes(1));
    expect(get.mock.calls[0][0].publicKey.userVerification).toBe("preferred");
    expect(get.mock.calls[0][0].publicKey.rpId).toBe("eduid.docker");
  });
});
