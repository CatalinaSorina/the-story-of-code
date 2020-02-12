import React, { useState } from "react";
import { Button, TextInput, Text } from "grommet";
import { useDispatch } from "react-redux";
import { checkMapQuestion } from "../../data/utils";
import { addPoints, removePoints, disableQuestion } from "../../data/actions";

const MapQuestion = ({ question,setQuestion,setQuestionPoints,setShowPoints,setAlertStyle }) => {
    const [answer, setAnswer] = useState("");
    const dispatch = useDispatch();

    const typeAnswer = e => setAnswer(e.target.value);

    const submitAnswer = () => {
        const codeName = question.split("I'm ")[1].split(",")[0];
        const questionPoints = checkMapQuestion(codeName, answer);
        dispatch(
            questionPoints > 0
                ? addPoints(questionPoints, "map")
                : removePoints(questionPoints * -1, "map")
        );
        dispatch(disableQuestion(codeName));
        //===SHOW RESULT===\\
        setQuestion("");
        setQuestionPoints(questionPoints);
        setShowPoints(true);
        setAlertStyle(
            questionPoints > 0 ? "success" : questionPoints === 0 ? "info" : "error"
        );
    };

    return (
        question !== "" &&
        <div className="mapQuestion">
            <Text className="questionMap">{question}</Text>
            <TextInput
                className="answerInput"
                placeholder="type here"
                onChange={typeAnswer}
            />
            <Button
                className="submitMap"
                color="blue"
                type="submit"
                label="submit"
                onClick={submitAnswer}
            />
        </div>

    )
}

export default MapQuestion;