import React, { useState, useEffect, useCallback } from "react";
import { Button } from "grommet";
import Question from "./challenge/Question";
import Answers from "./challenge/Answers";
import "./challenge/TabChallenge.css";
import { addPoints, removePoints, changeNumber } from "../data/actions";
import { useSelector, useDispatch } from "react-redux";
import ShowPoints from "./ShowPoints";
import { getQuestion, checkNumber } from "../data/utils";

const TabChallenge = () => {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [style, setStyle] = useState("");
  const [questionPoints, setQuestionPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const points = useSelector(state => state.points);
  const number = useSelector(state => state.challengeQuestionNumber);
  const dispatch = useDispatch();

  const receiveQuestionCallback = useCallback(() => {
    if (!checkNumber(number + 1)) {
      const questionReceived = getQuestion(number);
      setQuestion(questionReceived.question);
      setAnswers(questionReceived.answers);
      setCorrectAnswer(questionReceived.correctAnswer);
    }
  }, [number]);

  useEffect(() => {
    receiveQuestionCallback();
  }, [receiveQuestionCallback]);

  const answerQuestion = answer => setAnswer(answer);

  const submitAnswer = e => {
    //===SET VARIABLES===\\
    const pagePointsType = "challenge";
    //===CHECK ANSWER===\\
    if (answer === correctAnswer) {
      setStyle("success");
      setQuestionPoints(5);
      dispatch(addPoints(5, pagePointsType));
    } else {
      setStyle("error");
      setQuestionPoints(-5);
      dispatch(removePoints(5, pagePointsType));
    }
    //===SHOW RESULT===\\
    setShowPoints(true);
    //===CHECK FOR MORE QUESTIONS===\\
    if (!checkNumber(number + 1)) {
      setAnswer("");
      dispatch(changeNumber(number + 1));
    } else {
      e.target.textContent = "no more";
      e.target.disabled = true;
    }
  };

  return (
    <React.Fragment>
      {question ? (
        <div className={`${style} challenge`}>
          <Question question={question} style={style} num={number + 1} />
          <Answers
            answers={answers}
            answerQuestion={answerQuestion}
            answeredQuestion={answer}
            // disabled={answer !== ""}
          />
          <Button
            className="submitButton"
            label="submit"
            color="white"
            onClick={submitAnswer}
          />
          <ShowPoints
            showPoints={showPoints}
            onClose={() => setShowPoints(false)}
            alertStyle={style}
            points={points}
            questionPoints={questionPoints}
          />
        </div>
      ) : (
        <div style={{ margin: "1rem" }}>No more questions, check results.</div>
      )}
    </React.Fragment>
  );
};

export default TabChallenge;
