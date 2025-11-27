import { useEffect, useState } from "react";
import { CheckHeading, replaceHeadingStars } from "./Helper";

const Answers = ({ ans, index, totalResult, type }) => {
  // console.log(ans, key);
  const [heahing, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  // console.log(index);

  useEffect(() => {
    if (CheckHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, [ans]);

  return (
    <>
      {/* {ans} */}
      {index == 0 && totalResult > 1 ? (
        <span className="pt-5 text-xl block text-white font-bold">
          {answer}
        </span>
      ) : heahing ? (
        <span className="pt-3 text-lg block font-bold">{answer}</span>
      ) : (
        <span className={type == "q" ? "pl-1" : "pl-5"}>{answer}</span>
      )}
    </>
  );
};
export default Answers;
