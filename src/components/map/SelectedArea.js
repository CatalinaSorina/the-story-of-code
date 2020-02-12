import React from "react";
import { Button, Text } from "grommet";
import { useSelector } from "react-redux";

const SelectedArea = ({ removePlace }) => {
    const selectedArea = useSelector(state => state.selectedArea);

    return (
        selectedArea &&
        <React.Fragment>
            <Text>{selectedArea}</Text>
            <Button
                color="transparent"
                alignSelf="center"
                label="Remove selection"
                onClick={removePlace}
            />
        </React.Fragment>
    )
}

export default SelectedArea;