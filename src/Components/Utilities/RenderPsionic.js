import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderPsionic = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    let markdownFile = "psionic-" + props.name + ".md";
    markdownFile = markdownFile.replace(/\s+/g, "-").toLowerCase();
    import(`../../markdown/${markdownFile}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="desc desc--psionic">
      <h2 id={props.id}>{props.name}</h2>
      <ul className="desc__list desc__list--psionic">
        <li>
          <span className="ut-font-bold">PSP:</span> {props.psp}
        </li>
        <li>
          <span className="ut-font-bold">Initiate:</span> {props.initiate}
        </li>
        <li>
          <span className="ut-font-bold">Discipline:</span> {props.discipline}
        </li>
        <li>
          <span className="ut-font-bold">Duration:</span> {props.duration}
        </li>
        <li>
          <span className="ut-font-bold">Range:</span> {props.range}
        </li>
        <li>
          <span className="ut-font-bold">Visibility:</span> {props.visibility}
        </li>
        <li>
          <span className="ut-font-bold">Save:</span> {props.save}
        </li>
        <li>
          <span className="ut-font-bold">Target:</span> {props.target}
        </li>
      </ul>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
    </div>
  );
};

export default RenderPsionic;
