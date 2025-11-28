import { useEffect, useState } from "react";
import { URL } from "./constants";
import Answers from "./components/Answers";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");

  // const payload = {
  //   contents: [{ parts: [{ text: question }] }],
  // };

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      // make 'false' if field is empty
      return false;
    }

    const payloadData = question ? question : selectedHistory;
    const payload = {
      contents: [{ parts: [{ text: payloadData }] }],
    };

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory;
        [question];
      }
    }

    let response = await fetch(URL, {
      method: "POST", // here is the post type API
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion(""); // use to 'input field empty' after press enter key
  };

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const onEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    console.log(selectedHistory);
  }, [selectedHistory]);

  return (
    <>
      <div className="grid grid-cols-5  text-center">
        <div className="col-span-1 bg-zinc-800 h-screen pt-3 text-white overflow-x-scroll">
          <h1 className="bg-zinc-800 text-xl mx-auto text-white w-fit flex justify-center">
            <span>Recent History</span>
            <button onClick={clearHistory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#e3e3e3"
                className="mt-1 mx-1 cursor-pointer"
              >
                <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
              </svg>
            </button>
          </h1>
          <ul className="text-left mt-3">
            {recentHistory &&
              recentHistory.map((item) => (
                <li
                  onClick={() => setSelectedHistory(item)}
                  className="p-1 pl-8 truncate text-zink-400 text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200"
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>

        {/* <div className="col-span-4 flex-col h-full p-10"> */}
        {/* <div className="container mb-10 flex-grow overflow-y-scroll "> */}
        <div className="col-span-4 flex flex-col h-screen p-10">
          {/* Scrollable chat area */}
          <div className="container grow overflow-y-scroll mb-10">
            <div className="text-zinc-300 text-left p-1">
              <ul>
                {result.map((item, index) => (
                  <div
                    key={index + Math.random()}
                    className={item.type == "q" ? "flex justify-end" : ""}
                  >
                    {item.type == "q" ? (
                      <li
                        key={index + Math.random()}
                        className="text-right px-2 my-7  bg-zinc-700 w-fit border-zinc-700 border-6 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl"
                      >
                        <Answers
                          ans={item.text}
                          index={index}
                          totalResult={1}
                          type={item.type}
                        />
                      </li>
                    ) : (
                      item.text.map((ansItem, ansIndex) => (
                        <li
                          key={ansIndex + Math.random()}
                          className="text-left p-1"
                        >
                          <Answers
                            ans={ansItem}
                            index={ansIndex}
                            totalResult={item.length}
                            type={item.type}
                          />
                        </li>
                      ))
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="bg-zinc-800 w-1/2 p-4 pr-5 text-white m-auto justify-between rounded-4xl 
           border border-zinc-500 flex h-16"
          >
            <input
              type="text"
              className="w-full p-3 h-full outline-none"
              placeholder="Ask me anything..."
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={onEnter}
              value={question}
            />
            <button
              onClick={askQuestion}
              className="border-amber-50 border rounded-4xl justify-center bg-white text-black cursor-pointer pb-1 px-3"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
