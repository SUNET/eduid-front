import { fetchNewDevice } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import loginSlice from "login/redux/slices/loginSlice";
import { useEffect } from "react";

export const THIS_DEVICE_KEY = "login.device";

export function NewDevice(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const ref = useAppSelector((state) => state.login.ref);

  useEffect(() => {
    async function getKnownDevice(): Promise<void> {
      if (ref) {
        const response = await dispatch(fetchNewDevice({ ref }));
        if (fetchNewDevice.fulfilled.match(response)) {
          const thisDevice = response.payload.new_device;
          if (window.localStorage) {
            window.localStorage.setItem(THIS_DEVICE_KEY, thisDevice);
          }
          // trigger another request to /next
          dispatch(loginSlice.actions.callLoginNext());
        }
      }
    }

    getKnownDevice();
  }, []);

  /* For now, we don't render anything here but just prime local storage with a known_device.
   * In a later version, we will likely ask for a username here, and solve a captcha...
   */
  return null;
}
