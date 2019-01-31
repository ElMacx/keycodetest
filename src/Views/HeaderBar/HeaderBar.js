import React from "react";
import "./HeaderBar.css";
import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";
import { ReactComponent as LeftArrow } from "../../icons/ic-arrow-left-green.svg";
import PropTypes from "prop-types";

export const HeaderBar = props => {
  const {
    questionQueue,
    finalOutcome,
    goToPreviousQuestion,
    progressBarPercentage
  } = props;
  return (
    <div className="app-header">
      <button
        className={
          !(questionQueue.length > 0 && !finalOutcome)
            ? "previous-button previous-disabled"
            : "previous-button"
        }
        onClick={goToPreviousQuestion}
        disabled={!(questionQueue.length > 0 && !finalOutcome)}
      >
        <LeftArrow />
      </button>
      <p id="app-title">Heartburn Checker</p>
      <ProgressBar percentage={progressBarPercentage} />
    </div>
  );
};

HeaderBar.propTypes = {
  questionQueue: PropTypes.array,
  finalOutcome: PropTypes.object,
  goToPreviousQuestion: PropTypes.func,
  progressBarPercentage: PropTypes.number.isRequired
};
