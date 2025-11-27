import { useState } from "react";
import { URL } from "./constants";
import Answers from "./components/Answers";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);

  const payload = {
    contents: [{ parts: [{ text: question }] }],
  };

  const askQuestion = async () => {
    // console.log(question);
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
      { type: "q", text: question },
      { type: "a", text: dataString },
    ]);
    // setResult(response.candidates[0].content.parts[0].text);
  };

  // console.log(result);

  return (
    // <AppPage />
    <>
      <div className="grid grid-cols-5  text-center">
        <div className="col-span-1 bg-zinc-800 h-screen text-white">
          <h1>Recent History</h1>
          <p>Sidebar scroll</p>
        </div>

        <div className="col-span-4 p-10">
          <div className="container h-90 overflow-y-scroll ">
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
