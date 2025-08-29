import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ScrollToTopButton(): React.JSX.Element {
  const [showBtn, setShowBtn] = useState("display-none");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setShowBtn("scroll-to-top");
    } else {
      setShowBtn("display-none");
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <button onClick={topFunction} id="scroll-top-button" className={`${showBtn} primary`} title="Go to top">
      <FontAwesomeIcon icon={faArrowUp as IconProp} />
    </button>
  );
}
