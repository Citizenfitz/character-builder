import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderSpell = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    let markdownFile = "spell-" + props.name + ".md";
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
    <div className="desc desc--spell">
      <h2>{props.name} </h2>
      <ul className="desc__list desc__list--spell">
        <li>
          <span className="ut-font-bold">Casting:</span> {props.cast}
        </li>
        <li>
          <span className="ut-font-bold">School:</span> schools
        </li>
        <li>
          <span className="ut-font-bold">Components:</span> {props.components}
        </li>
        <li>
          <span className="ut-font-bold">Duration:</span> {props.duration}
        </li>
        <li>
          <span className="ut-font-bold">Range:</span> {props.range}
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

export default RenderSpell;
