import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import CreateNewGame from './CreateNewGame';


class Join extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
        buttonPress: false
    };


}
/*
buttonPress = () => {
    this.setState({
        buttonPress: true
    })
}
*/
render(){
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
};

export default Join;