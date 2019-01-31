import React from 'react';
import './RadioButton.css';

export const RadioButton = (props) => {
  const { currentAnswer, ans, handleOptionChange } = props;
  return (
    <div className={ `radio-button ${(currentAnswer && currentAnswer.id === ans.id) ? 'active' : 'inactive'}` }
        id={ans.id} onClick={handleOptionChange}>
      <label className="radio-button-label">
        { ans.label }
        <input className="radio-button-input" type="radio" name="name" id={ans.id} onChange={handleOptionChange}/>
      </label>
    </div>
    )
}
