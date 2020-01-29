import React, { useState, useEffect } from "react";
import { Button } from "grommet";
import Question from "./challenge/Question";
import Answers from "./challenge/Answers";
import "./challenge/TabChallenge.css";
import { addPoints,removePoints,changeNumber } from "../data/actions";
import { useSelector,useDispatch } from "react-redux";
import ShowPoints from "./ShowPoints";
import { getQuestion,checkNumber } from "../data/utils";

const TabChallenge = () => {
    const [question,setQuestion]=useState();
    const [answers,setAnswers]=useState([]);
    const [correctAnswer,setCorrectAnswer]=useState('');
    const [answer,setAnswer]=useState('');
    const [style,setStyle]=useState('');
    const [questionPoints,setQuestionPoints]=useState(0);
    const [showPoints,setShowPoints]=useState(false);
    const points=useSelector(state=>state.points);
    const number=useSelector(state=>state.challengeQuestionNumber);
    const dispatch=useDispatch();

    // useEffect(()=>{
    //     receiveQuestion();
    // },[])

    const receiveQuestion = () => {
        const questionReceived=getQuestion(number);
        setQuestion(questionReceived.question);
        setAnswers(questionReceived.answers);
        setCorrectAnswer(questionReceived.correctAnswer);
        if(checkNumber(number)) dispatch(changeNumber(number+1));
    }

    const answerQuestion = (answer) => setAnswer(answer);

    const submitAnswer = e => {
        const button=e.target;
        //===SUBMIT OR NEXT QUESTION===\\
        if(button.textContent==="submit"){
            //===SET VARIABLES===\\
            const pagePointsType="challenge";
            //===CHECK ANSWER===\\
            if(answer===correctAnswer){
                setStyle("success");
                setQuestionPoints(5);
                dispatch(addPoints(5,pagePointsType));
            }else{
                setStyle("error");
                setQuestionPoints(-5);
                dispatch(removePoints(5,pagePointsType));
            }
            //===SHOW RESULT===\\
            setShowPoints(true);
            //===CHECK FOR MORE QUESTIONS===\\
            if(checkNumber(number)){
                button.textContent="no more";
                button.disabled=true;
            }else{
                button.textContent="want more";
            }
        }else{
            button.textContent="submit";
            getQuestion();
        }
    }

    return (
        <>{question && <div className={`${style} challenge`}>
            <Question question={question} style={style} num={number+1}/>
            <Answers answers={answers} answerQuestion={answerQuestion} answeredQuestion={answer} disabled={answer!==""}/>
            <Button className="submitButton" label="submit" color="white" onClick={submitAnswer} />
            <ShowPoints showPoints={showPoints} 
                onClose={()=>this.setShowPoints(false)}
                alertStyle={style}
                points={points}
                questionPoints={questionPoints}
            />
        </div>}</>
    )
}

export default TabChallenge;