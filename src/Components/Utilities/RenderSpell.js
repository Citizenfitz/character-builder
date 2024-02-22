import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RenderSpell = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    let markdownFile = "spell-" + props.name + ".md";
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

  /**
   *
   * @param {string[] | null} schools
   * @returns
   */
  const parseSchools = (schools) => {
    if (!schools) {
      return "n/a";
    }
    const allSchools = ["black", "blue", "green", "red", "white"];
    if (schools.length === allSchools.length) {
      return "All";
    }
    return schools.join(", ");
  };

  return (
    <div className="desc desc--spell">
      <h2>
        {props.name}
        {props.school && props.school.includes("black") ? (
          <span className="fas fa-spell-dot fa-spell-dot--black"></span>
        ) : (
          <span></span>
        )}
        {props.school && props.school.includes("blue") ? (
          <span className="fas fa-spell-dot fa-spell-dot--blue"></span>
        ) : (
          <span></span>
        )}
        {props.school && props.school.includes("green") ? (
          <span className="fas fa-spell-dot fa-spell-dot--green"></span>
        ) : (
          <span></span>
        )}
        {props.school && props.school.includes("red") ? (
          <span className="fas fa-spell-dot fa-spell-dot--red"></span>
        ) : (
          <span></span>
        )}
        {props.school && props.school.includes("white") ? (
          <span className="fas fa-spell-dot fa-spell-dot--white"></span>
        ) : (
          <span></span>
        )}
      </h2>
      <ul className="desc__list desc__list--spell">
        <li>
          <span className="ut-font-bold">Casting:</span> {props.cast}
        </li>
        <li>
          <span className="ut-font-bold">School:</span>{" "}
          <span className="ut-captialize"> {parseSchools(props.school)}</span>
        </li>
        <li>
          <span className="ut-font-bold">Components:</span> {props.components}
        </li>
        <li>
          <span className="ut-font-bold">Duration:</span> {props.duration}
        </li>
        <li>
          <span className="ut-font-bold">Range:</span> {props.range}
        </li>
        <li>
          <span className="ut-font-bold">Save:</span> {props.save}
        </li>
        <li>
          {props.wizLvl && props.wizLvl > 0 ? (
            <span className="ut-color-wizard">W{props.wizLvl}</span>
          ) : null}
          {props.priestLvl &&
          props.priestLvl > 0 &&
          props.wizLvl &&
          props.wizLvl > 0 ? (
            <span className="ut-color-gray"> / </span>
          ) : null}
          {props.priestLvl && props.priestLvl > 0 ? (
            <span className="ut-color-priest"> P{props.priestLvl}</span>
          ) : null}
        </li>
        <li>
          <span className="ut-font-bold">Target:</span> {props.target}
        </li>
      </ul>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
    </div>
  );
};

export default RenderSpell;
