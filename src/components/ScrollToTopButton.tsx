import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "reactstrap";

export default function ScrollToTopButton(): JSX.Element {
  const [showBtn, setShowBtn] = useState("none");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setShowBtn("scroll-to-top");
    } else {
      setShowBtn("none");
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Button onClick={topFunction} id="scroll-top-button" color="primary" className={showBtn} title="Go to top">
      <FontAwesomeIcon icon={faArrowUp as IconProp} />
      <FormattedMessage defaultMessage="To Top" description="scroll to top" />
    </Button>
  );
}
