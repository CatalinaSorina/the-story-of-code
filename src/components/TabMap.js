import React, { useState,useEffect } from "react";
import { WorldMap,Box,Button,TextInput,Text } from "grommet";
import { getContinents,checkMapQuestion } from "../data/utils";
import { addPoints,removePoints,makeLocation,removeSelectedArea,changeSelectedName,disableQuestion } from "../data/actions";
import { useSelector,useDispatch } from "react-redux";
import ShowPoints from "./ShowPoints";
import "./TabMap.css";

const TabMap = () => {
    const [continents,setContinents]=useState([]);
    const places=useSelector(state=>state.places);
    const [question,setQuestion]=useState('');
    const [questionPoints,setQuestionPoints]=useState(0);
    const [answer,setAnswer]=useState('');
    const [showPoints,setShowPoints]=useState(false);
    const [alertStyle,setAlertStyle]=useState('info');
    const points=useSelector(state=>state.points);
    const selectedArea=useSelector(state=>state.selectedArea);
    const mapQuestionsDisabled=useSelector(state=>state.mapQuestionsDisabled);
    const dispatch=useDispatch();
    
    useEffect(() => {
        setContinents(getContinents());
    },[]);

    const removePlace = () => dispatch(removeSelectedArea());

    const selectPlace = (coordinates) => {
        dispatch(makeLocation(coordinates));
        setQuestion('');
    }

    const typeAnswer = e => setAnswer(e.target.value);

    const submitAnswer = () => {
        const codeName=question.split("I'm ")[1].split(",")[0];
        const questionPoints=checkMapQuestion(codeName,answer);
        dispatch(questionPoints>0? addPoints(questionPoints,"map"):removePoints((questionPoints*(-1)),"map"));
        dispatch(disableQuestion(codeName));
        //===SHOW RESULT===\\
        setQuestion('');
        setQuestionPoints(questionPoints);
        setShowPoints(true);
        setAlertStyle(questionPoints>0?"success":(questionPoints===0?"info":"error"));
    }

    const placeAction = placeName => {
        removePlace();
        mapQuestionsDisabled.includes(placeName)? setQuestion(''):setQuestion(`I'm ${placeName}, where was I born?`);
    }

    const showName = placeName => {
        setQuestion('');
        dispatch(changeSelectedName(placeName));
    }

    return (
        <Box margin='small' pad='small' alignContent="center">
            <div className="mapHolder"><WorldMap
                className="map"
                color="rgba(255,255,255,0.1)"
                continents={continents.map(continent=>continent)}
                onSelectPlace={selectPlace}
                places={places.map(place=>({...place,onClick:place.color!=="black"?placeAction:showName}))}
            /></div>
            {question!=="" && <div className="mapQuestion">
                <Text className="questionMap">{question}</Text>
                <TextInput className="answerInput" placeholder="type here" onChange={typeAnswer}/>
                <Button className="submitMap" color="blue" type="submit" label="submit" onClick={submitAnswer}/>
            </div>}
            {selectedArea && <>
                <Text>{selectedArea}</Text>
                <Button color="transparent" alignSelf="center" label="Remove selection" onClick={removePlace} />
            </>}
            <ShowPoints showPoints={showPoints} 
                onClose={()=>setShowPoints(false)}
                alertStyle={alertStyle}
                points={points}
                questionPoints={questionPoints}
            />
        </Box>
    )
}

export default TabMap;