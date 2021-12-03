// import content from other files
import { generalErrors, specificErrors } from "./defaultMessages/errors";
import { login } from "./defaultMessages/login";
import { generalInstructions } from "./defaultMessages/instructions";
import { changePassword, resetPassword } from "./defaultMessages/password";
import { register } from "./defaultMessages/register";
import { generalApp } from "./defaultMessages/generalApp";
import { userData, userProfile, userVetting } from "./defaultMessages/userProfile";
import { leftoverMessages } from "./leftovers";

export const formattedMessages = {
  ...generalApp,
  ...generalErrors,
  ...specificErrors,
  ...login,
  ...generalInstructions,
  ...changePassword,
  ...register,
  ...resetPassword,
  ...userData,
  ...userProfile,
  ...userVetting,
  ...leftoverMessages,
};
