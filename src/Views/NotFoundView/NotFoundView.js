import React from "react";
import PropTypes from "prop-types";
import "./NotFoundView.css";
import { getLabel } from "../../translationFile";

export const NotFoundView = props => {
  return (
    <div className="not-found-view">
      <p>{getLabel("label.404text")}</p>
      <button
        className="global-button retry-button-margin"
        onClick={props.retryClickEvent}
      >
        {getLabel("label.retry")}
      </button>
    </div>
  );
};

NotFoundView.propTypes = {
  retryClickEvent: PropTypes.func
};
