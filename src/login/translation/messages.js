/* This has to be a .js file because it is imported by webpack before transpiling
 * ... and it has to be CommonJS until we add "type": "module" to package.json.
 */
const en = require("./languages/en.json");
const sv = require("./languages/sv.json");

/*
 * Transifex outputs
 *
 *  "login.general_failure": {
 *   "string": "An error occurred. Please try again later."
 *  },
 *
 * where react-intl wants
 *
 *  "login.general_failure": "An error occurred. Please try again later."
 *
 */
const format_for_react_intl = (data) => {
  let result = {};
  Object.keys(data).forEach((k) => {
    result[k] = data[k].string;
  });
  return result;
};

const messages = { en: format_for_react_intl(en), sv: format_for_react_intl(sv) };

module.exports = { messages: messages };
