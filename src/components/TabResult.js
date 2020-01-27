import React from "react";
import { Heading,Box,List,Select,Button,Paragraph } from "grommet";
import { useSelector,useDispatch } from "react-redux";
import "./TabResult.css";
import { Money } from "grommet-icons";
import * as actions from "../data/actions";

const TabResult = () => {
    const money=useSelector(state=>state.money);
    const moneyType=useSelector(state=>state.currencyType);
    const pointsType=useSelector(state=>state.pointsType);
    const dispatch=useDispatch();
    const [result, setResult] = React.useState();
    
    const changeMoneyType = moneyType => {
        if(moneyType==="RON") {
            dispatch(actions.getCurrencyVal("USD_RON"));
        }else if(moneyType==="USD"){
            dispatch(actions.getCurrencyVal("USD_USD"));
        }else if(moneyType==="EUR"){
            dispatch(actions.getCurrencyVal("USD_EUR"));
        }
    }

    const getDecimals = num => num % 1 === 0? num:num.toFixed(2);

    const resetMoney = () => {
        let resultStory;
        const numberMap=pointsType.filter(type=>type==="map").length;
        const numberChallenge=pointsType.filter(type=>type==="challenge").length;
        if(money>0){
            // DON'T READ HERE SMART ASS!!! :)))) \\
            if(numberMap>4 && numberChallenge>4){
                resultStory=`╔═.♥. ═════ULTIMATE STORY═════════╗  
                You are FUNNY and SMART and LUCKY.
                You may have lost, or just win points
                but you still earned enough MONEY.
                You played enough this game.
                Write the author if you have more ideas.
                Have a great day!  
                ╚══════.♥. ════════════════════╝  
                ───▄▄▄▄▄▄─────▄▄▄▄▄▄───
        
                ─▄█▓▓▓▓▓▓█▄─▄█▓▓▓▓▓▓█▄─
        
                ▐█▓▓▒▒▒▒▒▓▓█▓▓▒▒▒▒▒▓▓█▌  
        
                █▓▓▒▒░╔╗╔═╦═╦═╦═╗░▒▒▓▓█  
        
                █▓▓▒▒░║╠╣╬╠╗║╔╣╩╣░▒▒▓▓█
        
                ▐█▓▓▒▒╚═╩═╝╚═╝╚═╝▒▒▓▓█▌
        
                ─▀█▓▓▒▒░░░░░░░░░▒▒▓▓█▀─
        
                ───▀█▓▓▒▒░░░░░▒▒▓▓█▀───
        
                ─────▀█▓▓▒▒░▒▒▓▓█▀─────
        
                ──────▀█▓▓▒▓▓█▀──────
        
                ────────▀█▓█▀────────
        
                ──────────▀──────────`;
            }else if((numberMap>4 && numberChallenge===0)||(numberMap===0 && numberChallenge>4)){
                resultStory=`You are close to ULTIMATE STORY.
                Yet you did not discover more paths.
                Play more around.
                Have poor luck but a smart head!`;
            }else if(numberMap>2 || numberChallenge>2){
                resultStory=`Pretty nice dude, you seem smart.
                Or you may have luck.
                Anyway you can play more to discover the ULTIMATE STORY.`;
            }else if(numberMap>0 || numberChallenge>0){
                resultStory=`You used your money pretty fast.
                You seem smart
                but ... play more`;
            }else{
                resultStory=`Something's wrong... play again.`;
            }
        }else{
            if((numberMap>4 && numberChallenge===0)||(numberMap===0 && numberChallenge>4)){
                resultStory=`You tried to win but you lost money.
                You did not discover more paths to make money.
                Play more around.`;
            }else if(numberMap>2 || numberChallenge>2){
                resultStory=`You need ... to study.`;
            }else if(numberMap>0 || numberChallenge>0){
                resultStory=`Play ... more`;
            }else{
                resultStory=`Something's wrong... play again.`;
            }
        }
        dispatch({type:actions.USE_MONEY});
        setResult(resultStory);
    }

    return(
        <Box margin='small' pad='small' alignContent="center">
            <Heading level={2}>Your money:</Heading>
            <List
                className="points"
                primaryKey="qty"
                secondaryKey="money"
                data={[
                    { qty: getDecimals(money), money: <Select
                        className="selectMoneyType"
                        options={['RON', 'EUR', 'USD']}
                        value={moneyType}
                        onChange={option => changeMoneyType(option.option)}
                        // disabledKey={option => option!=='RON'}
                        dropAlign={{top:"bottom"}}
                        dropHeight="xsmall"
                        icon={Money}
                      /> 
                    }
                ]}
            />
            {money!==0 && <Button onClick={resetMoney}>use money</Button>}
            {result && <Paragraph>{result}</Paragraph>}
        </Box>
    )
}

export default TabResult;