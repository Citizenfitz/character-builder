import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMarkdown from "./useMarkdown";

interface RenderMutationProps {
  name: string;
}

const RenderMutation = ({ name }: RenderMutationProps) => {
  const post = useMarkdown("mutation", name);

  return (
    <div className="desc desc--mutation">
      <h3 className="desc__header desc__header--mutation">{name}</h3>
      <div className="desc__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderMutation;
