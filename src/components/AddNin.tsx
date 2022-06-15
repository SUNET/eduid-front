import NinDisplay from "components/NinDisplay";
import NinForm from "./NinForm";
import { useDashboardAppSelector } from "dashboard-hooks";
import React from "react";

export default function AddNin(): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);

  if (nin) {
    return <NinDisplay nin={nin} allowDelete={true} />;
  } else {
    return <NinForm />;
  }
}
