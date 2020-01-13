import React from "react";
import { Button } from "grommet";
import Question from "./challenge/Question";
import Answers from "./challenge/Answers";
import data from "../data/data";
import "./challenge/TabChallenge.css";

class TabChallenge extends React.Component {
    state={
        question:"",
        answers:[],
        correctAnswer:"",
        answer:"",
        style:""
    }

    componentDidMount=()=>{
        this.getQuestion();
    }

    shuffle = (array) => array.map(index => [Math.random(), index]).sort(([a], [b]) => a - b).map(([_, index]) => index);

    checkMarkAnswer = (answer) => answer===this.state.answer;

    answerQuestion = (answer) => this.setState({answer:answer});

    submitAnswer = () => {
        this.state.answer===this.state.correctAnswer?this.setState({style:"correct"}):this.setState({style:"incorrect"});
    }

    getQuestion = () => {
        const questionHit=data.questions[Math.floor(Math.random()*(data.questions.length))];
        this.setState({question:questionHit.question,answers:this.shuffle(questionHit.answers),correctAnswer:questionHit.correctAnswer,style:""})
    }

    render(){
        return (
            <div className={`${this.state.style} challenge`}>
                <Question question={this.state.question} style={this.state.style} />
                <Answers answers={this.state.answers} answerQuestion={this.answerQuestion} checked={this.checkMarkAnswer} />
                <Button className="submitButton" label="submit" color="white" onClick={this.submitAnswer} />
            </div>
        )
    }
}

export default TabChallenge;