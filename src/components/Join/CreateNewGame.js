import React from 'react';
import { Redirect, redirect } from 'react-router-dom';
const { v4: uuIdV4 } = require('uuid')
const socket = require('../connections/socket').socket


/*UUID is now wroking, need to make it popup and dissapear
CONTAINS THE BUTTON TO GEN LINK

========== NEED ROOM ADMIN==========
*/



class CreateNewGame extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
        buttonPress: false,
        gameId: ''
    };

}/*have a joined state vs spectating state
then state a playerId

PASS ID's and states to each person visiting

*/

    Linkgen = () => {

    const newGameRoomId = uuIdV4();
    
    this.setState({
        gameId: newGameRoomId,
        buttonPress: true
    })

   socket.emit('createNewGame', newGameRoomId, console.log(`ID is ${newGameRoomId}`))
    /* 
   GET THIS WORKING
    */

    };

    render() {
        return(<React.Fragment>
            {
                this.state.buttonPress ?
                <Redirect to = {"/game/" + this.state.gameId}></Redirect>
                :
            
            <div>
                <button className="button" type="submit"  onClick = {this.Linkgen}>Create Room</button>
                
                
            </div>
            }
            </React.Fragment>
        )
    }
    // USE CONTEXTS TO MAKE SURE EACH GAME ROOM KNOWS ITS ADMIN
};

export default CreateNewGame