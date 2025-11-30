import { useEffect, useState } from "react";
import { CheckHeading, replaceHeadingStars } from "./Helper";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Answers = ({ ans, index, totalResult, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (CheckHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, [ans]);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={dark}
          PreTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {/* {ans} */}
      {index == 0 && totalResult > 1 ? (
        <span className="pt-5 text-xl block text-white font-bold">
          {answer}
        </span>
      ) : heading ? (
        <span className="pt-3 text-lg block font-bold">{answer}</span>
      ) : (
        <span className={type == "q" ? "pl-1" : "pl-5"}>
          {<ReactMarkdown components={renderer}>{answer}</ReactMarkdown>}
        </span>
      )}
    </>
  );
};
export default Answers;
