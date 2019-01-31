import React, { Component } from "react";
import { getQuestionList } from "../../API/FetchData";
import { QuestionView } from "../QuestionView/QuestionView";
import { OutcomeView } from "../OutcomeView/OutcomeView";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { NotFoundView } from "../NotFoundView/NotFoundView";
import { getLabel } from "../../translationFile";

import "./FormView.css";

export class FormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      outcomes: [],
      patientScore: 0,
      currentAnswer: null,
      currentQuestion: null,
      finalOutcome: null,
      questionQueue: [],
      error: null,
    };
  }

  componentDidMount = () => {
    this.getQuestionListFromAPI();
  };

  getQuestionListFromAPI = () => {
    getQuestionList()
      .then(result => {
        this.setState({
          questions: result.questions,
          outcomes: result.outcomes,
          currentQuestion: result.questions[0]
        });
      })
      .catch(err => {
        this.setState({ error: err });
        console.warn(getLabel('label.error_questions_call', false), err);
      })
  };

  getBestOutcome = () => {
    let bestOutcome = null;
    this.state.currentQuestion.next.forEach(next => {
      if ((next.max_score && next.max_score >= this.state.patientScore && !bestOutcome)
          || (!next.max_score && !bestOutcome)) {
        bestOutcome = next.outcome;
      }
    });
    return bestOutcome;
  };

  goToPreviousQuestion = () => {
    const previousQuestion = this.state.questionQueue[this.state.questionQueue.length - 1];
    this.setState({
      questionQueue: this.state.questionQueue.filter(q => q.question.id !== previousQuestion.question.id),
      currentQuestion: previousQuestion.question,
      patientScore: this.state.patientScore - previousQuestion.question.answers.find(
          q => q.id === previousQuestion.idAnswer).score
    });
  };

  goToNextQuestion = () => {
    const {
      patientScore,
      currentQuestion,
      outcomes,
      currentAnswer,
      questions,
      questionQueue
    } = this.state;
    this.setState({ patientScore: patientScore + currentAnswer.score });
    let nextQuestionId = null;
    if (currentQuestion.next.length === 1) {
      // If there is only one possible next question
      nextQuestionId = currentQuestion.next[0].next_question;
    } else if (this.state.currentQuestion.next.some(q => q.outcome)) {
      // if there is an outcome meaning that we are at the end of the questions
      let outcomeId = this.getBestOutcome();
      this.setState({ finalOutcome: outcomes.find(e => e.id === outcomeId) });
    } else {
      //if multiple answers possible
      nextQuestionId = currentQuestion.next.find(a => a.answered === currentAnswer.id).next_question;
    }
    this.setState({
      currentAnswer: null,
      currentQuestion: questions.find(e => e.id === nextQuestionId),
      questionQueue: [
        ...questionQueue,
        { question: currentQuestion, idAnswer: currentAnswer.id }
      ]
    });
  };

  handleOptionChange = event => {
    this.setState({
      currentAnswer: this.state.currentQuestion.answers.find(
        a => a.id === event.currentTarget.id
      )
    });
  };

  // reset when click on the "back to the start" button
  restartProcess = () => {
    this.setState({
      patientScore: 0,
      currentAnswer: null,
      currentQuestion: this.state.questions[0],
      finalOutcome: null,
      questionQueue: []
    });
  };

  getProgressBarPercentage = () => {
    const questionIndex = this.state.currentQuestion
      ? this.state.questions.map(q => q.id).indexOf(this.state.currentQuestion.id)
      : -1;
    if (questionIndex === -1) {
      if (this.state.finalOutcome) {
        return 100;
      }
      return 0;
    } else {
      return (questionIndex / this.state.questions.length) * 100;
    }
  };

  displaySuccessView = () => {
    const {
      finalOutcome,
      currentQuestion,
      currentAnswer,
    } = this.state;
    return (
      !finalOutcome ? (
        <QuestionView
          currentQuestion={currentQuestion}
          currentAnswer={currentAnswer}
          handleOptionChange={this.handleOptionChange}
          goToNextQuestion={this.goToNextQuestion}
        />
      ) : (
        <OutcomeView
          restartProcess={this.restartProcess}
          finalOutcome={finalOutcome}
        />
      )
    )
  }

  render() {
    const {
      finalOutcome,
      questionQueue,
      error,
    } = this.state;
    return (
      <div className="form-view">
        <HeaderBar
          progressBarPercentage={this.getProgressBarPercentage()}
          questionQueue={questionQueue}
          finalOutcome={finalOutcome}
          goToPreviousQuestion={this.goToPreviousQuestion}
        />
        { !error ? this.displaySuccessView() : <NotFoundView retryClickEvent={this.getQuestionListFromAPI}/>}
      </div>
    )
  }
}
