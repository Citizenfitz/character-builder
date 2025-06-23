import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderPsionic = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    if (props.name) {
      const markdownFile = `psionic-${props.name
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
      <div className="desc__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderPsionic;
