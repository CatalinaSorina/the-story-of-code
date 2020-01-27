import React from "react";
import { WorldMap,Box,Button,TextInput,Text } from "grommet";
import data from "../data/data";
import { addPoints,removePoints } from "../data/actions";
import { connect } from "react-redux";
import ShowPoints from "./ShowPoints";
import "./TabMap.css";

class TabMap extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            continents:[],
            places:[],
            question:"",
            answer:"",
            points:0,
            showPoints:false,
            alertStyle:"info"
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
        //===GET CODE NAME FROM QUESTION===\\
        let codeName=this.state.question.split("I'm ")[1].split(",")[0];
        //===CHANGE IF HTML+CSS (SAME LOCATION)===\\
        if(codeName==="HTML+CSS") codeName="HTML";
        //===SET VARIABLES===\\
        let points=this.state.points;
        let answerUpper=this.state.answer.toUpperCase();
        let alertStyle="info";
        const pagePointsType="map";
        const correct="success";
        const incorrect="error";
        //===CHECK ANSWER===\\
        data.codeLanguage.map(codeType=>{
            if(codeName===codeType.code){
                if(answerUpper===codeType.town.toUpperCase()){
                    points+=10;
                    alertStyle=correct;
                    this.props.addPoints(10,pagePointsType);
                }else if(answerUpper===codeType.state.toUpperCase()){
                    points+=5;
                    alertStyle=correct;
                    this.props.addPoints(5,pagePointsType);
                }else if(answerUpper===codeType.region.toUpperCase()){
                    points+=1;
                    alertStyle=correct;
                    this.props.addPoints(1,pagePointsType);
                }else{
                    points-=5;
                    alertStyle=incorrect;
                    this.props.removePoints(5,pagePointsType);
                }
            }
            return points;
        });
        //===SHOW RESULT===\\
        this.setState({question:"",points:points,showPoints:true,alertStyle:alertStyle});
    }

    placeAction = placeName => this.setState({question:`I'm ${placeName}, where was I born?`});

    render(){
        return (
            <Box margin='small' pad='small' alignContent="center">
                <div className="mapHolder"><WorldMap
                    className="map"
                    color="rgba(255,255,255,0.1)"
                    continents={this.state.continents.map(continent=>continent)}
                    onSelectPlace={this.selectPlace}
                    places={this.state.places.map(place=>{
                        return {...place,onClick:this.placeAction}
                    })}
                /></div>
                {this.state.question!=="" && <div className="mapQuestion">
                        <Text className="questionMap">{this.state.question}</Text>
                        <TextInput className="answerInput" placeholder="type here" onChange={this.typeAnswer}/>
                        <Button className="submitMap" color="blue" type="submit" label="submit" onClick={this.submitAnswer}/>
                    </div>
                }
                <Button color="transparent" alignSelf="center" label="Remove selection" onClick={this.removePlace} />
                <ShowPoints showPoints={this.state.showPoints} 
                    onClose={()=>this.setState({showPoints:false})}
                    alertStyle={this.state.alertStyle}
                    points={this.state.points}
                />
            </Box>
        )
    }
}

const mapStateToProps = state => ({points:state.points});

export default connect(mapStateToProps,{addPoints,removePoints})(TabMap);