import React from "react";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  AccordionItemPanel,
} from "react-accessible-accordion";

const AccordionItemTemplate = ({ icon, title, additionalInfo, content }) => {
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <span className="accordion-icon">{icon}</span>
          <span>
            <h6 className="accordion-title">{title}</h6>
            <span className="accordion-description">{additionalInfo}</span>
          </span>
          <div className="accordion-toggle">
            <AccordionItemState>{({ expanded }) => (expanded ? "❮" : "❯")}</AccordionItemState>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>{content}</AccordionItemPanel>
    </AccordionItem>
  );
};

export default AccordionItemTemplate;
