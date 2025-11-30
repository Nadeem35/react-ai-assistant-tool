import React from "react";

const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history"));
    console.log(history);
    history = history.filter((item) => {
      if (item != selectedItem) {
        return item;
      }
    });
    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
    // console.log(history);
  };

  return (
    <>
      <div className="col-span-1 bg-slate-200 dark:bg-zinc-800 h-screen pt-3 text-gray-800 dark:text-gray-200 overflow-x-scroll">
        <h1 className="font-bold text-xl mx-auto w-fit flex justify-center">
          <span>Recent Search</span>
          <button onClick={clearHistory}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
              className="mt-1 mx-1 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-red-400 fill-current"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left mt-3">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <div className="flex justify-between pr-3 hover:bg-gray-300 dark:hover:bg-zinc-900">
                <li
                  key={index}
                  onClick={() => setSelectedHistory(item)}
                  className="w-full p-1 pl-5 truncate text-gray-700 dark:text-gray-200 cursor-pointer hover:text-zinc-700 dark:hover:hover:text-zinc-300"
                >
                  {item}
                </li>
                <button onClick={() => clearSelectedHistory(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#e3e3e3"
                    className="mt-1 mx-1 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-red-400 fill-current"
                  >
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                  </svg>
                </button>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecentSearch;
