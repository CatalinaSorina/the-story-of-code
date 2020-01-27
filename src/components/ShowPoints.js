import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const ShowPoints = props => {
    return(
        <Snackbar open={props.showPoints} 
            autoHideDuration={1000} 
            transitionDuration={100}
            onClose={props.onClose}
        ><div>
            <Alert severity={props.alertStyle}>
                Points: {props.questionPoints}
            </Alert>
            <p>Score: {props.points}</p>
        </div></Snackbar>
    )
}

export default ShowPoints;