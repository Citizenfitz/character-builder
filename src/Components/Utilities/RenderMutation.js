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
    <div className="desc desc--mutation">
      <h2>{props.name}</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      <a href="#main" className="back-to-top">
        <span className="fas fa-triangle-up"></span> Back to Top
      </a>
    </div>
  );
};

export default RenderMutation;
