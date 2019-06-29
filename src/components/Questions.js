import React, { Component } from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
import DashboardNav from "./DashboardNav";
import AddNin from "./AddNin";

class Questions extends Component {
  render() {
    const url = window.location.href;
    let question1 = "";
    let answer1 = "";
    let question2 = "";
    let answer2 = "";
    if (url.includes("settings")) {
      question1 = "add in relevant settings question?";
      answer1 =
        "Super well-worded answer about all the settings to question here.";
      question2 = "Are settings relevant?";
      answer2 = "World's best answer to question about settings here.";
    } else if (url.includes("verify-identity")) {
      question1 = "Am I in the verify identity section?";
      answer1 = "Yes of course you are.";
      question2 = "Is it ok if I love verifying my identity?";
      answer2 =
        "Oh, yes. This section was developed to make people fall in love with eduID. World's best answer to question about settings here.";
    } else {
      question1 = "Why do I need eduID?";
      answer1 =
        "eduID kan användas för inloggning inom flera olika organisationer. eduID har utvecklats för att kunna ge alla studenter en identitet online utan att kräva ett svenskt personnummer.";
      question2 = "How do I use eduID?";
      answer2 =
        "När möjlighet finns, välj 'Logga in med eduID'. Du kommer att bli skickad till eduIDs login där du anger din e-postadress och ditt lösenord.";
    }
    return (
      <div id="questions-container">
        <div className="question-card">
          <label>{question1}</label>
          <p>{answer1}</p>
        </div>
        <div className="question-card">
          <label>{question2}</label>
          <p>{answer2}</p>
        </div>
      </div>
    );
  }
}

export default Questions;
