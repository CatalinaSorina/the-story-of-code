import React from "react";
import { Box,List,Select } from "grommet";
import {useSelector,useDispatch} from "react-redux";
import "./TabResult.css";

const TabResult = props => {
    const money=useSelector(state=>state.points);
    const [value, setValue] = React.useState('RON');

    return(
        <Box margin='small' pad='small' alignContent="center">
            <h2>Your money:</h2>
            <List
                className="points"
                primaryKey="qty"
                secondaryKey="money"
                data={[
                    { qty: money, money: <Select
                        className="selectMoneyType"
                        options={['RON', '$', '€']}
                        value={value}
                        onChange={({ option }) => setValue(option)}
                      /> 
                    }
                ]}
            />
        </Box>
    )
}

export default TabResult;