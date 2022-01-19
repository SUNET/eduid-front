import { formattedMessages } from "./messageIndex";

export const UNKNOWN_MESSAGE = "UNKNOWN MESSAGE ID";

export const translate = (messageId: string): JSX.Element | string => {
  // TODO: type casting, remove once messageIndex is typescript'd
  const formatted = formattedMessages as unknown as { [key: string]: JSX.Element };

  if (formatted[messageId] !== undefined) {
    // return blob with a props object containing the id and defaultMessage (actual message string)
    return formatted[messageId];
  }
  return `${UNKNOWN_MESSAGE} (${messageId})`;
};
