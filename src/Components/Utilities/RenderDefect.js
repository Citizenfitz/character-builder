import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderDefect = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    if (props.name) {
      const markdownFile = `defect-${props.name
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
    <div className="desc desc--defect">
      <h3 className="desc__header desc__header--defect">{props.name}</h3>
      <div className="desc__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderDefect;
