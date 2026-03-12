import { useState, useEffect } from "react";

const useMarkdown = (prefix: string, name: string): string => {
  const [post, setPost] = useState<string>("");

  useEffect(() => {
    if (!name) return;

    const markdownFile = `${prefix}-${name
      .replace(/\s+/g, "-")
      .toLowerCase()}.md`;

    if (process.env.NODE_ENV === "production") {
      const markdownUrl = `${window.questRexData.pluginUrl}assets/markdown/${markdownFile}`;
      fetch(markdownUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `Failed to fetch ${markdownUrl}: ${res.statusText}`,
            );
          }
          return res.text();
        })
        .then((text) => setPost(text))
        .catch((err) => console.error("Error fetching markdown:", err));
    } else {
      import(`../../markdown/${markdownFile}`)
        .then((res) => fetch(res.default))
        .then((res) => res.text())
        .then((text) => setPost(text))
        .catch((err) => console.error("Error loading markdown:", err));
    }
  }, [prefix, name]);

  return post;
};

export default useMarkdown;
