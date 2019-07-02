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
    if (url.includes("personaldata")) {
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
    } else if (url.includes("advanced-settings")) {
      question1 = "Do I need to register a security key?";
      answer1 =
        "For those who use eduID to access sensitive data a security key is required, however those users will have been infromed if and how to do this.";
      question2 = "What is ORCID?";
      answer2 =
        "ORCID provides a persistent identifier – an ORCID iD – that distinguishes you from other researchers and a mechanism for linking your research outputs and activities to your ORCID iD regardless of which organization you are working with.";
    } else {
      question1 = "Why should I get eduID?";
      answer1 =
        "eduID is a set of login details that be used to access multiple organisations. eduID has been developed to provide students with a swedish national id number an additional identity online.";
      question2 = "How do I use eduID?";
      answer2 =
        "When possible, ckick 'log in with eduID'. You will be redirected to eduIDs login where you provide your email address and your password.";
    }
    return (
      <ul id="questions-container">
        <li activeClassName="active" className="question-list">
          <div className="accordion">
            <p className="question">{question1}</p>
            <i class="plus">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#FF500D" d="M7 0h2v16H7z" />
                <path fill="#FF500D" d="M0 9V7h16v2z" />
              </svg>
            </i>
            <i class="minus">
              <svg
                width="16"
                height="2"
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#FF500D" d="M0 2V0h16v2z" />
              </svg>
            </i>
          </div>
          <p className="answer">{answer1}</p>
        </li>
        <li className="question-list">
          <div className="accordion">
            <p className="question">{question2}</p>
            <i class="plus">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#FF500D" d="M7 0h2v16H7z" />
                <path fill="#FF500D" d="M0 9V7h16v2z" />
              </svg>
            </i>
            <i class="minus">
              <svg
                width="16"
                height="2"
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#FF500D" d="M0 2V0h16v2z" />
              </svg>
            </i>
          </div>
          <p className="answer">{answer2}</p>
        </li>
      </ul>
    );
  }
}

export default Questions;
