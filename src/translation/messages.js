import en from "./languages/en.json";
import sv from "./languages/sv.json";

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

// the proper TypeScript type for messages would be { [key: string]: { [key: string]: string } }
export const messages = { en: format_for_react_intl(en), sv: format_for_react_intl(sv) };
