import React from "react";
import { Box,List,Select } from "grommet";
import { useSelector,useDispatch } from "react-redux";
import "./TabResult.css";
import { Money } from "grommet-icons";
import { getCurrencyVal } from "../data/actions";

const TabResult = () => {
    const money=useSelector(state=>state.money);
    const moneyType=useSelector(state=>state.currencyType);
    const dispatch=useDispatch();
    
    const changeMoneyType = moneyType => {
        if(moneyType==="RON") {
            dispatch(getCurrencyVal("USD_RON"));
        }else if(moneyType==="USD"){
            dispatch(getCurrencyVal("USD_USD"));
        }else if(moneyType==="EUR"){
            dispatch(getCurrencyVal("USD_EUR"));
        }
    }

    const getDecimals = num => num % 1 === 0? num:num.toFixed(2);

    return(
        <Box margin='small' pad='small' alignContent="center">
            <h2>Your money:</h2>
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
        </Box>
    )
}

export default TabResult;