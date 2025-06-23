import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderTalent = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    if (props.name) {
      const markdownFile = `talent-${props.name
        .replace(/\s+/g, "-")
        .toLowerCase()}.md`;

      if (process.env.NODE_ENV === "production") {
        const markdownUrl = `${window.questRexData.pluginUrl}assets/markdown/${markdownFile}`;
        fetch(markdownUrl)
          .then((res) => {
            if (!res.ok) {
              throw new Error(
                `Failed to fetch ${markdownUrl}: ${res.statusText}`
              );
            }
            return res.text();
          })
          .then((text) => setPost(text))
          .catch((err) => console.error("Error fetching markdown:", err));
      } else {
        import(`../../markdown/${markdownFile}`)
          .then((res) => {
            fetch(res.default)
              .then((res) => res.text())
              .then((res) => setPost(res))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    }
  }, [props.name]);

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
              <div className={`icon-aspect icon-aspect--${props.aspect}`}></div>
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

          <div className="desc__markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderTalent;
