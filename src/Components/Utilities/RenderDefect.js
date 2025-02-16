import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderDefect = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    let markdownFile = "defect-" + props.name + ".md";
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
    <div className="desc desc--defect">
      <h3 className="desc__header desc__header--defect">{props.name}</h3>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
    </div>
  );
};

export default RenderDefect;
