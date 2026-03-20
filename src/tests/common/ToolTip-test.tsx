import userEvent from "@testing-library/user-event";
import { ToolTip } from "components/Common/ToolTip";
import { render, screen, waitFor } from "../helperFunctions/DashboardTestApp-rtl";

test("renders trigger button with info icon", () => {
  render(<ToolTip />);

  const triggerButton = screen.getByRole("button", { name: /show security info/i });
  expect(triggerButton).toBeInTheDocument();
});

test("tooltip is hidden by default", () => {
  render(<ToolTip />);

  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  expect(screen.queryByText(/For your security/i)).not.toBeInTheDocument();
});

test("shows tooltip on mouse hover", async () => {
  render(<ToolTip />);

  const triggerButton = screen.getByRole("button", { name: /show security info/i });

  await userEvent.hover(triggerButton);

  await waitFor(() => {
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText(/For your security/i)).toBeInTheDocument();
    expect(screen.getByText(/To edit these settings you might be asked to re-login/i)).toBeInTheDocument();
  });
});

test("hides tooltip on mouse leave", async () => {
  render(<ToolTip />);

  const triggerButton = screen.getByRole("button", { name: /show security info/i });

  await userEvent.hover(triggerButton);
  await waitFor(() => {
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  await userEvent.unhover(triggerButton);
  await waitFor(() => {
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

test("displays correct tooltip content", async () => {
  render(<ToolTip />);

  const triggerButton = screen.getByRole("button", { name: /show security info/i });
  await userEvent.hover(triggerButton);

  await waitFor(() => {
    const title = screen.getByRole("heading", { level: 5 });
    expect(title).toHaveTextContent(/For your security/i);
    expect(screen.getByText(/To edit these settings you might be asked to re-login/i)).toBeInTheDocument();
  });
});

test("tooltip stays visible when hovering over tooltip itself", async () => {
  render(<ToolTip />);

  const triggerButton = screen.getByRole("button", { name: /show security info/i });

  await userEvent.hover(triggerButton);
  await waitFor(() => {
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  const tooltip = screen.getByRole("tooltip");
  await userEvent.hover(tooltip);

  expect(screen.getByRole("tooltip")).toBeInTheDocument();
});

test("trigger button has correct aria-label", () => {
  render(<ToolTip />);

  const triggerButton = screen.getByRole("button", { name: /show security info/i });
  expect(triggerButton).toHaveAttribute("aria-label", "Show security info");
});

test("trigger button is focusable with keyboard", async () => {
  render(<ToolTip />);

  await userEvent.tab();

  const triggerButton = screen.getByRole("button", { name: /show security info/i });
  expect(triggerButton).toHaveFocus();
});

test("tooltip can be opened with keyboard", async () => {
  render(<ToolTip />);

  const triggerButton = screen.getByRole("button", { name: /show security info/i });
  triggerButton.focus();

  await userEvent.keyboard("{Enter}");
  await waitFor(() => {
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});
