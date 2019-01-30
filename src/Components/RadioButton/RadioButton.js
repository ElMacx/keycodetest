import React from 'react';
import './RadioButton.css';

export const RadioButton = (props) => {
  return (
    <div className={ `radio-button ${(props.currentAnswer && props.currentAnswer.id === props.ans.id) ? 'active' : 'inactive'}` }
        id={props.ans.id} onClick={props.handleOptionChange}>
      <label className="radio-button-label">
        { props.ans.label }
        <input className="radio-button-input" type="radio" name="name" id={props.ans.id} onChange={props.handleOptionChange}/>
      </label>
    </div>
    )
}
