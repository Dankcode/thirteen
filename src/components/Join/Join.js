import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="JoinOuterContainer">
            <div className="JoinInnerContainer">
                <h1 className="heading">Create</h1>
                <div><input placeholder="Room Name" className="joinInput" type="text" onchange={(event) => setName(event.target.value)}></input>
                
                </div>
                
            <button className="button" type="submit">Generate Link</button>
            
            </div>
        </div>
    )
};

export default Join;