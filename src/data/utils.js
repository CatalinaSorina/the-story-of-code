import axios from "axios";
import data from "./data";

export const getResponseFromApi = async api => axios.get(api);

export const getContinents = () => data.continents;

export const getPlaces = () => data.places;

export const shuffle = array => array.map(index => [Math.random(), index]).sort(([a], [b]) => a - b).map(([_, index]) => index);

export const getResult = (money,pointsMap,pointsChallenge) => {
    let resultStory=``;
    if(money>0){
        if(pointsMap>4 && pointsChallenge>4){
            resultStory=data.results.ultimateResult;
        }else if((pointsMap>4 && pointsChallenge===0)||(pointsMap===0 && pointsChallenge>4)){
            resultStory=data.results.plusOnePage;
        }else if(pointsMap>2 || pointsChallenge>2){
            resultStory=data.results.plus2;
        }else if(pointsMap>0 || pointsChallenge>0){
            resultStory=data.results.plus;
        }else{
            resultStory=data.results.wrong;
        }
    }else{
        if((pointsMap>4 && pointsChallenge===0)||(pointsMap===0 && pointsChallenge>4)){
            resultStory=data.results.minusOnePage;
        }else if(pointsMap>2 || pointsChallenge>2){
            resultStory=data.results.minus2;
        }else if(pointsMap>0 || pointsChallenge>0){
            resultStory=data.results.minus;
        }else{
            resultStory=data.results.wrong;
        }
    }
    return resultStory;
}