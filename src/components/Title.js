import React from "react";
import {Box,Text} from "grommet";
import ReactTypingEffect from 'react-typing-effect';

const Title = ({title,bg,borderColor,textColor}) => {
    return (
        <Box pad='medium' background={bg} border={{ color: borderColor, size: 'medium' }} >
            <Text style={{display:"flex",justifyContent:"center", font:"inherit",color:textColor}}>{"<>"} <ReactTypingEffect style={{fontFamily:"'Vast Shadow', cursive",fontWeight:"normal"}} text={title} /> {"</>"}</Text>
        </Box> 
    )
}

export default Title;