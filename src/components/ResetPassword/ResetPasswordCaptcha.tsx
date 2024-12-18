import { getCaptchaRequest } from "apis/eduidPhone";
import { GetCaptchaResponse } from "apis/eduidSignup";
import { InternalCaptcha } from "components/Common/Captcha";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export interface CaptchaProps {
  readonly handleCaptchaCancel: () => void;
  readonly handleCaptchaCompleted: (response: string) => void;
  getCaptcha: () => Promise<GetCaptchaResponse | undefined>;
}

export function ResetPasswordCaptcha(): JSX.Element | null {
  const state = useAppSelector((state) => state.resetPassword);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (state?.captcha.completed) {
    //   resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
    // }
  }, [state]);

  async function getCaptcha() {
    // temporary code
    const res = await dispatch(getCaptchaRequest());
    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload;
    }
  }

  function handleCaptchaCancel() {
    // resetPasswordContext.resetPasswordService.send({ type: "ABORT" });
  }

  function handleCaptchaCompleted(response: string) {
    if (response) {
      // dispatch(signupSlice.actions.setCaptchaResponse({ internal_response: response }));
      // signupContext.signupService.send({ type: "COMPLETE" });
    }
  }

  const args = { handleCaptchaCancel, handleCaptchaCompleted };

  // If the user has already completed the captcha, don't show it again
  // if (state?.captcha.completed) {
  //   return null;
  // }

  return (
    <Fragment>
      <h1>
        <FormattedMessage
          defaultMessage="Reset Password: Confirm that you are a human."
          description="Reset password captcha"
        />
      </h1>

      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="As a protection against automated spam, you'll need to confirm that you are a human."
            description="Reset password captcha lead text"
          />
        </p>
      </div>

      <InternalCaptcha {...args} getCaptcha={getCaptcha} />
    </Fragment>
  );
}
