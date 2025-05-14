import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";

interface AccordionItemTemplateProps {
  readonly icon?: React.ReactNode;
  readonly title: React.ReactNode;
  readonly additionalInfo: React.ReactNode;
  readonly uuid?: string;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
}

function AccordionItemTemplate(props: AccordionItemTemplateProps) {
  return (
    <AccordionItem
      uuid={props.uuid}
      activeClassName={props.disabled ? "accordion__item expanded disabled" : "accordion__item expanded"}
      className={props.disabled ? "accordion__item disabled" : "accordion__item"}
    >
      <AccordionItemHeading>
        <AccordionItemButton>
          {props.icon && <span className="accordion-icon">{props.icon}</span>}
          <div>
            <h3 className="accordion-title">{props.title}</h3>
            <span className="accordion-description">{props.additionalInfo}</span>
          </div>
          <AccordionItemState>
            {({ expanded }) =>
              expanded ? (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              )
            }
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>{props.children}</AccordionItemPanel>
    </AccordionItem>
  );
}

export default AccordionItemTemplate;
