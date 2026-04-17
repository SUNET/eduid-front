import { IconProp } from "@fortawesome/fontawesome-svg-core";
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

export function Accordion(props: Readonly<AccordionProps>): React.JSX.Element {
  return (
    <div id={props.id} className={props.className ?? "accordion"}>
      {props.children}
    </div>
  );
}

export function AccordionItemTemplate(props: Readonly<AccordionItemTemplateProps>): React.JSX.Element {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(props.open ?? false);

  useEffect(() => {
    // Check if the URL hash targets this accordion directly, or an element inside it.
    // With <details>, children are always in the DOM even when closed, so getElementById works.
    const hash = globalThis.location.hash;
    if (!hash || !props.uuid || !detailsRef.current) return;
    const targetId = hash.slice(1);

    const isDirectMatch = targetId === props.uuid;
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
  }, [props.uuid]);

  return (
    <details
      ref={detailsRef}
      id={props.uuid}
      onToggle={(event) => {
        setOpen(event.currentTarget.open);
      }}
      open={open}
      aria-labelledby={props.uuid + "-button"}
    >
      <summary>
        <div id={props.uuid + "-button"}>
          {props.icon && <span>{props.icon}</span>}
          <div>
            <h3>{props.title}</h3>
            <span>{props.additionalInfo}</span>
          </div>
          {open ? (
            <FontAwesomeIcon icon={faChevronUp as IconProp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown as IconProp} />
          )}
        </div>
      </summary>
      <div className="accordion-panel">{props.children}</div>
    </details>
  );
}
