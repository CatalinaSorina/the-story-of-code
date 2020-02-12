import React, { useState, useEffect, useCallback } from "react";
import { WorldMap } from "grommet";
import { getContinents } from "../../data/utils";
import { useSelector } from "react-redux";
import { makeLocation, changeSelectedName, getPlacesFromRedux } from "../../data/actions";

const Map = ({ places, dispatch, changeQuestion, removePlace }) => {
    const mapQuestionsDisabled = useSelector(state => state.mapQuestionsDisabled);
    const [continents, setContinents] = useState([]);

    const callbackPlaces = useCallback(() => !places && dispatch(getPlacesFromRedux()), [dispatch, places]);

    useEffect(() => {
        setContinents(getContinents());
        callbackPlaces();
    }, [callbackPlaces]);

    const selectPlace = coordinates => {
        dispatch(makeLocation(coordinates));
        changeQuestion("");
    };

    const placeAction = placeName => {
        removePlace();
        mapQuestionsDisabled.includes(placeName)
            ? changeQuestion("")
            : changeQuestion(`I'm ${placeName}, where was I born?`);
    };

    const showName = placeName => {
        changeQuestion("");
        dispatch(changeSelectedName(placeName));
    };

    return (
        <div className="mapHolder">
            <WorldMap
                className="map"
                color="rgba(255,255,255,0.1)"
                continents={continents.map(continent => continent)}
                onSelectPlace={selectPlace}
                places={places.map(place => ({
                    ...place,
                    onClick: place.color !== "white" ? placeAction : showName
                }))}
            />
        </div>
    )
};

export default Map;