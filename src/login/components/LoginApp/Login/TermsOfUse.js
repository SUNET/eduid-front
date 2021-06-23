import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTouVersions } from "../../../redux/actions/postTouVersionsActions";
import { updatedTouAccept } from "../../../redux/actions/postUpdatedTouAcceptActions";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let TermOfUseText = () => (
  <div className="tou-text">
    <p className="heading">General rules for eduID users:</p>
    <ul>
      <p>The following generally applies:</p>
      <li>
        <p>
          that all usage of user accounts follow Sweden&apos;s laws and by-laws,
        </p>
      </li>
      <li>
        <p>
          that all personal information that you provide, such as name and
          contact information shall be truthful,
        </p>
      </li>
      <li>
        <p>
          that user accounts, password and codes are individual and shall only
          be used by the intended individual,
        </p>
      </li>
      <li>
        <p>
          that SUNET&apos;s ethical rules regulate the &ldquo;other&ldquo;
          usage.
        </p>
      </li>
    </ul>
    <ul>
      <p>SUNET judges unethical behaviour to be when someone:</p>
      <li>
        <p>
          attempts to gain access to network resources that they do not have the
          right
        </p>
      </li>
      <li>
        <p>attempts to conceal their user identity</p>
      </li>
      <li>
        <p>
          attempts to interfere or disrupt the intended usage of the network
        </p>
      </li>
      <li>
        <p>
          clearly wastes available resources (personnel, hardware or software)
        </p>
      </li>
      <li>
        <p>attempts to disrupt or destroy computer-based information</p>
      </li>
      <li>
        <p>infringes on the privacy of others</p>
      </li>
      <li>
        <p>attempts to insult or offend others</p>
      </li>
    </ul>
    <p className="heading">
      Any person found violating or suspected of violating these rules can be
      disabled from eduID.se for investigation. Furthermore, legal action can be
      taken.
    </p>
  </div>
);
let AcceptButton = ({ loading }) => {
  const dispatch = useDispatch();
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(updatedTouAccept())}
      disabled={loading}
      aria-disabled={loading}
      id="accept-button"
    >
      accept
    </ButtonPrimary>
  );
};

let TermOfUse = (props) => {
  const dispatch = useDispatch();
  const { loading, translate } = props;

  // MOCK: the tou versions will be available from the translations object
  const availableTouVersions = ["2016-v1", "2021-v1"];
  useEffect(() => {
    dispatch(postTouVersions(availableTouVersions));
  }, []);

  // MOCK: the backend determines what version the user nddes to accept
  const version = useSelector((state) => state.login.tou.version);

  return (
    <div className="tou">
      <h2 className="heading">
        {translate("login.tou.h2-heading")}{" "}({version})
      </h2>
      <p>{translate("login.tou.paragraph")}</p>
      <TermOfUseText />
      <AcceptButton loading={loading} translate={translate} />
    </div>
  );
};

TermOfUse.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(TermOfUse);
