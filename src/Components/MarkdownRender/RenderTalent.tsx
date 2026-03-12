import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMarkdown from "./useMarkdown";

interface RenderTalentProps {
  name: string;
  aspect: string;
}

const RenderTalent = ({ name, aspect }: RenderTalentProps) => {
  const post = useMarkdown("talent", name);

  return (
    <div className="desc desc--talent">
      <h3 className="desc__header">{name}</h3>
      <div className="desc-talent__wrapper">
        <div>
          <div className="desc__markdown">
            <span className="desc__list-label">Type:</span>{" "}
            <strong className={`ut-captialize ut-color-${aspect}`}>
              {aspect}
            </strong>
            <span className={`icon-aspect icon-aspect--${aspect}`}></span>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderTalent;
