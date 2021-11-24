import React from "react";
import IntlProvider from "./IntlProvider";

import { Provider as ReduxProvider } from "react-redux";
import { AnyAction, Store } from "redux";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: Store<any, AnyAction>;
};

/* The ReduxIntlProvider combines the ReduxProvider (that makes the redux store available
 * to the children of the ReduxProvider component) with the IntlProvider, that makes
 * react-intl available to the children of the IntlProvider.
 *
 * The result is that we have the settings (locale) and translated messages for the currently
 * active language available in the Redux store (state.intl), and any changes to it there
 * will result in re-rendering of all components using those settings (i.e. changing language).
 */
export const ReduxIntlProvider: React.FC<Props> = ({ store, children }) => (
  <ReduxProvider store={store}>
    <IntlProvider>{children}</IntlProvider>
  </ReduxProvider>
);
