import NinDisplay from "components/Common/NinDisplay";
<<<<<<< HEAD
import { useAppSelector } from "eduid-hooks";
=======
import { useIndexAppSelector as useDashboardAppSelector } from "index-hooks";
>>>>>>> a84b08339 (correct path)
import NinForm from "./NinForm";

export default function AddNin(): JSX.Element {
  const nin = useAppSelector((state) => state.identities.nin);

  if (nin) {
    return <NinDisplay nin={nin} allowDelete={true} />;
  }
  return <NinForm />;
}
