import NinDisplay from "components/Common/NinDisplay";
import { useIndexAppSelector as useDashboardAppSelector } from "index-hooks";
import NinForm from "./NinForm";

export default function AddNin(): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);

  if (nin) {
    return <NinDisplay nin={nin} allowDelete={true} />;
  }
  return <NinForm />;
}
