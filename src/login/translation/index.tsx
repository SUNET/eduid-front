import { formattedMessages } from "./messageIndex";

export const translate = (messageId: string): JSX.Element | string => {
  // TODO: type casting, remove one messageIndex is typescript'd
  const formatted = formattedMessages as unknown as { [key: string]: JSX.Element };

  if (formatted[messageId] !== undefined) {
    // return blob with a props object containing the id and defaultMessage (actual message string)
    return formatted[messageId];
  }
  return "UNKNOWN MESSAGE ID (" + messageId + ")";
};
