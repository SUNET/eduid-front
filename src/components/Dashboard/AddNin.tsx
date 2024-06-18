import NinDisplay from "components/Common/NinDisplay";
import { useAppSelector } from "eduid-hooks";
import NinForm from "./NinForm";

export default function AddNin(props: { name: string }): JSX.Element {
  const nin = useAppSelector((state) => state.identities.nin);
  // name props for unique id
  if (nin) {
    return <NinDisplay name={props.name} nin={nin} allowDelete={true} />;
  }
  return <NinForm />;
}
