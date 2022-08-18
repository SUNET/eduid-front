import NinDisplay from "components/NinDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import NinForm from "./NinForm";

export default function AddNin(): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);

  if (nin) {
    return <NinDisplay nin={nin} allowDelete={true} />;
  }
  return <NinForm />;
}
