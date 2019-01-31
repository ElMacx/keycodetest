import React, { Component } from "react";
import "./OutcomeView.css";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { ReactComponent as GrayRectangle } from "../../icons/ic-rectangle-gray.svg";

export class OutcomeView extends Component {
  bookApointment = () => {
    console.log("Do booking stuff");
  };

  render() {
    const { finalOutcome, restartProcess } = this.props;
    return (
      <div className="outcome-form">
        <h2>Thank you for answering the questions!</h2>
        <GrayRectangle/>
        <p>{finalOutcome.text}</p>
        {finalOutcome.show_booking_button ? (
          <CustomButton
            isDisabled={false}
            clickEvent={this.bookApointment}
            buttonText="Book an meeting"
          />
        ) : (
          <div />
        )}
        <span id="restart-text" className="restart-button" onClick={restartProcess}>
          Back to the start screen
        </span>
      </div>
    );
  }
}
