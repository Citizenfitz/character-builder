import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMarkdown from "./useMarkdown";

interface RenderSpellProps {
  name: string;
  school: string[] | null;
  cast: string;
  components: string;
  duration: string;
  range: string;
  save: string;
  target: string;
  wizLvl: number;
  priestLvl: number;
}

const ALL_SCHOOLS = ["black", "blue", "green", "red", "white"] as const;
type SchoolColor = (typeof ALL_SCHOOLS)[number];

const parseSchools = (schools: string[] | null): string => {
  if (!schools) return "n/a";
  if (schools.length === ALL_SCHOOLS.length) return "All";
  return schools.join(", ");
};

const RenderSpell = ({
  name,
  school,
  cast,
  components,
  duration,
  range,
  save,
  target,
  wizLvl,
  priestLvl,
}: RenderSpellProps) => {
  const post = useMarkdown("spell", name);

  return (
    <div className="desc desc--spell">
      <h2>
        {name}
        {ALL_SCHOOLS.map((color: SchoolColor) =>
          school?.includes(color) ? (
            <span
              key={color}
              className={`fas fa-spell-dot fa-spell-dot--${color}`}
            />
          ) : (
            <span key={color} />
          ),
        )}
      </h2>
      <ul className="desc__list desc__list--spell">
        <li>
          <span className="ut-font-bold">Casting:</span> {cast}
        </li>
        <li>
          <span className="ut-font-bold">School:</span>{" "}
          <span className="ut-captialize">{parseSchools(school)}</span>
        </li>
        <li>
          <span className="ut-font-bold">Components:</span> {components}
        </li>
        <li>
          <span className="ut-font-bold">Duration:</span> {duration}
        </li>
        <li>
          <span className="ut-font-bold">Range:</span> {range}
        </li>
        <li>
          <span className="ut-font-bold">Save:</span> {save}
        </li>
        <li>
          <span className="ut-font-bold">Level: </span>
          {wizLvl > 0 && (
            <span className="ut-color-wizard">Wizard {wizLvl}</span>
          )}
          {wizLvl > 0 && priestLvl > 0 && (
            <span className="ut-color-gray"> / </span>
          )}
          {priestLvl > 0 && (
            <span className="ut-color-priest">Priest {priestLvl}</span>
          )}
        </li>
        <li>
          <span className="ut-font-bold">Target:</span> {target}
        </li>
      </ul>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      <a href="#main" className="back-to-top">
        <span className="fas fa-triangle-up"></span> Back to Top
      </a>
    </div>
  );
};

export default RenderSpell;
