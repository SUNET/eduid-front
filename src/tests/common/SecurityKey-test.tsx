import userEvent from "@testing-library/user-event";
import { SecurityKey } from "components/Common/SecurityKey";
import { render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

describe("SecurityKey", () => {
  test("leaves the active state when setup() fails", async () => {
    const setup = jest.fn().mockRejectedValue(new Error("challenge request failed"));
    render(<SecurityKey setup={setup} onSuccess={jest.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: /use security key/i }));

    await waitFor(() => expect(setup).toHaveBeenCalled());
    // back on the inactive view with the button available, not stuck on the animation
    await waitFor(() => expect(screen.getByRole("button", { name: /use security key/i })).toBeEnabled());
    expect(screen.queryByAltText(/animation of Security Key/i)).not.toBeInTheDocument();
  });
});
