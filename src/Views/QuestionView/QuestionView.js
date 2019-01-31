import React from "react";
import "./QuestionView.css";
import { RadioButton } from "../../Components/RadioButton/RadioButton";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { ReactComponent as GrayRectangle } from "../../icons/ic-rectangle-gray.svg";
import PropTypes from "prop-types";

export const QuestionView = props => {
  const {
    currentQuestion,
    currentAnswer,
    handleOptionChange,
    goToNextQuestion
  } = props;
  return currentQuestion ? (
    <div className="question-form">
      <p>{currentQuestion.question_text}</p>
      <GrayRectangle/>
      <div className="radio-button-container">
        {currentQuestion.answers.map(ans => {
          return (
            <RadioButton
              key={ans.id}
              isSelected={currentAnswer && currentAnswer.id === ans.id}
              ans={ans}
              handleOptionChange={handleOptionChange}
            />
          );
        })}
      </div>
      <CustomButton
        id="next-button"
        isDisabled={!currentAnswer}
        clickEvent={goToNextQuestion}
        buttonText="Next"
      />
    </div>
  ) : (
    <div />
  );
};

QuestionView.propTypes = {
  currentQuestion: PropTypes.object,
  currentAnswer: PropTypes.object,
  handleOptionChange: PropTypes.func,
  goToNextQuestion: PropTypes.func,
};
