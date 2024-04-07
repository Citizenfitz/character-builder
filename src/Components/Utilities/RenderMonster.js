import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { filenameParser, moveConvert, calculateBonus } from "../Utilities";

const RenderMonster = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    let markdownFile = "monster-" + props.name + ".md";
    markdownFile = filenameParser(markdownFile);
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
    <div className="desc desc-monster monster">
      <h2 className="monster__name">
        {props.name} <i>{props.nameLatin}</i>
      </h2>

      <ul className="monster__basics">
        <li>
          <span className="ut-font-bold">World: </span>
          <span>
            {props.genreAmericane ? <span>Americane</span> : null}
            {props.genreFantasy ? <span>Fantasy</span> : null}
            {props.genreRadium ? <span>Radium Age</span> : null}
          </span>
        </li>
        <li>
          <span className="ut-font-bold">Type: </span>
          <span>{props.type}</span>
        </li>
        <li>
          <span className="ut-font-bold">Level: </span>
          <span>{props.level}</span>
        </li>
        <li>
          <span className="ut-font-bold">Freq: </span>
          <span>{props.freq}</span>
        </li>
        <li>
          <span className="ut-font-bold">No. Appearing: </span>
          <span>{props.numAppearing}</span>
        </li>

        <li>
          <span className="ut-font-bold">Alignment: </span>
          <span>{props.alignment}</span>
        </li>
        <li>
          <span className="ut-font-bold">Aura: </span>
          <span>{props.aura}</span>
        </li>
        {/* <li>
          <span className="ut-font-bold">XP: </span>
          <span>{props.xp}</span>
        </li> */}
      </ul>
      {/*  ------- combat stuff ------ */}
      <ul className="monster__combat">
        <li>
          <span className="ut-font-bold">Hit Dice: </span> {props.hd} +{" "}
          {props.hdMod} (Avg. HP = {props.hpAvg})
        </li>
        <li>
          <span className="ut-font-bold">Save Bonus: </span> +{props.saveBonus}
        </li>
        <li>
          <span className="ut-font-bold">Combat: </span> +{props.level}
        </li>
        <li>
          <span className="ut-font-bold">Attacks: </span> {props.attackNum} /{" "}
          {props.attackDamage}
        </li>

        <li>
          <span className="ut-font-bold">AC: </span> {props.acQR}
        </li>
        <li className="monster__combat-move">
          <span className="ut-font-bold">Move: </span> {moveConvert(props.mv)}
          {props.mvFly > 0 ? (
            <span>
              {" "}
              <span className="ut-font-bold">Fly: </span>{" "}
              {moveConvert(props.mvFly)}
            </span>
          ) : null}
          {props.mvSwim > 0 ? (
            <span>
              {" "}
              <span className="ut-font-bold">Swim: </span>{" "}
              {moveConvert(props.mvSwim)}
            </span>
          ) : null}
        </li>
        <li>
          <span className="ut-font-bold">Morale: </span> {props.morale}
        </li>
        <li>
          <span className="ut-font-bold">Size: </span> {props.size}
        </li>
        {props.psionicPSP > 0 ? (
          <li>
            <span className="ut-font-bold">Psionic PSP: </span>{" "}
            {props.psionicPSP}
          </li>
        ) : null}
        {props.PsionicSavePenalty > 0 ? (
          <li>
            <span className="ut-font-bold">Psionic Save: </span>{" "}
            {props.PsionicSavePenalty}
          </li>
        ) : null}
      </ul>
      {/*  ------- monster attributes ------ */}
      <ul className="monster__attributes">
        <li>
          <b>STR</b>
          <br /> {props.attribStr} (
          {calculateBonus(props.attribStr) > 0 ? <span>+</span> : null}
          {calculateBonus(props.attribStr)})
        </li>
        <li>
          <b>DEX</b>
          <br /> {props.attribDex} (
          {calculateBonus(props.attribDex) > 0 ? <span>+</span> : null}
          {calculateBonus(props.attribDex)})
        </li>
        <li>
          <b>CON</b>
          <br /> {props.attribCon} (
          {calculateBonus(props.attribCon) > 0 ? <span>+</span> : null}
          {calculateBonus(props.attribCon)})
        </li>
        <li>
          <b>INT</b>
          <br /> {props.attribInt} (
          {calculateBonus(props.attribInt) > 0 ? <span>+</span> : null}
          {calculateBonus(props.attribInt)})
        </li>
        <li>
          <b>WIS</b>
          <br /> {props.attribWis} (
          {calculateBonus(props.attribWis) > 0 ? <span>+</span> : null}
          {calculateBonus(props.attribWis)})
        </li>
        <li>
          <b>CHA</b>
          <br /> {props.attribCha} (
          {calculateBonus(props.attribCha) > 0 ? <span>+</span> : null}
          {calculateBonus(props.attribCha)})
        </li>
      </ul>

      {/*  ------- Image ------ */}
      <div className="monster__image">
        <img
          src={`assets/images/monster-${filenameParser(props.name)}.png`}
          alt="Monster illustration"
        />
      </div>

      {/*  ------- Description ------ */}

      <div className="monster__markdown">
        <h3>Description</h3>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RenderMonster;
