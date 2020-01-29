import React from "react";
import { CheckBox } from "grommet";

const Answers = ({ answers, answerQuestion, answeredQuestion, disabled }) => {
  const [keyAnswer, setKeyAnswer] = React.useState();

  const answerQuestionChanged = event => {
    if (keyAnswer === event.target.id) {
      setKeyAnswer("");
      answerQuestion("");
    } else {
      setKeyAnswer(event.target.id);
      answerQuestion(event.target.value);
    }
  };

  return (
    <React.Fragment>
      {answers.map((answer, i) => (
        <CheckBox
          key={i}
          id={`Answer${i}`}
          label={answer}
          value={answer}
          onChange={answerQuestionChanged}
          checked={answeredQuestion === answer}
          disabled={disabled}
        />
      ))}
    </React.Fragment>
  );
};

export default Answers;
