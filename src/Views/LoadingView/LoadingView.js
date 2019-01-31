import React from "react";
import "./LoadingView.css";
import logo from "../../Logo_kry.png";
import { getLabel } from "../../translationFile";

export const LoadingView = props => {
  return (
    <div className="loading-view">
      <img src={logo} alt={"logo kry"} width="100" height="30"/>
      <p className="loading-view-text">{getLabel('label.loading')}</p>
    </div>
  )
}
