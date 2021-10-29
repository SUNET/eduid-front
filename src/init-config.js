const webpack = require("webpack");
const langs = [
  ["en", "English"],
  ["sv", "Svenska"],
];
// require all translation files in langs array
const messages = Object.assign(
  ...langs.map(([key]) => ({
    [key]: require(`./login/translation/languages/${key}`),
  }))
);

module.exports = {
  initialConfigPlugin: new webpack.DefinePlugin({
    EDUID_COOKIE_NAME: JSON.stringify("sessid"),
    LOGIN_CONFIG_URL: JSON.stringify("/services/jsconfig/login/config"),
    PASSWORD_SERVICE_URL: JSON.stringify("/services/reset-password"),
    AVAILABLE_LANGUAGES: JSON.stringify(langs),
    LOCALIZED_MESSAGES: JSON.stringify(messages),
    GROUP_MGMT_URL: JSON.stringify("/services/group-management"),
  }),
};
