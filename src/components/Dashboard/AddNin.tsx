import NinDisplay from "components/Common/NinDisplay";
import { useAppSelector } from "eduid-hooks";
import NinForm from "./NinForm";

interface AddNinProps {
  readonly name: string;
}

export default function AddNin({ name }: AddNinProps): React.JSX.Element {
  const nin = useAppSelector((state) => state.personal_data?.response?.identities?.nin);
  // name props for unique id
  if (nin) {
    return <NinDisplay name={name} nin={nin} allowDelete={true} />;
  }
  return <NinForm />;
}
