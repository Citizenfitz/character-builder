import React, { useMemo, useState } from "react";
import { spellData } from "../../Data/";
import RenderSpell from "../Utilities/RenderSpell";

// Move spell data processing outside component to avoid recalculation on every render
const processedSpells = Object.entries(spellData).map(([spellName, spell]) => ({
  ...spell,
  name: spellName,
}));

// Pre-compute filtered spell lists
const spellLists = {
  spellFilterAll: processedSpells.sort((a, b) => a.name.localeCompare(b.name)),
  spellFilterPriest: processedSpells
    .filter((s) => s.priestLvl > 0)
    .sort((a, b) => a.priestLvl - b.priestLvl),
  spellFilterWizard: processedSpells
    .filter((s) => s.wizLvl > 0)
    .sort((a, b) => a.wizLvl - b.wizLvl),
  spellFilterBlack: processedSpells
    .filter((s) => s.school?.includes("black"))
    .sort((a, b) => a.name.localeCompare(b.name)),
  spellFilterBlue: processedSpells
    .filter((s) => s.school?.includes("blue"))
    .sort((a, b) => a.name.localeCompare(b.name)),
  spellFilterGreen: processedSpells
    .filter((s) => s.school?.includes("green"))
    .sort((a, b) => a.name.localeCompare(b.name)),
  spellFilterRed: processedSpells
    .filter((s) => s.school?.includes("red"))
    .sort((a, b) => a.name.localeCompare(b.name)),
  spellFilterWhite: processedSpells
    .filter((s) => s.school?.includes("white"))
    .sort((a, b) => a.name.localeCompare(b.name)),
};

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

  // Use useMemo to avoid recalculating the current filter config
  const currentFilter = useMemo(
    () => filterConfig.find((f) => f.filterType === filterType),
    [filterType]
  );

  // Get pre-computed spell list based on filter
  const displayedSpells = spellLists[filterType];

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter.filterType);
  };

  return (
    <div className="newstyle layou__page layout__page--aside">
      <aside className="content-aside">
        <fieldset>
          <legend>Show:</legend>
          {filterConfig.map((config) => (
            <div key={config.filterType}>
              <input
                type="radio"
                id={config.filterType}
                name="spellFilter"
                value={config.filterType}
                checked={filterType === config.filterType}
                onChange={() => handleFilterChange(config)}
              />
              <label htmlFor={config.filterType}>
                {config.dotColor && (
                  <span
                    className={`fas fa-spell-dot fa-spell-dot--${config.dotColor}`}
                  />
                )}{" "}
                {config.label}
              </label>
            </div>
          ))}
        </fieldset>
        <hr />
        <nav>
          <ul>
            {displayedSpells.map((spell) => (
              <li key={spell.name}>
                <a href={`#${spell.name}`} className="aside__link">
                  {spell.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="content-main">
        <h1>Magic Spells - {currentFilter.label}</h1>
        {displayedSpells.map((spell) => (
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSpells;
