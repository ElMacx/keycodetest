import React from "react";
import "./ProgressBar.css";
import PropTypes from 'prop-types';

export const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <div className="filler" style={{ width: `${props.percentage}%` }} />
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};
