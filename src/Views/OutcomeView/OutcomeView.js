import React, { Component } from "react";
import "./OutcomeView.css";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { ReactComponent as GrayRectangle } from "../../icons/ic-rectangle-gray.svg";
import PropTypes from "prop-types";
import { BOOK_MEETING_URL } from '../../Constants/APIConstant';
import { getLabel } from "../../translationFile";

export class OutcomeView extends Component {
  bookApointment = () => {
    window.open(BOOK_MEETING_URL, '_blank');
  };

  render() {
    const { finalOutcome, restartProcess } = this.props;
    return (
      <div className="outcome-form">
        <h2>{getLabel('label.greetings_answer')}</h2>
        <GrayRectangle/>
        <p>{finalOutcome.text}</p>
        {finalOutcome.show_booking_button ? (
          <CustomButton
            isDisabled={false}
            clickEvent={this.bookApointment}
            buttonText={getLabel('label.book_meeting')}
            hoverText={getLabel('label.hover.book_meeting')}
          />
        ) : (
          <div />
        )}
        <span id="restart-text" className="restart-button" onClick={restartProcess}>
          {getLabel('label.back_to_start')}
        </span>
      </div>
    );
  }
}

OutcomeView.propTypes = {
  finalOutcome: PropTypes.object,
  restartProcess: PropTypes.func,
};
