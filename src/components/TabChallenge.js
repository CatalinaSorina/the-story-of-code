import React from "react";
import { Button } from "grommet";
import Question from "./challenge/Question";
import Answers from "./challenge/Answers";
import data from "../data/data";
import "./challenge/TabChallenge.css";
import { addPoints,removePoints } from "../data/actions";
import { connect } from "react-redux";
import ShowPoints from "./ShowPoints";

class TabChallenge extends React.Component {
    constructor(props){
        super(props);
        this.state={
            question:"",
            answers:[],
            correctAnswer:"",
            answer:"",
            style:"",
            number:0,
            points:0,
            showPoints:false
        }
    }

    componentDidMount=()=>{
        this.getQuestion();
    }

    shuffle = (array) => array.map(index => [Math.random(), index]).sort(([a], [b]) => a - b).map(([_, index]) => index);

    checkMarkAnswer = (answer) => answer===this.state.answer;

    answerQuestion = (answer) => this.setState({answer:answer});

    submitAnswer = e => {
        const button=e.target;
        //===SUBMIT OR NEXT QUESTION===\\
        if(button.textContent==="submit"){
            //===SET VARIABLES===\\
            let points=this.state.points;
            let style="";
            const pagePointsType="challenge";
            //===CHECK ANSWER===\\
            if(this.state.answer===this.state.correctAnswer){
                style="success";
                points+=5;
                this.props.addPoints(5,pagePointsType);
            }else{
                style="error";
                points-=5;
                this.props.removePoints(5,pagePointsType);
            }
            //===SHOW RESULT===\\
            this.setState({style:style,points:points,showPoints:true});
            //===CHECK FOR MORE QUESTIONS===\\
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
                <ShowPoints showPoints={this.state.showPoints} 
                    onClose={()=>this.setState({showPoints:false})}
                    alertStyle={this.state.style}
                    points={this.state.points}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({points:state.points});

export default connect(mapStateToProps,{ addPoints,removePoints })(TabChallenge);