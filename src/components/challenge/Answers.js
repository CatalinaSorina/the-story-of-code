import React from "react";
import {CheckBox} from "grommet"

const Answers = ({answers,answerQuestion}) => {
    const [keyAnswer, setKeyAnswer] = React.useState();

    const answerQuestionChanged = (event) => {
        if(keyAnswer===event.target.id){
            setKeyAnswer("");
            answerQuestion("");
        }else{
            setKeyAnswer(event.target.id);
            answerQuestion(event.target.value);
        }
    }

    return(
        <>
            {answers.map((answer,i)=>(
                <CheckBox className="answer" key={i} id={`Answer${i}`} label={answer} value={answer} onChange={answerQuestionChanged} checked={keyAnswer===`Answer${i}`}/>
            ))}
        </>
    )
}

export default Answers;