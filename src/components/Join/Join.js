import { useParams } from 'react-router-dom';
import CreateNewGame from './CreateNewGame';
const socket = require('../connections/socket').socket



const Join = (props) =>{

//const { gameid } = useParams()
//JoinGameRoom(gameid)
    return (
        <div className="JoinOuterContainer">
            <div className="JoinInnerContainer">
                <h1 className="heading">Create</h1>
                <div>             
                <CreateNewGame />
                </div>
            </div>
        </div>
    )
}


export default Join;