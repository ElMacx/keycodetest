import React, { Component } from "react";
import "./RadioButton.css";
import { ReactComponent as CheckMarkGreen } from "../../icons/ic-checkmark.svg";
import { ReactComponent as CheckMarkWhite } from "../../icons/ic-checkmark-white.svg";

export class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInside: false
    };
  }

  handleMouseHover = event => {
    this.setState({ isMouseInside: !this.state.isMouseInside });
  };

  render() {
    const { currentAnswer, ans, handleOptionChange } = this.props;
    return (
      <div
        className={`radio-button ${
          currentAnswer && currentAnswer.id === ans.id ? "active" : "inactive"
        }`}
        id={ans.id}
        onClick={handleOptionChange}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <label className="radio-button-label">
          {ans.label}
          {(currentAnswer && currentAnswer.id === ans.id) ||
          this.state.isMouseInside ? (
            <CheckMarkWhite className="checkmark-icon" />
          ) : (
            <CheckMarkGreen className="checkmark-icon" />
          )}
          <input
            className="radio-button-input"
            type="radio"
            name="name"
            id={ans.id}
            onChange={handleOptionChange}
          />
        </label>
      </div>
    );
  }
}
