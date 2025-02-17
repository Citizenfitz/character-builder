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
      <h3 className="desc__header" id={props.id}>
        {props.name}
      </h3>
      <ul className="desc__list desc__list--psionic">
        <li>
          <span className="desc__list-label">PSP:</span> {props.psp}
        </li>
        <li>
          <span className="desc__list-label">Initiate:</span> {props.initiate}
        </li>
        <li>
          <span className="desc__list-label">Discipline:</span>{" "}
          {props.discipline}
        </li>
        <li>
          <span className="desc__list-label">Duration:</span> {props.duration}
        </li>
        <li>
          <span className="desc__list-label">Range:</span> {props.range}
        </li>
        <li>
          <span className="desc__list-label">Visibility:</span>{" "}
          {props.visibility}
        </li>
        <li>
          <span className="desc__list-label">Save:</span> {props.save}
        </li>
        <li>
          <span className="desc__list-label">Target:</span> {props.target}
        </li>
      </ul>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      <a href="#main" className="back-to-top">
        <span className="fas fa-triangle-up"></span> Back to Top
      </a>
    </div>
  );
};

export default RenderPsionic;
