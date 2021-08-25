import CreateNewGame from './CreateNewGame';
import './Homepage.css';


const Join = (props) =>{

//const { gameid } = useParams()
//JoinGameRoom(gameid)
    return (
        <div className="JoinOuterContainer">

                <h1 className="heading">Thirteen Online</h1>

            
                <h2>Made with hours of playtesting</h2>
            <div className="JoinInnerContainer">    
                <div className='intro'>
                <h2>Click the button below to generate a room for you and your friends</h2>
                <h4>Creating a room will redirect you to the waiting room</h4>
                <div className ='create-button'>             
                <CreateNewGame/>
                </div>
                </div>
                <div className = 'disclaimer'>
                    <p>This website was made for you to play Thirteen with your friends.</p>
                    <p>You will need three associated individuals with working internet to play this version of Thirteen Online</p>
                    <p>What is <a href={'https://www.google.com/search?q=thirteen+card+game'}>"Thirteen?"</a></p>
                    <p>This website was made through the hard work of a self-taught coder 😛</p>
                </div>
                    <h2>Updates:</h2>
                    <textarea className = 'updates' defaultValue = 'This is the first launch form of Thirteen Online, so it is considered a Beta or 1.0'>
                        
                    </textarea>
                    <p className="home-link">Source code is available on <a href={'https://github.com/Dankcode/thirteen'}>Github</a></p>
                
            </div>
        </div>
    )
}


export default Join;