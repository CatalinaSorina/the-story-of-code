import React from "react";
import {Tab, Tabs} from "grommet";
import TabMap from "./TabMap";

const Main = () => {
    return (
        <Tabs height='medium' flex='grow' alignSelf='center'>
            <Tab title="Map"><TabMap /></Tab>
            <Tab title='Challenge'></Tab>   
            <Tab title='You'></Tab>
        </Tabs>
    )
}

export default Main;