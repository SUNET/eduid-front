import { ChangePasswordContainer } from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { Security } from "./Security";

export function SecurityZoneMain(): JSX.Element {
  return (
    <div className="security-zone">
      <Security />
      <ChangePasswordContainer />
      <DeleteAccount />
    </div>
  );
}
