import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const Header = () => {
  const toHome = useSelector((state) => state.config.eduid_site_url);
  return (
    <header>
      <a href={toHome}>
        <div id="eduid-logo" />
      </a>
    </header>
  );
};

const Tagline = ({ translate }) => (
  <div className="vertical-content-margin">
    <h1 className="tagline">{translate("banner.tagline")}</h1>
  </div>
);

const Banner = ({ translate }) => (
  <section className="banner">
    <Header />
    <Tagline translate={translate} />
  </section>
);

Banner.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(Banner);
