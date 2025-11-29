import { useEffect, useRef, useState } from "react";
import { URL } from "./constants";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      // make 'false' if field is empty
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = history.slice(0, 10);
        history = [question, ...history];
        history = history.map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1).trim()
        ); // ---- use to convert every word[0] in capital and remove extra space using trim
        history = [...new Set(history)]; //------ use to remove same duplicate questions ---------
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payloadData = question ? question : selectedHistory;
    const payload = {
      contents: [{ parts: [{ text: payloadData }] }],
    };

    setLoader(true);
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

    // --- jump to new scroll Answer --
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  const onEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    if (selectedHistory) {
      askQuestion(selectedHistory);
    }
  }, [selectedHistory]);

  /*____________  Dark Mode   ____________*/
  const [darkMode, setdarkMode] = useState("dark");
  // console.log(darkMode);
  useEffect(() => {
    if (darkMode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className={darkMode == "dark" ? "dark" : "light"}>
        <div className="grid grid-cols-5  text-center">
          <select
            onChange={(event) => setdarkMode(event.target.value)}
            className="fixed text-white bottom-10 p-2"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <RecentSearch
            recentHistory={recentHistory}
            setRecentHistory={setRecentHistory}
            setSelectedHistory={setSelectedHistory}
          />

          <div className="col-span-4 flex flex-col h-screen p-5">
            <h1 className="pb-2 inline-block bg-gradient-to-r from-pink-700 to-violet-700 bg-clip-text text-3xl text-transparent">
              Hi User, Ask me Anything
            </h1>
            {/* Scrollable chat area */}
            {loader ? (
              // ---------- Loader - 1 ---------
              <div className="flex flex-row gap-2 justify-center mt-2">
                <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-4 h-4 rounded-full bg-zinc-100 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:.7s]"></div>
              </div>
            ) : null}

            {/* --------------- */}

            <div
              ref={scrollToAns}
              className="container grow overflow-y-scroll mb-3"
            >
              <div className="text-zinc-300 text-left p-1">
                <ul>
                  {result.map((item, index) => (
                    <QuestionAnswer key={index} item={item} index={index} />
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="bg-gray-300 dark:bg-zinc-800 w-1/2 p-4 pr-5 text-zinc-500 m-auto justify-between rounded-4xl 
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
                className="border-amber-50 rounded-full justify-center dark:hover:bg-zinc-700 hover:bg-zinc-500 text-white cursor-pointer px-4"
              >
                {/* Ask */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                  className=" text-zinc-500 dark:bg-zinc-800 fill-current"
                >
                  <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
