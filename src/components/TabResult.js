import React from "react";
import { Heading, Box, List, Select, Button, Paragraph } from "grommet";
import { useSelector, useDispatch } from "react-redux";
import "./TabResult.css";
import { Money } from "grommet-icons";
import { getCurrencyVal, USE_MONEY } from "../data/actions";
import { getResult } from "../data/utils";

const TabResult = () => {
  const money = useSelector(state => state.money);
  const moneyType = useSelector(state => state.currencyType);
  const pointsType = useSelector(state => state.pointsType);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState();

  const changeMoneyType = moneyType => {
    if (moneyType === "RON") {
      dispatch(getCurrencyVal("USD_RON"));
    } else if (moneyType === "USD") {
      dispatch(getCurrencyVal("USD_USD"));
    } else if (moneyType === "EUR") {
      dispatch(getCurrencyVal("USD_EUR"));
    }
  };

  const getDecimals = num => (num % 1 === 0 ? num : num.toFixed(2));

  const resetMoney = () => {
    const numberMap = pointsType.filter(type => type === "map").length;
    const numberChallenge = pointsType.filter(type => type === "challenge").length;
    dispatch({ type: USE_MONEY });
    setResult(getResult(money, numberMap, numberChallenge));
  };

  return (
    <Box margin="small" pad="small" alignContent="center">
      <Heading level={2}>Your money:</Heading>
      <List
        className="points"
        primaryKey="qty"
        secondaryKey="money"
        data={[
          {
            qty: getDecimals(money),
            money: (
              <Select
                className="selectMoneyType"
                options={["RON", "EUR", "USD"]}
                value={moneyType}
                onChange={option => changeMoneyType(option.option)}
                // disabledKey={option => option!=='RON'}
                dropAlign={{ top: "bottom" }}
                dropHeight="xsmall"
                icon={Money}
              />
            )
          }
        ]}
      />
      {money !== 0 && <Button onClick={resetMoney}>use money</Button>}
      {result && <Paragraph>{result}</Paragraph>}
    </Box>
  );
};

export default TabResult;
