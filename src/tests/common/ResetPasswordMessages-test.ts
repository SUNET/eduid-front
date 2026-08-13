import { readFileSync } from "node:fs";
import { join } from "node:path";
import extractedMessages from "translation/extractedMessages.json";

// Message keys the backend can return in the reset password flow. A key without a translation is
// rendered as the raw key in the notification area, see dynamicMessage() in translation/index.
//
// This asserts on the extracted messages rather than on languages/en.json and languages/sv.json,
// since those are maintained in Transifex and are not updated from this repository.
const RESET_PASSWORD_MESSAGE_KEYS = [
  "resetpw.email-address-required",
  "resetpw.email-code-too-many-tries",
  "resetpw.email-not-validated",
  "resetpw.invalid_session",
  "resetpw.state-not-found",
];

const messages = extractedMessages as { [key: string]: { string: string } };

test.each(RESET_PASSWORD_MESSAGE_KEYS)("%s has an extracted message", (key) => {
  expect(messages[key]?.string).toEqual(expect.any(String));
});

test("the too-many-tries message has no embedded whitespace", () => {
  const source = readFileSync(join(process.cwd(), "src/translation/defaultMessages/resetPassword.tsx"), "utf8");

  expect(source).toContain(
    'defaultMessage="Too many incorrect codes have been entered. For security reasons this password reset has been stopped. Please wait until the code expires, then start over."',
  );
});
