import user from "./user-modified.png";
import bot from "./ai-bot-modified.png";

function Chat(props){
    var flexDirection, justifyFlex;
    props.chat === "bot" ? flexDirection = "flex-row" : flexDirection = "flex-row-reverse";
    props.chat === "bot" ? justifyFlex = "justify-start" : justifyFlex = "justify-end";
    return(
        <div className={`flex ${justifyFlex} mb-2`}>
            <div className={`flex ${flexDirection} w-fit py-1 px-3 m-3 rounded-2xl bg-white dark:bg-[#635985]`}>
                <img src={props.chat==="user" ? user : bot} className="h-12 w-12" alt="pfp" />
                <p className="dark:text-white text-black place-self-center mx-3">{props.message}</p>
            </div>
        </div>
    )
}
export default Chat;