import React from "react";
import Answers from "./Answers";

const QuestionAnswer = ({ item, index }) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type == "q" ? "flex justify-end" : ""}
      >
        {item.type == "q" ? (
          <li
            key={index + Math.random()}
            className="text-right px-2 my-7 bg-zinc-500 dark:bg-zinc-700 w-fit dark:border-zinc-700 border-zinc-500 border-6 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl"
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
              className="text-left text-zinc-500 p-1"
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
    </>
  );
};
export default QuestionAnswer;
