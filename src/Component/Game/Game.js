import "./Game.css"
import logo from "../../assets/images/logo.svg"
import {useState, useEffect} from "react";
import Rules from "../UI/Rules";

const Game = () => {
    const [rulesIsShown, setRulesIsShown] = useState(false)
    const [state, setState] = useState({
        user: "",
        computer: "",
        key: 0,
        winner: "",
        score:12
    })
    const whatBeatsWhat = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper",
    }
    let result;
    const userHandler = (val) => {
        setState({...state, user: val})
        const computerChoices = Object.keys(whatBeatsWhat)
        let randomizeChoice = Math.floor(Math.random() * 3)
        setTimeout(() => {
            setState({...state, user: val, computer: computerChoices[randomizeChoice], key: randomizeChoice})
        }, 500)

    }
    const resumeHandler = () => {
        setState({...state,winner: "", user: "", computer: "", key: 0})
    }
    useEffect(() => {
        if (state.user && state.computer) {
            if (state.user === state.computer) {
            } else {
                if (Object.values(whatBeatsWhat)[state.key - 1] === state.user) {
                    setState((pre)=>{return{...state,score:pre.score+1,winner: "user"}})
                    // setState({...state,score: , winner: "user"})
                } else {
                    setState((pre)=>{return{...state,score:pre.score-1,winner: "computer"}})
                }
            }
        }
    }, [state.computer])
    if (state.user && state.computer) {
        if (state.user === state.computer) {
            result = <div>It is a tie</div>
        } else {
            if (Object.values(whatBeatsWhat)[state.key - 1] === state.user) {
                result = <div>you won</div>
            } else {
                result = <div>you lost</div>
            }
        }
    }

    let rules;
    if (rulesIsShown) {
        rules = <Rules setRule={setRulesIsShown}/>
    }
    let items;
    if (state.user === "" && state.computer === "") {
        items = <div className="sign">
            <button onClick={() => {
                userHandler("paper")
            }} className={"paper btn"}>
                <div/>
            </button>
            <button onClick={() => {
                userHandler("scissors")
            }} className={"scissors btn"}>
                <div/>
            </button>
            <button onClick={() => {
                userHandler("rock")
            }} className={"rock btn"}>
                <div/>
            </button>
        </div>
    }
    if (state.user) {
        items =
            <div className={state.computer ? "on user" : "off user"}>
                <div className={"up"}>
                    <div>
                        You Picked
                    </div>
                    <div>
                        The House Picked
                    </div>
                </div>
                <div className={"down"}>
                    <button id={state.winner === "user" ? "winner" : ""} className={"chosen-" + state.user + " btn"}>
                        <div>
                            <p className={"wave one"}>
                                <p className={"wave two"}>
                                    <p className={"wave tree"}/>
                                </p>
                            </p>
                        </div>
                    </button>
                    <div className={"result uppercase white-color"} style={state.computer ? {
                        transform: " translateY(0)",
                        opacity: "1"
                    } : {transform: " translateY(-100%)", opacity: "0"}}>
                        {result}
                        <button onClick={() => {
                            resumeHandler()
                        }} className={"uppercase "}>
                            play again
                        </button>
                    </div>
                    {state.computer ?
                        <button id={state.winner === "computer" ? "winner" : ""}
                                className={"chosen-" + state.computer + " btn"}>
                            <div>
                                <p className={"wave one"}>
                                    <p className={"wave two"}>
                                        <p className={"wave tree"}/>
                                    </p>
                                </p>
                            </div>
                        </button> :
                        <div className={"null"}/>}
                </div>
            </div>
    }
    return (
        <div className={"container"}>
            {rules}
            <div className="Board-container grid">
                <div className="score flex">
                    <img src={logo} alt=""/>
                    <div className="sc white-bg">
                        <p>score</p>
                        <div>{state.score}</div>
                    </div>
                </div>
                {items}
            </div>
            <button onClick={() => {
                setRulesIsShown(true)
            }} className="rules uppercase white-color">
                rules
            </button>
        </div>
    );
}

export default Game;