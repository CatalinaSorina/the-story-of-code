import React from "react";
import {WorldMap, Box, Tab, Tabs} from "grommet";

const Main = props => {
    return (
        <Tabs height='medium' flex='grow' alignSelf='center'>
            <Tab title='Map'>
                <Box margin='small' pad='small'>
                    <WorldMap
                        color="lightgreen"
                        continents={[
                            {
                            name: 'Europe',
                            color: 'orange',
                            onClick: (name) => {},
                            },
                        ]}
                        onSelectPlace={(lat, lon) => {}}
                        places={[
                            {
                                name: 'Romania',
                                location: [45.648886, 25.593741],
                                color: 'red',
                                onClick: (name) => {},
                            },{
                                name: 'Switzerland',
                                location: [46.198787, 6.141170],
                                color: 'pink',
                                onClick: (name) => {},
                            },
                        ]}
                        selectColor="blue"
                    />
                </Box>
            </Tab>
            <Tab title='Tab 2'>
                <Box margin='small' pad='small'>
                </Box>
            </Tab>   
            <Tab title='Tab 3'>
                <Box
                    flex='grow'
                    margin='small'
                    pad='small'
                >
                </Box>
            </Tab>
        </Tabs>
    )
}

export default Main;