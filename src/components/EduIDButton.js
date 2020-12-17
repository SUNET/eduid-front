import React, { Component } from "react";
import Button from "reactstrap/lib/Button";

//import FetchingContext from "components/FetchingContext";

// import "style/EduIDButton.scss";

class EduIDButton extends Component {
  //render() {
    //return (
      //<FetchingContext.Consumer>
        //{({ fetching, toggleFetching }) => {
          //if (fetching) {
            //let classes = " eduid-button has-spinner";
            //if (this.props.className !== undefined) {
              //classes = this.props.className + classes;
            //}
            //return (
              //<Button
                //{...this.props}
                //disabled={true}
                //className={classes}
                //color="primary"
              //>
                //{this.props.children}
                //<div className="spin-holder">
                  //<FontAwesomeIcon icon={faSpinner} />
                //</div>
              //</Button>
            //);
          //} else {
            //let classes =" eduid-button";
            //if (this.props.className !== undefined) {
              //classes = this.props.className + classes;
            //}
            //return (
              //<Button {...this.props} className={classes} color="primary">
                //{this.props.children}
              //</Button>
            //);
          //}
        //}}
      //</FetchingContext.Consumer>
    //);
  //}
  render() {
    let classes =" eduid-button";
    if (this.props.className !== undefined) {
      classes = this.props.className + classes;
    }
    return (
      <Button {...this.props} className={classes} color="primary">
        {this.props.children}
      </Button>
    );
  }
}

EduIDButton.propTypes = {};

export default EduIDButton;
