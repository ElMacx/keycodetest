import React, { Component } from 'react';
import { ProgressBar } from './Components/ProgressBar/ProgressBar';
import { RadioButton } from './Components/RadioButton/RadioButton';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      questions: [],
      outcomes: [],
      patientScore: 0,
      currentAnswer: null,
      currentQuestion: null,
      finalOutcome: null,
      questionQueue: [],
    };
  }

  componentDidMount = () => {
    fetch("https://gist.githubusercontent.com/jakber/458d168c83ff8797219a1b8f7db1cfab/raw/e0161e2127ead0d65ffe98ffaa3386274cc2858c/heartburn.json", {
      method: "GET",
      headers: {
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            questions: result.questions,
            outcomes: result.outcomes,
            currentQuestion: result.questions[ 0 ]
          });
      })
      .catch(err => console.warn('err getting questions list ', err))
  }

  getBestOutcome = () => {
    let bestOutcome = null;
    this.state.currentQuestion.next.forEach(next => {
      if ((next.max_score && next.max_score >= this.state.patientScore && !bestOutcome) || (!next.max_score && !bestOutcome)) {
        bestOutcome = next.outcome;
      }
    })
    return bestOutcome
  }

  goToPreviousQuestion = () => {
    const previousQuestion = this.state.questionQueue[ this.state.questionQueue.length - 1 ];
    this.setState({
      questionQueue: this.state.questionQueue.filter(q => q.question.id !== previousQuestion.question.id),
      currentQuestion: previousQuestion.question,
      patientScore: this.state.patientScore - previousQuestion.question.answers.find(e => e.id === previousQuestion.idAnswer).score
    });
  }

  goToNextQuestion = () => {
    const { patientScore, currentQuestion, outcomes, currentAnswer, questions, questionQueue } = this.state;
    this.setState({ patientScore: patientScore + currentAnswer.score });
    let nextQuestionId = null;
    if (currentQuestion.next.length === 1) { // If there is only one possible next question
      nextQuestionId = currentQuestion.next[ 0 ].next_question;
    } else if (this.state.currentQuestion.next.some(q => q.outcome)) { // if there is an outcome meaning that we are at the end of the questions
      let outcomeId = this.getBestOutcome();
      this.setState({ finalOutcome: outcomes.find(e => e.id === outcomeId )})
    } else { //if multiple answers possible
      nextQuestionId = currentQuestion.next.find(e => e.answered === currentAnswer.id).next_question;
    }
    this.setState({
      currentAnswer: null,
      currentQuestion: questions.find(e => e.id === nextQuestionId),
      questionQueue: [...questionQueue, { question: currentQuestion, idAnswer: currentAnswer.id }],
    });
  }

  handleOptionChange = (event) => {
    this.setState({ currentAnswer: this.state.currentQuestion.answers.find(e => e.id === event.currentTarget.id) });
  }

  // reset when click on the "back to the start" button
  restartProcess = () => {
    this.setState({
      patientScore: 0,
      currentAnswer: null,
      currentQuestion: this.state.questions[ 0 ],
      finalOutcome: null,
      questionQueue: [],
    })
  }

  _getProgressBarPercentage = () => {
    const questionIndex = this.state.currentQuestion ? this.state.questions.map(e => e.id ).indexOf(this.state.currentQuestion.id) : -1;
    if (questionIndex === -1) {
      return 0;
    } else {
      return (questionIndex / this.state.questions.length) * 100;
    }
  }

  _displayQuestionsForm = () => {
    const { currentQuestion, currentAnswer } = this.state;
    return (
      currentQuestion ? (
      <div className="Question-form">
        <p>{ currentQuestion.question_text }</p>
        <svg width="40" height="5">
          <rect width="40" height="3" rx="1" ry="1" className="rect-under-question-text" />
        </svg>
        <div className="radio-button-container">
          {
            currentQuestion.answers.map(ans => {
              return (<RadioButton key={ans.id} currentAnswer={currentAnswer} ans={ans} handleOptionChange={this.handleOptionChange}/>)
            })
          }
        </div>
        <button disabled={!currentAnswer} className={!currentAnswer ? 'next-button-position global-button disabled-button' : 'next-button-position global-button'} onClick={this.goToNextQuestion}>
          <span>Next</span>
          <svg className="next-button-icon" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="icons/ic-arrow-right-white" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path d="M6.58629142,8.00500036 L0.292640816,1.70685429 C-0.0977440278,1.3161906 -0.0975179782,0.68302566 0.293145712,0.292640816 C0.683809402,-0.0977440278 1.31697434,-0.0975179782 1.70735918,0.293145712 L8.70735918,7.29814571 C9.0975468,7.68861203 9.09754696,8.32138741 8.70735954,8.71185393 L1.71735954,15.7068539 C1.3269749,16.0975178 0.693809962,16.0977442 0.303146073,15.7073595 C-0.0875178163,15.3169749 -0.0877441892,14.68381 0.302640455,14.2931461 L6.58629142,8.00500036 Z" id="Shape" fill={!currentAnswer ? '#7B99A9' : '#FFFFFF'} fillRule="nonzero"></path>
              </g>
          </svg>
          </button>
    </div>) : (<div className="App"></div>))
  }

  _displayOutcomeForm = () => {
    const { finalOutcome } = this.state;
    return (
      <div className="outcome-form">
        <h2>Thank you for answering the questions!</h2>
        <svg width="40" height="5">
          <rect width="40" height="3" rx="1" ry="1" className="rect-under-question-text" />
        </svg>
        <p>{ finalOutcome.text }</p>
        { finalOutcome.show_booking_button ?
          (<button className="global-button">Book a meeting</button>) : (<div></div>)}
        <span className="restart-button" onClick={this.restartProcess}>Back to the start screen</span>
      </div>
    )
  }

  render() {
    const { finalOutcome, questionQueue } = this.state;
    return (
      <div className="App">
      <div className="App-header">
        {
          (questionQueue.length > 0 && !finalOutcome) ?
          (<button className="previous-button" onClick={this.goToPreviousQuestion}>
            <svg width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="icons/ic-arrow-left-green" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path d="M6.58629142,8.00500036 L0.292640816,1.70685429 C-0.0977440278,1.3161906 -0.0975179782,0.68302566 0.293145712,0.292640816 C0.683809402,-0.0977440278 1.31697434,-0.0975179782 1.70735918,0.293145712 L8.70735918,7.29814571 C9.0975468,7.68861203 9.09754696,8.32138741 8.70735954,8.71185393 L1.71735954,15.7068539 C1.3269749,16.0975178 0.693809962,16.0977442 0.303146073,15.7073595 C-0.0875178163,15.3169749 -0.0877441892,14.68381 0.302640455,14.2931461 L6.58629142,8.00500036 Z" id="Shape" fill="#69CDBB" fillRule="nonzero" transform="translate(4.500000, 8.000000) rotate(-180.000000) translate(-4.500000, -8.000000) "></path>
                </g>
            </svg>
          </button>)
          : (<div></div>)
        }
        <p>Heartburn Checker</p>
        <ProgressBar percentage={this._getProgressBarPercentage()}/>
      </div>
        { !finalOutcome ? this._displayQuestionsForm() : this._displayOutcomeForm() }
      </div>
    );
  }
}

export default App;
