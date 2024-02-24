import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderTalent = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    let markdownFile = "talent-" + props.name + ".md";
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
    <div className="desc desc--talent">
      <h2>
        {props.name}{" "}
        <div className={`aspect-icon aspect-icon--${props.aspect}`}></div>
      </h2>
      <ul className="desc__list desc__list--talent">
        <li>
          <span className="ut-font-bold">Type:</span> {props.aspect}
        </li>
        <li>
          <span className="ut-font-bold">Modifier:</span> {props.mod}
        </li>
        <li>
          <span className="ut-font-bold">Bonus:</span> {props.bonus}
        </li>
        <li>
          <span className="ut-font-bold">Prerequisite:</span> {props.preq}
        </li>
      </ul>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
    </div>
  );
};

export default RenderTalent;
