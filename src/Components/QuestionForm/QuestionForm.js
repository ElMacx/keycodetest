import React, { Component } from 'react';
import './QuestionForm.css';
import { RadioButton } from '../RadioButton/RadioButton';
import { CustomButton } from '../CustomButton/CustomButton';

export class QuestionForm extends Component {
  render() {
    const { currentQuestion, currentAnswer, handleOptionChange, goToNextQuestion } = this.props;
    return (
      currentQuestion ? (
        <div className="question-form">
          <p>{ currentQuestion.question_text }</p>
          <svg width="40" height="5">
            <rect width="40" height="3" rx="1" ry="1" className="rect-under-question-text" />
          </svg>
          <div className="radio-button-container">
            {
              currentQuestion.answers.map(ans => {
                return (<RadioButton key={ans.id} currentAnswer={currentAnswer} ans={ans} handleOptionChange={handleOptionChange}/>)
              })
            }
          </div>
          <CustomButton isDisabled={!currentAnswer} clickEvent={goToNextQuestion} buttonText="Next"/>
        </div>
      ) : (<div></div>)
    )
  }
}