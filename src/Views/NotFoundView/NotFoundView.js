import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NotFoundView.css";
import { getLabel } from "../../translationFile";

export class NotFoundView extends Component {
  render() {
    return (
      <div className="not-found-view">
        <p>{getLabel('label.404text')}</p>
        <button className="global-button retry-button-margin" onClick={this.props.retryClickEvent}>{getLabel('label.retry')}</button>
      </div>
    );
  }
}

NotFoundView.propTypes = {
  retryClickEvent: PropTypes.func,
};
