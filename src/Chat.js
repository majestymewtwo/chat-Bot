import user from "./user-modified.png";
import bot from "./ai-bot-modified.png";

function Chat(props){
    var bg;
    if(props.chat === "user")
        bg="bg-[#635985]"
    else
        bg="";
    return(
        <div className={`flex flex-row space-x-4 p-3 ${bg}`}>
            <img src={props.chat==="user" ? user : bot} className="h-14 w-14" alt="pfp" />
            <p className="text-white place-self-center">{props.message}</p>
        </div>
    )
}
export default Chat;