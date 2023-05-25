import { PhoneCaptchaResponse, PhonesResponse } from "apis/eduidPhone";
import { DashboardMain } from "components/DashboardMain";
import { act } from "react-dom/test-utils";
import { mswServer, rest } from "setupTests";
import { fireEvent, render, screen } from "./helperFunctions/DashboardTestApp-rtl";

test("renders Phones component as expected", () => {
  render(<DashboardMain />);
  // Navigate to Settings
  const nav = screen.getByRole("link", { name: "Settings" });
  act(() => {
    nav.click();
  });

  expect(screen.getByRole("heading", { name: /Mobile phone numbers/i })).toBeInTheDocument();
  const addMorePhoneButton = screen.getAllByText("+ add more", { selector: "button" })[1];
  // Click the 'add more' button
  act(() => {
    addMorePhoneButton.click();
  });
  expect(addMorePhoneButton).not.toBeInTheDocument();

  const input = screen.getByLabelText("Phone number");
  fireEvent.change(input, { target: { value: "+46701233333" } });
  expect(input).toHaveValue("+46701233333");

  const addPhoneButton = screen.getByRole("button", { name: "Add" });
  expect(addPhoneButton).toBeEnabled();
});

test("enable to add number already in the list", async () => {
  render(<DashboardMain />, {
    state: {
      phones: {
        phones: [{ number: "+46701233333", primary: false, verified: false }],
      },
    },
  });
  // Navigate to Settings
  const nav = screen.getByRole("link", { name: "Settings" });
  act(() => {
    nav.click();
  });

  expect(screen.getByRole("heading", { name: /Mobile phone numbers/i })).toBeInTheDocument();
  const addMorePhoneButton = screen.getAllByText("+ add more", { selector: "button" })[1];
  // Click the 'add more' button
  act(() => {
    addMorePhoneButton.click();
  });
  expect(addMorePhoneButton).not.toBeInTheDocument();

  const input = screen.getByLabelText("Phone number");
  fireEvent.change(input, { target: { value: "+46701233333" } });
  expect(input).toHaveValue("+46701233333");
  expect(await screen.findByRole("alert")).toHaveTextContent("phones.duplicated");
  const addPhoneButton = screen.getByRole("button", { name: "Add" });
  expect(addPhoneButton).toBeDisabled();
});

test("renders confirmation code modal", async () => {
  const internal_response = "image12345";

  mswServer.use(
    rest.post("captcha", (req, res, ctx) => {
      const body = req.body as {
        internal_response: string;
      };
      if (body.internal_response != internal_response) {
        return res(ctx.status(400));
      }
      const payload: PhoneCaptchaResponse = {
        captcha_img: "image",
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );
  mswServer.printHandlers();

  render(<DashboardMain />, {
    state: {
      phones: {
        captcha: {
          captcha_img: "data:image/png;base64",
        },
        phones: [{ number: "+46701233333", primary: false, verified: false }],
      },
    },
  });
  // Navigate to Settings
  const nav = screen.getByRole("link", { name: "Settings" });
  act(() => {
    nav.click();
  });

  const confirmButton = screen.getByText("confirm", { selector: "button" });
  expect(confirmButton).toBeEnabled();
  // Click the 'confirm' button
  act(() => {
    confirmButton.click();
  });
  const captchaModal = await screen.getByRole("dialog", { hidden: false });
  expect(captchaModal).toHaveTextContent("Enter the code sent to");
});

test("renders primary as expected", async () => {
  const number = "+46701234567";

  mswServer.use(
    rest.post("/primary", (req, res, ctx) => {
      const body = req.body as { number: string };
      if (body.number != number) {
        return res(ctx.status(400));
      }

      const payload: PhonesResponse = {
        phones: [
          {
            number: "+46701234567",
            verified: true,
            primary: true,
          },
        ],
      };
      return res(ctx.json({ type: "test response", payload: payload }));
    })
  );

  render(<DashboardMain />, {
    state: {
      phones: {
        captcha: {
          captcha_img: "data:image/png;base64,iVBORw0KGgoAAAANSUhE",
        },
        phones: [{ number: "+46701233333", primary: true, verified: true }],
      },
    },
  });

  // Navigate to Settings
  const nav = screen.getByRole("link", { name: "Settings" });
  act(() => {
    nav.click();
  });

  const row = screen.getByRole("row", { name: "+46701233333 PRIMARY" });
  expect(row).toBeInTheDocument();
});
