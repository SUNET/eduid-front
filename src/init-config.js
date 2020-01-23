const webpack = require("webpack"),
  langs = [["en", "English"], ["sv", "Svenska"]],
  messages = {};

langs.forEach(lang => {
  messages[lang[0]] = require("../i18n/l10n/" + lang[0]);
});

module.exports = {
  initialConfigPlugin: new webpack.DefinePlugin({
    EDUID_COOKIE_NAME: JSON.stringify("sessid"),
    TOKEN_SERVICE_URL: JSON.stringify("/services/authn/login"),
    EDUID_CONFIG_URL: JSON.stringify("/services/jsconfig/config"),
    SIGNUP_CONFIG_URL: JSON.stringify("/services/jsconfig/signup/config"),
    LOGIN_CONFIG_URL: JSON.stringify("/services/jsconfig/login/config"),
    AVAILABLE_LANGUAGES: JSON.stringify(langs),
    LOCALIZED_MESSAGES: JSON.stringify(messages),
    SIGNUP_SERVICE_URL: JSON.stringify("/services/signup/"),
    BASE_PATH: JSON.stringify("/register")
  })
};
