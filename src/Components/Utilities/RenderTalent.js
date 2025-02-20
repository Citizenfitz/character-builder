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
      <h3 className="desc__header">{props.name}</h3>
      <div className="desc-talent__wrapper">
        <div>
          <ul className="desc__list desc__list--talent">
            <li>
              <span className="desc__list-label">Type:</span>{" "}
              <strong className={`ut-captialize ut-color-${props.aspect}`}>
                {props.aspect}
              </strong>
              <div className={`aspect-icon aspect-icon--${props.aspect}`}></div>
            </li>
            <li>
              <span className="desc__list-label">Mod:</span> {props.mod}
            </li>
            <li>
              <span className="desc__list-label">Bonus:</span> {props.bonus}
            </li>
            <li>
              <span className="desc__list-label">Prereq:</span> {props.preq}
            </li>
          </ul>

          <div className="desc-talent__markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
            <a href="#main" className="back-to-top">
              <span className="fas fa-triangle-up"></span> Back to Top
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderTalent;
