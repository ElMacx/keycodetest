import React, { Component } from 'react';
import './Header.css'
import { ProgressBar } from '../ProgressBar/ProgressBar';

export class Header extends Component {
  render() {
    const { questionQueue, finalOutcome, goToPreviousQuestion, progressBarPercentage } = this.props;
    return (
      <div className="app-header">
        {
          (questionQueue.length > 0 && !finalOutcome) ?
          (<button className="previous-button" onClick={goToPreviousQuestion}>
            <svg width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="icons/ic-arrow-left-green" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path d="M6.58629142,8.00500036 L0.292640816,1.70685429 C-0.0977440278,1.3161906 -0.0975179782,0.68302566 0.293145712,0.292640816 C0.683809402,-0.0977440278 1.31697434,-0.0975179782 1.70735918,0.293145712 L8.70735918,7.29814571 C9.0975468,7.68861203 9.09754696,8.32138741 8.70735954,8.71185393 L1.71735954,15.7068539 C1.3269749,16.0975178 0.693809962,16.0977442 0.303146073,15.7073595 C-0.0875178163,15.3169749 -0.0877441892,14.68381 0.302640455,14.2931461 L6.58629142,8.00500036 Z" id="Shape" fill="#69CDBB" fillRule="nonzero" transform="translate(4.500000, 8.000000) rotate(-180.000000) translate(-4.500000, -8.000000) "></path>
                </g>
            </svg>
          </button>)
          : (<div></div>)
        }
        <p>Heartburn Checker</p>
        <ProgressBar percentage={progressBarPercentage}/>
      </div>
    );
  }
}
