import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface AccordionItemTemplateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  additionalInfo: React.ReactNode;
  uuid?: string;
  children?: React.ReactNode;
  open?: boolean;
}

interface  AccordionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function Accordion(props: Readonly<AccordionProps>): React.JSX.Element {
  return (
    <div id={props.id} className={props.className ?? "accordion"}>{props.children}</div>
  )
}

export function AccordionItemTemplate(props: Readonly<AccordionItemTemplateProps>): React.JSX.Element {
  const [open, setOpen] = useState(props.open ?? false);
  
  return (
    <details id={props.uuid} className="accordion__item"
    onToggle={(event) => {setOpen(event.currentTarget.open)}}
    open={open}
    aria-labelledby={props.uuid  + "-button"}
     > 
      <summary className="accordion__heading">
        <div className="accordion__button" role="button" id={props.uuid  + "-button"}>
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