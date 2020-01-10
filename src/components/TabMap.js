import React from "react";
import {WorldMap,Box} from "grommet";
import data from "../data/data";

class TabMap extends React.Component {
    state={
        continents:data.continents,
        places:data.places
    }

    removePlace = (coordinates) => {
        console.log("remove:",coordinates);
        let places=this.state.places.filter(place=>place.location!==coordinates);
        this.setState({places:places});
    }

    selectPlace = (coordinates) => {
        let places=this.state.places;
        const place={
            name:"Selected area",
            location:coordinates,
            color:"blue"
        };
        places[places.length-1].name==="Selected area"?places[places.length-1].location=coordinates:places.push(place);
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
            </Box>
        )
    }
}

export default TabMap;