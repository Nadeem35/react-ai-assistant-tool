import { useState } from "react";
import AppPage from "./AppPage";
import { URL } from "./constants";
import Answers from "./components/Answers";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined);

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

    console.log(dataString);

    // console.log(response.candidates[0].content.parts[0].text);
    setResult(response.candidates[0].content.parts[0].text);
  };

  return (
    // <AppPage />
    <>
      <div className="grid grid-cols-5  text-center">
        <div className="col-span-1 bg-zinc-800 h-screen text-white">
          <h1>Recent History</h1>
          <p>Sidebar scroll</p>
        </div>

        <div className="col-span-4 p-10">
          <div className="container h-80 overflow-y-scroll ">
            <div className="text-white ">
              {result}
              {/* <ul>
                {result &&
                  result.map((item, index) => (
                    <li index={index}>
                      <Answers ans={item} />
                    </li>
                  ))}
              </ul> */}
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
            <button onClick={askQuestion} className="">
              Ask
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
