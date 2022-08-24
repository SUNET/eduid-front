import React from "react";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";

interface AccordionItemTemplateProps {
  icon?: React.ReactNode;
  title: string;
  additionalInfo: string;
  uuid?: string;
  children?: React.ReactNode;
}

function AccordionItemTemplate(props: AccordionItemTemplateProps) {
  return (
    <AccordionItem uuid={props.uuid} activeClassName="accordion__item expanded">
      <AccordionItemHeading>
        <AccordionItemButton>
          {props.icon && <span className="accordion-icon">{props.icon}</span>}
          <span>
            <h6 className="accordion-title">{props.title}</h6>
            <span className="accordion-description">{props.additionalInfo}</span>
          </span>
          <div className="accordion-toggle">
            <AccordionItemState>{({ expanded }) => (expanded ? "❮" : "❯")}</AccordionItemState>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>{props.children}</AccordionItemPanel>
    </AccordionItem>
  );
}

export default AccordionItemTemplate;
