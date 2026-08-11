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
