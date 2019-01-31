import React from "react";
import "./CustomButton.css";
import { ReactComponent as RightArrowGray } from "../../icons/ic-arrow-right-gray.svg";
import { ReactComponent as RightArrowWhite } from "../../icons/ic-arrow-right-white.svg";
import PropTypes from 'prop-types';

export const CustomButton = props => {
  const { isDisabled, clickEvent, buttonText } = props;
  return (
    <button
      disabled={isDisabled}
      className={
        isDisabled
          ? "next-button-position global-button disabled-button"
          : `global-button ${
              buttonText === "Next" ? "next-button-position" : ""
            }`
      }
      onClick={clickEvent}
    >
      <span>{buttonText}</span>
      {isDisabled ? (
        <RightArrowGray className="next-button-icon" />
      ) : (
        <RightArrowWhite className="next-button-icon" />
      )}
    </button>
  );
};

CustomButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  clickEvent: PropTypes.func,
  buttonTest: PropTypes.string,
};
