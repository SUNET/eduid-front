import React from "react";
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import LetterProofingContainer from "containers/LetterProofing";
import LookupMobileProofingContainer from "containers/LookupMobileProofing";
import EidasContainer from "containers/Eidas";

let vettingRegistry = (disabled, props) => ({
  letter: <LetterProofingContainer disabled={disabled} />,
  lookup_mobile: (
    <LookupMobileProofingContainer disabled={disabled} {...props} />
  ),
  eidas: <EidasContainer disabled={disabled} />,
  oidc: <OpenidConnectContainer disabled={disabled} />,
  oidc_freja: <OpenidConnectFrejaContainer disabled={disabled} />,
});

export default vettingRegistry;
