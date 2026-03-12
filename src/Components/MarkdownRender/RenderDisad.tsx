import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMarkdown from "./useMarkdown";

interface RenderDisadProps {
  name: string;
}

const RenderDisad = ({ name }: RenderDisadProps) => {
  const post = useMarkdown("disad", name);

  return (
    <div className="desc desc--disad">
      <h3 className="desc__header">{name}</h3>
      <div className="desc__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderDisad;
