import React from 'react';
import { Redirect, redirect } from 'react-router-dom';
const { v4: uuIdV4 } = require('uuid')

//UUID not working, everything else is gucci

let socket;


class CreateNewGame extends React.Component {
    state = {
        gameId: ""
    }
//not sure
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    send = () => {

    const newGameRoomId = uuIdV4()
    
    this.setState({
        gameId: newGameRoomId
    })
    socket.emit('createNewGame', newGameRoomId)
    
    };

    render() {
        return(
            <div>
                <input placeholder = {"/game/" + this.state.gameId}></input>
                
            </div>
        )
    }
};

export default CreateNewGame