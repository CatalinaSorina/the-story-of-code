import React from "react";
import {WorldMap,Box,Button} from "grommet";
import data from "../data/data";

class TabMap extends React.Component {
    state={
        continents:data.continents,
        places:data.places,
        question:"",
        answer:""
    }

    removePlace = () => {
        let places=this.state.places.filter(place=>place.name!=="Selected area");
        this.setState({places:places,question:""});
    }

    selectPlace = (coordinates) => {
        let places=this.state.places;
        places[places.length-1].name==="Selected area"?places[places.length-1].location=coordinates:places.push({
            name:"Selected area",
            location:coordinates,
            color:"blue"
        });
        this.setState({places:places,question:""});
    }

    typeAnswer = e => {
        console.log(e.target.value);
        this.setState({answer:e.target.value});
    }

    submitAnswer = () => {
        this.removePlace();
    }

    placeAction = placeName => this.setState({question:`I'm ${placeName}, where was I born?`});

    render(){
        return (
            <Box margin='small' pad='small'>
                <WorldMap
                    color="rgba(255,255,255,0.1)"
                    continents={this.state.continents.map(continent=>continent)}
                    onSelectPlace={this.selectPlace}
                    places={this.state.places.map(place=>{
                        return {...place,onClick:this.placeAction}
                    })}
                />
                {this.state.question!=="" && <div style={{padding:"1rem"}}>
                        {this.state.question}
                        <input style={{font:"inherit",padding:"0.2rem",margin:"0.5rem"}} onChange={this.typeAnswer}/>
                        <Button color="blue" type="submit" label="submit" onClick={this.submitAnswer}/>
                    </div>
                }
                <Button color="transparent" alignSelf="center" label="Remove selection" onClick={this.removePlace} />
            </Box>
        )
    }
}

export default TabMap;