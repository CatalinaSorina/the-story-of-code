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
        style:"",
        number:0
    }

    componentDidMount=()=>{
        this.getQuestion();
    }

    shuffle = (array) => array.map(index => [Math.random(), index]).sort(([a], [b]) => a - b).map(([_, index]) => index);

    checkMarkAnswer = (answer) => answer===this.state.answer;

    answerQuestion = (answer) => this.setState({answer:answer});

    submitAnswer = e => {
        const button=e.target;
        if(button.textContent==="submit"){
            this.state.answer===this.state.correctAnswer?this.setState({style:"correct"}):this.setState({style:"incorrect"});
            if(this.state.number===data.questions.length){
                button.textContent="no more";
                button.disabled=true;
            }else{
                button.textContent="want more";
            }
        }else{
            this.setState({answer:""});
            this.getQuestion();
            button.textContent="submit";
        }
    }

    getQuestion = () => {
        const questionHit=data.questions[this.state.number];
        this.setState({
            question:questionHit.question,
            answers:this.shuffle(questionHit.answers),
            correctAnswer:questionHit.correctAnswer,
            style:"",
            number:this.state.number+1
        });
    }

    render(){
        return (
            <div className={`${this.state.style} challenge`}>
                <Question question={this.state.question} style={this.state.style} num={this.state.number}/>
                <Answers answers={this.state.answers} answerQuestion={this.answerQuestion} checked={this.checkMarkAnswer} disabled={this.state.answer!==""}/>
                <Button className="submitButton" label="submit" color="white" onClick={this.submitAnswer} />
            </div>
        )
    }
}

export default TabChallenge;