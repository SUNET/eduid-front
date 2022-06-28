import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const AccordionTemplate = ({ icon, title, additionalInfo, content }) => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>{title}</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>{content}</AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};
// const Accordion = ({ icon, title, additionalInfo, content }) => {
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <div>
//       <div className="accordion-handle" onClick={() => setIsActive(!isActive)}>
//         <span className="accordion-icon">{icon}</span>
//         <div className="accordion-title">
//           <h6 className="accordion-heading">{title}</h6>
//           <span className="accordion-description">{additionalInfo}</span>
//         </div>

//         <div className="accordion-toggle">{isActive ? "❮" : "❯"}</div>
//       </div>
//       {isActive && <div className="accordion-content">{content}</div>}
//     </div>
//   );
// };

export default AccordionTemplate;
