import { useState } from "react";
import Chat from "./Chat";

function App() {
  const [dark, setDark] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [chat, setChat] = useState([
    {
      chat: "bot",
      message: "Hello how may I assist you today?"
    }
  ])
  const apiKey = "Bearer " + process.env.REACT_APP_API_KEY;
  async function getPrompt(e){
    e.preventDefault();
    const message = prompt;
    setPrompt("");
    setChat([...chat,
      {
        chat: "user",
        message: message,
      }]);
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          apiKey,
      },
      body: JSON.stringify({
        model: "text-curie-001",
        prompt: message,
        max_tokens: 30,
        temperature: 0.2,
        top_p: 1,
        stop: '.',
        n: 1,
        stream: false,
        logprobs: null,
      }),
    });
    const data = await response.json();
    setChat([...chat,
      {
        chat: "user",
        message: message,
      },
      {
        chat: "bot",
        message: data.choices[0].text
      }
    ])
  }
  function clearChat(){
    setChat([]);
    setPrompt("");
  }
  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex">
          {/* Sidebar */}
          <div className="relative h-[100vh] dark:text-white text-black bg-[#66BFBF] dark:bg-[#18122B] w-[15%] p-2">
              <button className="text-black border-black dark:text-white dark:border-white border-[1px] rounded-lg w-full p-3 hover:text-black hover:bg-white transition-all ease-in-out duration-150 font-medium" onClick={clearChat}>
                Clear Chat
              </button>
              <button className="text-black border-black dark:text-white dark:border-white border-[1px] rounded-lg w-full p-3 hover:text-black hover:bg-white transition-all ease-in-out duration-150 mt-3 font-medium" onClick={()=> setDark(!dark)}>
                Toggle Dark Mode
              </button>
              <p className="absolute bottom-2 left-0 right-0 text-center text-xs dark:text-white text-black">
                Made with ❤️ by Muthu Aanand</p>
          </div>
          {/* Chat Log */}
          <div className="relative h-[100vh] dark:bg-[#443C68] bg-[#c6eeee] w-full">
              <div className="overflow-y-scroll scroll-smooth h-[95vh]">
                  {chat.map((item) => {
                    return <Chat chat={item.chat} message={item.message} />
                  })}
              </div>
              <form  spellCheck="false" className="flex absolute bottom-0 left-0 right-0" onSubmit={getPrompt}>
                  <input className="w-[95%] p-3 dark:text-white text-black outline-none dark:bg-[#51477c] bg-slate-200" value={prompt} type="text" onChange={(e)=>setPrompt(e.target.value)} />
                  <button className="w-[5%] p-3 border-l-2 border-black dark:border-slate-200 dark:text-white dark:bg-[#51477c] bg-slate-200">Ask</button>
              </form>
          </div>
      </div>
    </div>
  );
}

export default App;
