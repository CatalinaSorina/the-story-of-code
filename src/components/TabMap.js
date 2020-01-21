import React from "react";
import {WorldMap,Box,Button} from "grommet";
import data from "../data/data";
import {changePoints} from "../data/actions";
import {connect} from "react-redux";

class TabMap extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            continents:[],
            places:[],
            question:"",
            answer:""
        };
    }
    
    componentDidMount = () => this.setState({continents:data.continents,places:data.places});

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

    typeAnswer = e => this.setState({answer:e.target.value});

    submitAnswer = () => {
        let codeName=this.state.question.split("I'm ")[1].split(",")[0];
        if(codeName==="HTML+CSS") codeName="HTML";
        let points=this.props.points;
        let answerUpper=this.state.answer.toUpperCase();
        data.codeLanguage.map(codeType=>{
            if(codeName===codeType.code){
                if(answerUpper===codeType.town.toUpperCase()){
                    points+=10;
                }else if(answerUpper===codeType.state.toUpperCase()){
                    points+=5;
                }else if(answerUpper===codeType.region.toUpperCase()){
                    points+=1;
                }else{
                    points-=5;
                }
            }
            return points;
        })
        this.props.changePoints(points);
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

const mapStateToProps = state => ({points:state.points});

export default connect(mapStateToProps,{changePoints})(TabMap);