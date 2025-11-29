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

  return (
    <>
      <div className="col-span-1 bg-zinc-800 h-screen pt-3 text-white overflow-x-scroll">
        <h1 className="bg-zinc-800 text-xl mx-auto text-white w-fit flex justify-center">
          <span>Recent Search</span>
          <button onClick={clearHistory}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
              className="mt-1 mx-1 cursor-pointer text-white hover:text-red-400 fill-current"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left mt-3">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedHistory(item)}
                className="p-1 pl-5 truncate text-zink-400 text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecentSearch;
