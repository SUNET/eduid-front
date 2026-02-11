import { FormattedMessage } from "react-intl";
import EduIDButton from "./EduIDButton";

export const ShowAndHideButton = ({ isShown, onClick }: { isShown: boolean; onClick: () => void }) => {
  return (
    <EduIDButton id="show-hide-button" buttonstyle="txt-toggle-btn link sm" onClick={onClick}>
      {isShown ? (
        <FormattedMessage defaultMessage="HIDE" description="nin/password button label" />
      ) : (
        <FormattedMessage defaultMessage="SHOW" description="nin/password button label" />
      )}
    </EduIDButton>
  );
};
