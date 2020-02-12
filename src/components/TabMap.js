import React, { useState } from "react";
import { Box, Button } from "grommet";
import { getPlacesFromRedux, removeSelectedArea } from "../data/actions";
import { useSelector, useDispatch } from "react-redux";
import "./map/TabMap.css";
import ShowPoints from "./ShowPoints";
import Map from "./map/Map";
import MapQuestion from "./map/MapQuestion";
import SelectedArea from "./map/SelectedArea";

const TabMap = () => {
  const places = useSelector(state => state.places);
  const [question, setQuestion] = useState("");
  const [questionPoints, setQuestionPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [alertStyle, setAlertStyle] = useState("info");
  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const removePlace = () => dispatch(removeSelectedArea());

  return (
    <Box margin="small" pad="small" alignContent="center">
      <Map places={places} dispatch={dispatch} changeQuestion={setQuestion} removePlace={removePlace} />
      <MapQuestion
        question={question}
        dispatch={dispatch}
        setQuestion={setQuestion}
        setQuestionPoints={setQuestionPoints}
        setShowPoints={setShowPoints}
        setAlertStyle={setAlertStyle}
      />
      <SelectedArea removePlace={removePlace} />
      <ShowPoints
        showPoints={showPoints}
        onClose={() => setShowPoints(false)}
        alertStyle={alertStyle}
        points={points}
        questionPoints={questionPoints}
      />
      {places.length === 0 && <Button alignSelf="center" onClick={() => dispatch(getPlacesFromRedux())}>discover</Button>}
    </Box>
  );
};

export default TabMap;
