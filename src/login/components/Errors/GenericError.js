import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faHome } from "@fortawesome/free-solid-svg-icons";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const TryAgainOption = ({ translate, handleError, handleReset }) => {
  return (
    <div className="option">
      <label>{translate("runtime_error.generic.label.reload")}</label>
      <div className="icon-text">
        <button
          className="icon"
          onClick={() => {
            handleError(), handleReset();
          }}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <p>{translate("runtime_error.generic.p.reload")}</p>
      </div>
    </div>
  );
};

const ToHomeOption = (props) => {
  const toHome = useSelector((state) => state.config.eduid_site_url);
  return (
    <div className="option">
      <label>{props.translate("runtime_error.generic.label.toHome")}</label>
      <div className="icon-text">
        <button
          className="icon"
          onClick={() => {
            window.location = toHome;
          }}
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
        <p>{props.translate("runtime_error.generic.p.toHome")}</p>
      </div>
    </div>
  );
};

const GenericError = (props) => {
  return (
    <Fragment>
      <div className="error-boundary">
        <h2 className="heading">
          {props.translate("runtime_error.generic.title")}
        </h2>
        <p>{props.translate("runtime_error.generic.description")}</p>
        <div className="options">
          <TryAgainOption {...props} />
          <ToHomeOption {...props} />
        </div>
      </div>
    </Fragment>
  );
};

export default InjectIntl(GenericError);
