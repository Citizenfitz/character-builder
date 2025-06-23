import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderDisad = ({ name, description, bonus }) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    if (name) {
      let markdownFile = `disad-${name.replace(/\s+/g, "-").toLowerCase()}.md`;
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
    }
  }, [name]);

  return (
    <div className="desc desc--disad">
      <h3 className="desc__header">{name}</h3>
      <div className="desc__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderDisad;
