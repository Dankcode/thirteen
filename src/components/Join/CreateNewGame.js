import React from 'react';
import { Redirect, redirect } from 'react-router-dom';
const { v4: uuIdV4 } = require('uuid')

//UUID is now wroking, need to make it popup and dissapear

let socket;


class CreateNewGame extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
        buttonPress: false,
        gameId: ''
    };

}

    Linkgen = () => {

    const newGameRoomId = uuIdV4();
    
    this.setState({
        gameId: newGameRoomId
    })
   /* socket.emit('createNewGame', newGameRoomId)
    */

    };
    
   buttonPress = () => {
    this.setState({
        buttonPress: true
    })
}

    render() {
        return(
            <div>
                
                <h1>{"/game/" + this.state.gameId}</h1>
                <input placeholder = {"/game/" + this.state.gameId}></input>
                <button className="button" type="submit"  onClick = {this.Linkgen}>Generate Link</button>
                
            </div>
        )
    }
};

export default CreateNewGame