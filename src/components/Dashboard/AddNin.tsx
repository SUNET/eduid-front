import NinDisplay from "components/Common/NinDisplay";
import { useAppSelector } from "eduid-hooks";
import NinForm from "./NinForm";

export default function AddNin(): React.JSX.Element {
  const nin = useAppSelector((state) => state.personal_data?.response?.identities?.nin);

  if (nin) {
    return <NinDisplay nin={nin} allowDelete={true} />;
  }
  return <NinForm />;
}
