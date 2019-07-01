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
      question1 = "Why do I need to add my phone number?";
      answer1 =
        "By adding a phone number you are making it possible to check that it connects to your given national id number.";
      question2 = "Is my eduID account ever removed due to inactivity?";
      answer2 =
        "Only you can delete your account by clickling 'Delete eduID account', it will not be removed due to inactivity.";
    } else if (url.includes("verify-identity")) {
      question1 = "Why do I need add my swedish national id number?";
      answer1 =
        "The national id number ensures that each eduID is unique to one specific person.";
      question2 = "What does 'verify my national id number' mean?";
      answer2 =
        "Becasue the national id number is registered with other official services, it is possible to check details given to eduID against 3rd party information and thereby connect a physical person to the online eduID account.";
    } else {
      question1 = "Why should I get eduID?";
      answer1 =
        "eduID is a set of login details that be used to access multiple organisations. eduID has been developed to provide students with a swedish national id number an additional identity online.";
      question2 = "How do I use eduID?";
      answer2 =
        "When possible, ckick 'log in with eduID'. You will be redirected to eduIDs login where you provide your email address and your password.";
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
