import React from "react";
import {WorldMap,Box,Button} from "grommet";
import data from "../data/data";

class TabMap extends React.Component {
    state={
        continents:data.continents,
        places:data.places
    }

    removePlace = (coordinates) => {
        console.log("remove:",coordinates);
        let places=this.state.places.filter(place=>place.name!=="Selected area");
        this.setState({places:places});
    }

    selectPlace = (coordinates) => {
        let places=this.state.places;
        places[places.length-1].name==="Selected area"?places[places.length-1].location=coordinates:places.push({
            name:"Selected area",
            location:coordinates,
            color:"blue"
        });
        this.setState({places:places})
    }

    render(){
        return (
            <Box margin='small' pad='small'>
                <WorldMap
                    color="rgba(255,255,255,0.1)"
                    continents={this.state.continents.map(continent=>continent)}
                    onSelectPlace={this.selectPlace}
                    places={this.state.places}
                />
                <Button color="transparent" alignSelf="center" label="Remove selection" onClick={this.removePlace} />
            </Box>
        )
    }
}

export default TabMap;