import React, { Fragment, useEffect, useState } from "react";
import { spellData } from "../../Data/";
import RenderSpell from "../Utilities/RenderSpell";

const filterMap = new Map([
  ["spellFilterAll", (arr) => arr.sort(spellAlphaSort)],
  ["spellFilterPriest", levelFilter("priestLvl")],
  ["spellFilterWizard", levelFilter("wizLvl")],
  ["spellFilterBlack", colorFilter("black")],
  ["spellFilterBlue", colorFilter("blue")],
  ["spellFilterGreen", colorFilter("green")],
  ["spellFilterRed", colorFilter("red")],
  ["spellFilterWhite", colorFilter("white")],
]);

const spells = Object.entries(spellData).map(([spellName, spell]) => ({
  ...spell,
  ...{ name: spellName },
}));
const filterConfig = [
  {
    filterType: "spellFilterAll",
    label: "All Spells Alphabetically",
  },
  {
    filterType: "spellFilterPriest",
    label: "Priest Spells by Level",
  },
  {
    filterType: "spellFilterWizard",
    label: "Wizard Spells by Level",
  },
  {
    filterType: "spellFilterBlack",
    label: "Black Spells Alphabetically",
    dotColor: "black",
  },
  {
    filterType: "spellFilterBlue",
    label: "Blue Spells Alphabetically",
    dotColor: "blue",
  },
  {
    filterType: "spellFilterGreen",
    label: "Green Spells Alphabetically",
    dotColor: "green",
  },
  {
    filterType: "spellFilterRed",
    label: "Red Spells Alphabetically",
    dotColor: "red",
  },
  {
    filterType: "spellFilterWhite",
    label: "White Spells Alphabetically",
    dotColor: "white",
  },
];

const PageSpells = () => {
  const [filterType, setFilterType] = useState(filterConfig[0].filterType);
  const [displayedTitle, setDisplayedTitle] = useState(filterConfig[0].label);
  const [displayedSpells, setDisplayedSpells] = useState();

  useEffect(() => {
    const filterFunc = filterMap.get(filterType);
    setDisplayedSpells(filterFunc(spells));
  }, [filterType]);

  return (
    <div className="newstyle layou__page layout__page--aside">
      <aside className="content-aside">
        <fieldset>
          <legend>Show:</legend>
          {filterConfig.map((c) => (
            <Fragment key={c.filterType}>
              <br />
              <input
                type="radio"
                id={c.filterType}
                name="spellFilter"
                value={c.filterType}
                checked={filterType === c.filterType}
                onChange={() => {
                  setDisplayedTitle(c.label);
                  setFilterType(c.filterType);
                }}
              />
              <label htmlFor={c.filterType}>
                {c.dotColor ? (
                  <span
                    className={`fas fa-spell-dot fa-spell-dot--${c.dotColor}`}
                  ></span>
                ) : (
                  ""
                )}{" "}
                {c.label}
              </label>
            </Fragment>
          ))}
          <br />
        </fieldset>
        <hr />
        <ul>
          {displayedSpells &&
            displayedSpells.map((spell) => (
              <li key={spell.name}>
                <a href={`#${spell.name}`} className="aside__link">
                  {spell.name}
                </a>
              </li>
            ))}
        </ul>
      </aside>
      <div className="content-main">
        <h1>Magic Spells - {displayedTitle}</h1>
        {displayedSpells &&
          displayedSpells.map((spell) => (
            <div key={spell.name} id={spell.name}>
              <RenderSpell
                name={spell.name}
                cast={spell.cast}
                components={spell.components}
                duration={spell.duration}
                range={spell.range}
                save={spell.save}
                target={spell.target}
                school={spell.school}
                wizLvl={spell.wizLvl}
                priestLvl={spell.priestLvl}
              ></RenderSpell>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PageSpells;

function spellAlphaSort(a, b) {
  return a.name - b.name;
}

function levelFilter(prop) {
  return (arr) =>
    arr.filter((s) => s[prop] > 0).sort((a, b) => a[prop] - b[prop]);
}

function colorFilter(color) {
  return (arr) =>
    arr.filter((s) => s.school?.includes(color)).sort(spellAlphaSort);
}
