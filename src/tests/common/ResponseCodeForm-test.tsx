import { userEvent } from "@testing-library/user-event";
import { ResponseCodeButtons } from "components/Common/ResponseCodeAbortButton";
import EmailInput from "components/Common/EmailInput";
import { codeFormTestId, ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { render, screen, within } from "../helperFunctions/LoginTestApp-rtl";

const user = userEvent.setup();

test("renders the extra field inside the code form, focuses it instead of the first digit, and submits the email together with the code", async () => {
  const submitted: ResponseCodeValues[] = [];

  render(
    <ResponseCodeForm
      inputsDisabled={false}
      autoFocusCode={false}
      extraFields={<EmailInput name="email" required={true} autoFocus={true} />}
      handleSubmitCode={(values) => submitted.push(values)}
    >
      <ResponseCodeButtons handleAbortButtonOnClick={() => undefined} />
    </ResponseCodeForm>,
  );

  // Scope to the <form> itself: extraFields must render inside it (not as a sibling), or
  // native Enter-to-submit from the email input would no longer include the code, and vice versa.
  const form = within(screen.getByTestId(codeFormTestId));

  const emailInput = form.getByRole("textbox");
  expect(emailInput).toHaveFocus();

  const digitInputs = form.getAllByRole("spinbutton");
  expect(digitInputs).toHaveLength(6);

  await user.type(emailInput, "a@b.se");

  const code = ["1", "2", "3", "4", "5", "6"];
  for (let i = 0; i < code.length; i++) {
    await user.type(digitInputs[i], code[i]);
  }

  // The Ok/Cancel buttons are rendered as ResponseCodeForm's children, alongside (not inside)
  // the <form>, mirroring real usage in EmailLinkSent and SignupEnterCode.
  await user.click(screen.getByRole("button", { name: /ok/i }));

  expect(submitted).toEqual([{ email: "a@b.se", v: code }]);
});
