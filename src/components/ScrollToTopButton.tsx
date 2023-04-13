import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { Button } from "reactstrap";

export default function ScrollToTopButton(): JSX.Element {
  const [showBtn, setShowBtn] = useState("display-none");
=======
import { FormattedMessage } from "react-intl";
=======
>>>>>>> a8c6b5249 (save temp)
import { Button } from "reactstrap";

export default function ScrollToTopButton(): JSX.Element {
<<<<<<< HEAD
  const [showBtn, setShowBtn] = useState("none");
>>>>>>> ff7bcbed7 (Add scroll to top button)
=======
  const [showBtn, setShowBtn] = useState("display-none");
>>>>>>> 519000497 (Clean up)

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setShowBtn("scroll-to-top");
    } else {
<<<<<<< HEAD
<<<<<<< HEAD
      setShowBtn("display-none");
=======
      setShowBtn("none");
>>>>>>> ff7bcbed7 (Add scroll to top button)
=======
      setShowBtn("display-none");
>>>>>>> 519000497 (Clean up)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <FormattedMessage defaultMessage="To Top" description="scroll to top" />
>>>>>>> ff7bcbed7 (Add scroll to top button)
=======
      {/* <FormattedMessage defaultMessage="To Top" description="scroll to top" /> */}
>>>>>>> a8c6b5249 (save temp)
=======
>>>>>>> 519000497 (Clean up)
=======
=======
      {/* <FormattedMessage defaultMessage="To Top" description="scroll to top" /> */}
>>>>>>> 6a3e80fdf (save temp)
>>>>>>> b2fb16149 (save temp)
    </Button>
  );
}
