import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export default function ScrollToTopButton(): React.JSX.Element {
  const [showBtn, setShowBtn] = useState("display-none");
  const intl = useIntl();
  //Translated assistive and visual aid for clickable icon
  const toTopLabel = intl.formatMessage({
    defaultMessage: "Go to page top",
    description: "aria-label and title for scroll top button",
  });

  // When the user scrolls down 20px from the top of the document, show the button
  useEffect(() => {
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        setShowBtn("scroll-to-top");
      } else {
        setShowBtn("display-none");
      }
    }

    globalThis.addEventListener("scroll", scrollFunction);
    return () => {
      globalThis.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <button
      onClick={topFunction}
      id="scroll-top-button"
      className={`${showBtn} primary`}
      aria-label={toTopLabel}
      title={toTopLabel}
    >
      <FontAwesomeIcon icon={faArrowUp as IconProp} />
    </button>
  );
}
