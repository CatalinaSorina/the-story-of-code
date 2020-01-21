import React from "react";
import {Tab, Tabs} from "grommet";
import TabMap from "./TabMap";
import TabChallenge from "./TabChallenge";
import TabResult from "./TabResult";

const Main = () => {
    return (
        <Tabs height='medium' flex='grow' alignSelf='center'>
            <Tab title="Map"><TabMap /></Tab>
            <Tab title='Challenge'><TabChallenge /></Tab>   
            <Tab title='You'><TabResult /></Tab>
        </Tabs>
    )
}

export default Main;