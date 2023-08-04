import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { intlState } from "../slices/Internationalisation";

/*
 * As I (ft@) understand things, this module takes parameters from our state.intl,
 * and provide it to the real IntlProvider from react-intl.
 *
 */

function defaultSelector(state: { intl: intlState }) {
  return {
    key: state.intl.locale,
    ...state.intl,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: { intl: intlState }, { intlSelector = defaultSelector }: any) => intlSelector(state);

export default connect(mapStateToProps)(IntlProvider);
