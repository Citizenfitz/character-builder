import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMarkdown from "./useMarkdown";

interface RenderPsionicProps {
  id: string;
  name: string;
  psp: number;
  initiate: string;
  discipline: string;
  duration: string;
  range: string;
  visibility: string;
  save: string;
  target: string;
}

const RenderPsionic = ({
  id,
  name,
  psp,
  initiate,
  discipline,
  duration,
  range,
  visibility,
  save,
  target,
}: RenderPsionicProps) => {
  const post = useMarkdown("psionic", name);

  return (
    <div className="desc desc--psionic">
      <h3 className="desc__header" id={id}>
        {name}
      </h3>
      <ul className="desc__list desc__list--psionic">
        <li>
          <span className="desc__list-label">PSP:</span> {psp}
        </li>
        <li>
          <span className="desc__list-label">Initiate:</span> {initiate}
        </li>
        <li>
          <span className="desc__list-label">Discipline:</span> {discipline}
        </li>
        <li>
          <span className="desc__list-label">Duration:</span> {duration}
        </li>
        <li>
          <span className="desc__list-label">Range:</span> {range}
        </li>
        <li>
          <span className="desc__list-label">Visibility:</span> {visibility}
        </li>
        <li>
          <span className="desc__list-label">Save:</span> {save}
        </li>
        <li>
          <span className="desc__list-label">Target:</span> {target}
        </li>
      </ul>
      <div className="desc__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderPsionic;
