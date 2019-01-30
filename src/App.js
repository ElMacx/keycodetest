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

  componentDidMount() {
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
  }

  isAnOutcomeQuestion() {
    let ret = false;
    this.state.currentQuestion.next.map(qst => {
      if (qst.outcome) {
        ret = true
      }
    });
    return ret;
  }

  getBestOutcome() {
    let ret = null;
    this.state.currentQuestion.next.forEach(nt => {
      if (nt.max_score && nt.max_score >= this.state.patientScore && !ret) {
        ret = nt.outcome;
      } else if (!nt.max_score && !ret) {
        ret = nt.outcome;
      }
    })
    return ret
  }

  goToPreviousQuestion = () => {
    const previousQuestion = this.state.questionQueue.pop()
    this.setState({
      currentQuestion: previousQuestion.question,
      patientScore: this.state.patientScore - previousQuestion.question.answers.find(e => e.id === previousQuestion.idAnswer).score
    })
  }

  goToNextQuestion = () => {
    const { patientScore, currentQuestion, outcomes, currentAnswer, questions, questionQueue } = this.state;
    this.setState({ patientScore: patientScore + currentAnswer.score });
    let nextQuestionId = null;
    if (currentQuestion.next.length === 1) {
      nextQuestionId = currentQuestion.next[ 0 ].next_question;
    } else if (this.isAnOutcomeQuestion()) {
      let outcomeId = this.getBestOutcome();
      this.setState({ finalOutcome: outcomes.find(e => e.id === outcomeId )})
    } else {
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

  restartProcess = () => {
    this.setState({
      patientScore: 0,
      currentAnswer: null,
      currentQuestion: this.state.questions[ 0 ],
      finalOutcome: null,
      questionQueue: [],
    })
  }

  _getProgressBarPercentage() {
    const questionIndex = this.state.currentQuestion ? this.state.questions.map(e => e.id ).indexOf(this.state.currentQuestion.id) : -1;
    if (questionIndex === -1) {
      return 0;
    } else {
      return (questionIndex / this.state.questions.length) * 100;
    }
  }

  _displayQuestionsForm() {
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
          </button>
    </div>) : (<div className="App"></div>))
  }

  _displayOutcomeForm() {
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
        <a className="restart-button" onClick={this.restartProcess}>Back to the start screen</a>
      </div>
    )
  }

  render() {
    const { finalOutcome, questionQueue } = this.state;
    return (
      <div className="App">
      <div className="App-header">
        {
          (questionQueue.length > 0 && !finalOutcome) ? (<button className="previous-button" onClick={this.goToPreviousQuestion}>Prev</button>) : (<div></div>)
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
