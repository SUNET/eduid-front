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

interface TransifexData {
  [key: string]: { string: string };
}

const format_for_react_intl = (data: TransifexData): Record<string, string> => {
  const result: Record<string, string> = {};
  Object.keys(data).forEach((k) => {
    result[k] = data[k].string;
  });
  return result;
};

export const messages: Record<string, Record<string, string>> = {
  en: format_for_react_intl(en),
  sv: format_for_react_intl(sv),
};
