import React, { useState } from "react";
import { Box, Button, Text } from "grommet";
import {
  removeSelectedArea,
  getPlacesFromRedux
} from "../data/actions";
import { useSelector, useDispatch } from "react-redux";
import ShowPoints from "./ShowPoints";
import "./TabMap.css";
import Map from "./map/Map";
import MapQuestion from "./map/MapQuestion";

const TabMap = () => {
  const places = useSelector(state => state.places);
  const [question, setQuestion] = useState("");
  const [questionPoints, setQuestionPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [alertStyle, setAlertStyle] = useState("info");
  const points = useSelector(state => state.points);
  const selectedArea = useSelector(state => state.selectedArea);
  const dispatch = useDispatch();


  const removePlace = () => dispatch(removeSelectedArea());

  return (
    <Box margin="small" pad="small" alignContent="center">
      <Map places={places} changeQuestion={setQuestion} removePlace={removePlace} />
      <MapQuestion
        question={question}
        setQuestion={setQuestion}
        setQuestionPoints={setQuestionPoints}
        setShowPoints={setShowPoints}
        setAlertStyle={setAlertStyle}
      />
      {selectedArea && (
        <React.Fragment>
          <Text>{selectedArea}</Text>
          <Button
            color="transparent"
            alignSelf="center"
            label="Remove selection"
            onClick={removePlace}
          />
        </React.Fragment>
      )}
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
