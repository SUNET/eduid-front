const webpack = require("webpack");

module.exports = {
  initialConfigPlugin: new webpack.DefinePlugin({
    EDUID_COOKIE_NAME: JSON.stringify("sessid"),
    LOGIN_CONFIG_URL: JSON.stringify("/services/jsconfig/login/config"),
    PASSWORD_SERVICE_URL: JSON.stringify("/services/reset-password"),
    GROUP_MGMT_URL: JSON.stringify("/services/group-management"),
  }),
};
