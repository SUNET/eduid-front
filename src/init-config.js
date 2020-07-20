const webpack = require("webpack");
const langs = [
  ["en", "English"],
  ["sv", "Svenska"]
];

const messages = {};

// langs.forEach(lang => {
//   messages[lang[0]] = require("../i18n/translate/" + lang[0]);
// });

langs.forEach(lang => {
  messages[lang[0]] = require("./login/translation/languages/" + lang[0]);
});

module.exports = {
  initialConfigPlugin: new webpack.DefinePlugin({
    EDUID_COOKIE_NAME: JSON.stringify("sessid"),
    TOKEN_SERVICE_URL: JSON.stringify("/services/authn/login"),
    EDUID_CONFIG_URL: JSON.stringify("/services/jsconfig/config"),
    SIGNUP_CONFIG_URL: JSON.stringify("/services/jsconfig/signup/config"),
    LOGIN_CONFIG_URL: JSON.stringify("/services/jsconfig/login/config"),
    PASSWORD_SERVICE_URL: JSON.stringify("/services/reset-password"),
    AVAILABLE_LANGUAGES: JSON.stringify(langs),
    LOCALIZED_MESSAGES: JSON.stringify(messages),
    SIGNUP_SERVICE_URL: JSON.stringify("/services/signup/"),
    BASE_PATH: JSON.stringify("/register"),
    GROUP_MGMT_URL: JSON.stringify("/services/group-management/"),
  }),
};
