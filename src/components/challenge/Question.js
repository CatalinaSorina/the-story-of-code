import React from "react";
import {Checkmark,Close,Magic} from "grommet-icons";

const Question = ({question,style}) => {
    return(
        <div className="question">
            {style==="correct" && <Checkmark color="lightgreen"/>}
            {style==="incorrect" && <Close color="red"/>}
            {style==="" && <Magic />}
            {` Challenge: ${question}`}
        </div>
    )
}

export default Question;