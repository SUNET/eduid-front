import React, { Component } from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
// import DashboardNav from "./DashboardNav";
// import AddNin from "./AddNin";

class Questions extends Component {
  // constructor(props) {
  //   super(props);
  //   this.showAnswer = this.showAnswer.bind(this);
  //   this.state = {
  //     answer: "hide",
  //    symbol: "show"
  //   };
  // }

  showAnswer() {
    console.log("hello, you clicked the list item");

    // this.setState(
    //   (state, props) => {
    //     return {
    //       answer: "hide",
    //       symbol: "show"
    //     };
    //   },
    //   () => {
    //     console.log("answer should be hidden:", this.state.answer);
    //     console.log("+ shuold be visible:", this.state.symbol);;
    //   }
    // );
    // console.log("class shoudl be updated to show", this.state.answer);
  }

  render() {
    const url = window.location.href;
    let question1 = "";
    let answer1 = "";
    let question2 = "";
    let answer2 = "";
    if (url.includes("personaldata")) {
      question1 = (
        <p className="question">{this.props.l10n("questions.settings_1")}</p>
      );
      answer1 = (
        <p className="answer collapse">
          {this.props.l10n("questions.settings_1_answer")}
        </p>
      );
      question2 = (
        <p className="question">{this.props.l10n("questions.settings_2")}</p>
      );
      answer2 = (
        <p className="answer collapse">
          {this.props.l10n("questions.settings_2_answer")}
        </p>
      );
    } else if (url.includes("verify-identity")) {
      question1 = (
        <p className="question">
          {this.props.l10n("questions.verify_identity_1")}
        </p>
      );
      answer1 = (
        <p className="answer collapse">
          {this.props.l10n("questions.verify_identity_1_answer")}
        </p>
      );
      question2 = (
        <p className="question">
          {this.props.l10n("questions.verify_identity_2")}
        </p>
      );
      answer2 = (
        <p className="answer collapse">
          {this.props.l10n("questions.verify_identity_2_answer")}
        </p>
      );
    } else if (url.includes("advanced-settings")) {
      question1 = (
        <p className="question">
          {this.props.l10n("questions.settings_advanced_1")}
        </p>
      );
      answer1 = (
        <p className="answer collapse">
          {this.props.l10n("questions.settings_advanced_1_answer")}
        </p>
      );
      question2 = (
        <p className="question">
          {this.props.l10n("questions.settings_advanced_2")}
        </p>
      );
      answer2 = (
        <p className="answer collapse">
          {this.props.l10n("questions.settings_advanced_2_answer")}
        </p>
      );
    } else {
      question1 = (
        <p className="question">{this.props.l10n("questions.profile_1")}</p>
      );
      answer1 = (
        <p className="answer collapse">
          {this.props.l10n("questions.profile_1_answer")}
        </p>
      );
      question2 = (
        <p className="question">{this.props.l10n("questions.profile_2")}</p>
      );
      answer2 = (
        <p className="answer collapse">
          {this.props.l10n("questions.profile_2_answer")}
        </p>
      );
    }
    return (
      <div id="questions-container">
        <div className="question1">
          <p className="question">{question1}</p>
          {/* <p className="question">
              {this.props.l10n("questions.settings_1")}
            </p> */}
          {/* <div>
              <svg
                className="plus"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#FF500D" d="M7 0h2v16H7z" />
                <path fill="#FF500D" d="M0 9V7h16v2z" />
              </svg>
            </div>
            <i className="minus collapse">
              <svg
                className="minus"
                width="16"
                height="2"
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#FF500D" d="M0 2V0h16v2z" />
              </svg>
            </i> */}
          <p className="question"> {answer1}</p>
        </div>

        <div className="question2">
          <p className="question">{question2}</p>
          {/* <i className="plus">
              <svg
                className="plus"
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
            <i className="minus ">
              <svg
                className="minus"
                width="16"
                height="2"
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#FF500D" d="M0 2V0h16v2z" />
              </svg>
            </i> */}
          <p className="question"> {answer2}</p>
        </div>
      </div>
    );
  }
}

export default Questions;
