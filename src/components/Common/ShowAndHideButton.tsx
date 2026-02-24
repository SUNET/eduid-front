import { FormattedMessage } from "react-intl";
import EduIDButton from "./EduIDButton";

export const ShowAndHideButton = ({ isShown, onClick }: { isShown: boolean; onClick: () => void }) => {
  return (
    <EduIDButton id="show-hide-button" buttonstyle="txt-toggle-btn link sm" onClick={onClick}>
      {isShown ? (
        <FormattedMessage defaultMessage="HIDE" description="hide button" />
      ) : (
        <FormattedMessage defaultMessage="SHOW" description="show button" />
      )}
    </EduIDButton>
  );
};
