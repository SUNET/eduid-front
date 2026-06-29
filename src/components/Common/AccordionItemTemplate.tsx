import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

interface AccordionItemTemplateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  additionalInfo: React.ReactNode;
  uuid?: string;
  children?: React.ReactNode;
  open?: boolean;
}

interface AccordionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ id, children, className }: Readonly<AccordionProps>) {
  return (
    <div id={id} className={className ?? "accordion"}>
      {children}
    </div>
  );
}

export function AccordionItemTemplate({
  icon,
  title,
  additionalInfo,
  uuid,
  children,
  open,
}: Readonly<AccordionItemTemplateProps>) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(open ?? false);

  useEffect(() => {
    // Check if the URL hash targets this accordion directly, or an element inside it.
    // With <details>, children are always in the DOM even when closed, so getElementById works.
    const hash = globalThis.location.hash;
    if (!hash || !uuid || !detailsRef.current) return;
    const targetId = hash.slice(1);

    const isDirectMatch = targetId === uuid;
    const targetElement = document.getElementById(targetId);
    const isChildMatch = targetElement !== null && detailsRef.current.contains(targetElement);

    if (isDirectMatch || isChildMatch) {
      // Open the <details> element directly via the DOM to avoid a cascading React re-render.
      // This triggers a native 'toggle' event, which the onToggle handler catches to sync React state.
      detailsRef.current.open = true;
      requestAnimationFrame(() => {
        const scrollTarget = isDirectMatch ? detailsRef.current : targetElement;
        scrollTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [uuid]);

  return (
    <details
      ref={detailsRef}
      id={uuid}
      onToggle={(event) => {
        setIsOpen(event.currentTarget.open);
      }}
      open={isOpen}
      aria-labelledby={uuid + "-button"}
    >
      <summary>
        <div id={uuid + "-button"}>
          {icon && <span>{icon}</span>}
          <div>
            <h3>{title}</h3>
            <span>{additionalInfo}</span>
          </div>
          {isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
        </div>
      </summary>
      <div className="accordion-panel">{children}</div>
    </details>
  );
}
