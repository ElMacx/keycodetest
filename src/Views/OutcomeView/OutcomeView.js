import React, { Component } from 'react';
import './OutcomeView.css'
import { CustomButton } from '../../Components/CustomButton/CustomButton';

export class OutcomeView extends Component {

  bookApointment = () => {
    console.log('Do booking stuff')
  }

  render () {
    const { finalOutcome, restartProcess } = this.props;
    return (
      <div className="outcome-form">
        <h2>Thank you for answering the questions!</h2>
        <svg width="40" height="5">
          <rect width="40" height="3" rx="1" ry="1" className="rect-under-question-text" />
        </svg>
        <p>{ finalOutcome.text }</p>
        { finalOutcome.show_booking_button ?
          (<CustomButton isDisabled={false} clickEvent={this.bookApointment} buttonText="Book an meeting"/>) : (<div></div>)}
        <span className="restart-button" onClick={restartProcess}>Back to the start screen</span>
      </div>
    );
  }
}
