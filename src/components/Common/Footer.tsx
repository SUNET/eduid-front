import { FormattedMessage } from "react-intl";

const Footer = (): JSX.Element => {
  return (
    <footer key="0" id="footer">
      <div className="logo-wrapper">
        <a href="https://www.sunet.se/" aria-label="Sunet.se" title="Sunet.se">
          <div className="sunet-logo" />
        </a>
        <span>
          &copy;
          <FormattedMessage defaultMessage="2013-2024" description="Footer copyright" />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
