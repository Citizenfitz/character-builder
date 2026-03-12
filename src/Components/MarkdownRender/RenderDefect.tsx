import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMarkdown from "./useMarkdown";

interface RenderDefectProps {
  name: string;
}

const RenderDefect = ({ name }: RenderDefectProps) => {
  const post = useMarkdown("defect", name);

  return (
    <div className="desc desc--defect">
      <h3 className="desc__header desc__header--defect">{name}</h3>
      <div className="desc__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderDefect;
