import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderMutation = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    let markdownFile = "mutation-" + props.name + ".md";
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
    <div className="attributes">
      <h2>{props.name}</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
    </div>
  );
};

export default RenderMutation;
