import React from 'react';
import { Redirect } from 'react-router-dom';
const { v4: uuIdV4 } = require('uuid')
const socket = require('../connections/socket').socket


//UUID is now wroking, need to make it popup and dissapear


class CreateNewGame extends React.Component {
    
    state = {
        buttonPress: false,
        gameId: ''
    };

    Linkgen = () => {

    const newGameRoomId = uuIdV4();
    
    this.setState({
        gameId: newGameRoomId,
        buttonPress: true
    })

   socket.emit('createNewGame', newGameRoomId)


    };

    render() {
        return(<React.Fragment>
            {
                this.state.buttonPress ?
                <Redirect to = {"/game/" + this.state.gameId}></Redirect>
                :
            
            <div>
                <button className="create-room" type="submit"  onClick = {this.Linkgen}>Create Room</button>
            </div>
            }
            </React.Fragment>
        )
    }
};

export default CreateNewGame