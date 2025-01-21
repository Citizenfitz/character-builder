import React from "react";
import RenderMonster from "../Utilities/RenderMonster";
import { monstersData } from "../../Data/";

const PageMonsters = () => {
  return (
    <div className="newstyle layou__page layout__page--aside">
      <aside className="content-aside">
        <div>
          <h2 className="ut-color-common">Monsters</h2>
          <ol>
            {monstersData.map((monster) => (
              <li key={monster.id}>
                <a href={`#${monster.name}`} className="aside__link">
                  {monster.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>
      <div className="content-main">
        <h1>Monsters Descriptions</h1>

        {monstersData.map((monster) => (
          <div key={monster.name} id={monster.name}>
            <RenderMonster
              id={monster.id}
              acAND={monster.acAND}
              acQR={monster.acQR}
              alignment={monster.alignment}
              attackDamage={monster.attackDamage}
              attackNum={monster.attackNum}
              attribCha={monster.attribCha}
              attribCon={monster.attribCon}
              attribDex={monster.attribDex}
              attribInt={monster.attribInt}
              attribStr={monster.attribStr}
              attribWis={monster.attribWis}
              aura={monster.aura}
              freq={monster.freq}
              genreAmericane={monster.genreAmericane}
              genreFantasy={monster.genreFantasy}
              genreRadium={monster.genreRadium}
              hd={monster.hd}
              hdMod={monster.hdMod}
              hpAvg={monster.hpAvg}
              img={monster.img}
              level={monster.level}
              morale={monster.morale}
              mv={monster.mv}
              mvFly={monster.mvFly}
              mvSwim={monster.mvSwim}
              name={monster.name}
              nameLatin={monster.nameLatin}
              numAppearing={monster.numAppearing}
              psionicPSP={monster.psionicPSP}
              PsionicSavePenalty={monster.PsionicSavePenalty}
              saveBonus={monster.saveBonus}
              size={monster.size}
              type={monster.type}
              xp={monster.xp}
            ></RenderMonster>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageMonsters;
