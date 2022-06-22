import React, { useState } from "react";

const Accordion = ({ icon, title, additionalInfo, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-handle" onClick={() => setIsActive(!isActive)}>
        <span className="accordion-icon">{icon}</span>
        <div className="accordion-title">
          <h6 className="accordion-heading">{title}</h6>
          <span className="accordion-description">{additionalInfo}</span>
        </div>

        <div className="accordion-toggle">{isActive ? "❮" : "❯"}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;
