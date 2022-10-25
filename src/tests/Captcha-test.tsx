import { Captcha } from "components/Captcha";
import { render, screen } from "./helperFunctions/SignupTestApp-rtl";

function handleCaptchaCancel() {}
function handleCaptchaCompleted(response: string) {}
function toggleCaptcha() {}

const args = { handleCaptchaCancel, handleCaptchaCompleted, toggleCaptcha };

test("Google ReCaptcha loads", () => {
  render(<Captcha {...args} />);

  expect(screen.getByRole("button", { name: /Switch/i })).toBeEnabled();
  expect(screen.getByRole("button", { name: /Cancel/i })).toBeEnabled();
});
