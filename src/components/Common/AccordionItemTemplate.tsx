import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

interface AccordionItemTemplateProps {
  readonly icon?: React.ReactNode;
  readonly title: React.ReactNode;
  readonly additionalInfo: React.ReactNode;
  readonly uuid?: string;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
}

interface  AccordionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  allowMultipleExpanded?: boolean;
  allowZeroExpanded?: boolean;
  preExpanded?: string[];

}
export function Accordion(props: Readonly<AccordionProps>): React.JSX.Element {
  return (
    <div id={props.id} className={props.className ?? "accordion"}>{props.children}</div>
  )
}

interface AccordionItemTemplateProps {
  readonly icon?: React.ReactNode;
  readonly title: React.ReactNode;
  readonly additionalInfo: React.ReactNode;
  readonly uuid?: string;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
}

export function AccordionItemTemplate(props: Readonly<AccordionItemTemplateProps>): React.JSX.Element {
  const detailsRef = useRef(null);
  const [open, setOpen] = useState(false);
//inert={props.disabled}  onToggle={() => setOpen(!open)}
  return (
    <details id={props.uuid} className="accordion__item" > 
      <summary className="accordion__heading" role="heading">
        <div className="accordion__button" role="button">
          {props.icon && <span className="accordion-icon">{props.icon}</span>}
          <div>
            <h3 className="accordion-title">{props.title}</h3>
            <span className="accordion-description">{props.additionalInfo}</span>
          </div>
          { open
            ? <FontAwesomeIcon icon={faChevronUp as IconProp} />
            : <FontAwesomeIcon icon={faChevronDown as IconProp} />
          }
        </div>
      </summary>
      <div className="accordion__panel">{props.children}</div>
    </details>
  )
}