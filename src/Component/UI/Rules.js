import "./Rules.css"
import Rule from "../../assets/images/image-rules.svg"
const Rules = (props) => {
    return (
        <div className={"rules-container black-color"} >
            <div className={"rule white-bg"}>
                <div className="top flex">
                    <div className={"uppercase"}>rules</div>
                    <button onClick={()=>{props.setRule(false)}} className={"close"}/>
                </div>
                <img src={Rule} alt=""/>
            </div>
        </div>
    );
}

export default Rules;