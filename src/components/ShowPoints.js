import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const ShowPoints = props => {
    return(
        <Snackbar open={props.showPoints} 
            autoHideDuration={1000} 
            transitionDuration={100}
            onClose={props.onClose}
        >
            <Alert severity={props.alertStyle}>
                Points: {props.points}
            </Alert>
        </Snackbar>
    )
}

export default ShowPoints;