const webpack = require("webpack");

module.exports = {
  initialConfigPlugin: new webpack.DefinePlugin({
    ACTIONS_SERVICE_URL: JSON.stringify("/services/actions2/")
  })
};
