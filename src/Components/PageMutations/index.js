import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { mutationsData, talentData, spellData } from "../../Data/";
import RenderMutation from "../Utilities/RenderMutation";

const PageMutations = () => {
  const testMutation = {
    id: 1,
    wt: 3,
    roll: "1-3",
    name: "Acid Attack",
    desc: "mutation-Acid-Attack.md",
  };

  const testMutation2 = [
    {
      id: 1,
      wt: 3,
      roll: "1-3",
      name: "Acid Attack",
      desc: "mutation-Acid-Attack.md",
    },
    {
      id: 9,
      wt: 3,
      roll: "24-26",
      name: "Dwarfism",
      desc: "mutation-Dwarfism.md",
    },
  ];

  return (
    <div className="newstyle">
      <h1>Mutations</h1>
      {mutationsData.map((mutation) => (
        <div key={mutation.id}>
          <RenderMutation name={mutation.name}></RenderMutation>
        </div>
      ))}
      <hr />

      <h1>Talents</h1>
      {talentData.map((talent) => (
        <div key={talent.id}>
          <h2>{talent.name}</h2>
          <ul className="spell-desc">
            <li>Type: {talent.aspect}</li>
            <li>Modifier: {talent.mod}</li>
            <li>Prerequisite: none</li>
          </ul>
          <p>{talent.desc}</p>
        </div>
      ))}

      <hr />
      <h1>Mutations</h1>

      <h2 id="acid-attack">Acid Attack</h2>
      <p>
        Thrice per day the character may spew forth a stream of potent acid at a
        single target up to 15' away. If used on inanimate objects it will
        dissolve up to 1 cubic foot of materials (excluding glass, ceramics, or
        other substances immune to acid). The target:
      </p>
      <ul>
        <li>Must be hit be the with the acid attack in combat</li>
        <li>
          If hit, suffers 3d4 damage, then 2d4 on the following round, and 1d4
          on the third and final round.
        </li>
        <li>
          May make a saving throw each round to reduce the damage by half.
          Targets may stop the second and third rounds of damage by diving into
          water, applying an alkaline substance, etc.
        </li>
      </ul>
      <h2 id="alacrity">Alacrity</h2>
      <p>
        Twice per day the character may briefly increase their speed. The effect
        is identical to the spell <em>Haste</em> though it only affects the
        character. Alacrity lasts for 4 rounds plus the character's CON
        modifier.
      </p>
      <h2 id="aquatic-adaptation">Aquatic Adaptation</h2>
      <p>
        The character is perfectly adapted for aquatic environments. They have
        gills and can breathe underwater, see normally underwater, and swim as
        fast as they can travel on land. Furthermore, they suffer no ill effects
        from great ocean depths or quick diving decompression.
      </p>
      <h2 id="bioluminescence">Bioluminescence</h2>
      <p>
        With this mutation the character can cause parts of his or her body to
        glow and generate:
      </p>
      <ul>
        <li>Low-level illumination equal to torch light.</li>
        <li>
          A flash of blinding light in a 40' cone. Creatures within the cone and
          not facing directly away from the character must make a DEX-modified
          saving throw or be blinded for 1d4 rounds. This attack can be used
          once per hour.
        </li>
      </ul>
      <h2 id="chameleon-ability">Chameleon Ability</h2>
      <p>
        The character can alter their epidermis to blend perfectly into just
        about any environment. They gain +5 on all rolls involving concealing
        themselves when stationary and +3 if they are moving.{" "}
        <em>Chameleon Ability</em> will not work (or work much less effectively)
        if the character is wearing significant clothing, armor, etc.
      </p>
      <h2 id="clinging">Clinging</h2>
      <p>
        The character can cling to and transverse vertical surfaces like a
        lizard or insect. This ability functions exactly like the spell{" "}
        <em>Spider Climb</em> except it offers no protection against{" "}
        <em>Web</em> spells. Clinging cannot be used without bare hands and/or
        feet.
      </p>
      <h2 id="compressible-form">Compressible Form</h2>
      <p>
        The character is without a solid internal body structure and as such:
      </p>
      <ul>
        <li>Suffers -1 hp damage per die from all bludgeoning attacks</li>
        <li>
          Can squeeze/ooze through cracks as small as 3.5 inches in diameter or
          1 inch high by 1 foot wide. Such movement is considered twice-slowed
          (each 1' of travel takes 4' of movement).
        </li>
        <li>
          Is almost impossible to restrain with chains, ropes, manacles, etc.
          and gains +7 to resist or escape all grab maneuvers.
        </li>
      </ul>
      <h2 id="darksight">Darksight</h2>
      <p>
        The character can see in the dark up to a distance of 60' in a manner
        identically to the <em>Darksight</em> spell.
      </p>
      <h2 id="dual-heads">Dual Heads</h2>
      <p>
        The character possesses two fully-functional heads and can perform such
        feats as holding two different conversations at once or having one head
        keeping watch while the other one sleeps. The character also gains:
      </p>
      <ul>
        <li>+2 on all saving throws vs mental attacks</li>
        <li>+2 on all perception rolls</li>
        <li>Only surprised on a 1 on 6</li>
        <li>
          <em>Advantage</em> on{" "}
          <strong>saving throws vs blinding attacks</strong> such as
          Bioluminescent (each d20 roll is for one head so it is possible one is
          blinded and not the other).
        </li>
        <li>
          <em>Disadvantage</em> on{" "}
          <strong>saving throws vs other gaze attacks</strong> (like
          petrification) where one head is likely to succumb to the attack even
          if the other avoids it.
        </li>
      </ul>
      <h2 id="dwarfism">Dwarfism</h2>
      <p>
        The character is much smaller than a normal human. Roll a d12 to
        determine their size:
      </p>
      <table>
        <thead>
          <tr>
            <th className="ut-align-center">D12 Roll</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="ut-align-center">
              <strong>1-7</strong>
            </td>
            <td>
              <strong>Half Human Size</strong>
              <br />
              3ft tall, weigh 60lbs, -1 Strength, movement 30' +3 to all Stealth
              rolls (even if they don't have the talent); may not use weapon
              larger than short sword
            </td>
          </tr>
          <tr>
            <td className="ut-align-center">
              <strong>8-11</strong>
            </td>
            <td>
              <strong>Quarter Human Size</strong>
              <br />
              1.5ft tall, weigh about 30lbs, -3 Strength (minimum 2), 25'
              movement, +4 to all Stealth rolls, +1 AC vs ranged attacks. May
              not use weapon larger than dagger
            </td>
          </tr>
          <tr>
            <td className="ut-align-center">
              <strong>12</strong>
            </td>
            <td>
              <strong>Eighth Human Size</strong>
              <br />
              .75ft tall, weight about 10lbs, -4 Strength (minimum 2), 20'
              movement, +5 to Stealth rolls, +2 AC vs ranged attacks. May not
              use weapon larger than knife
            </td>
          </tr>
        </tbody>
      </table>
      <h2 id="echolocation">Echolocation</h2>
      <p>
        Character gains +2 to hearing perceptions rolls and can "see" in
        complete darkness at a range of 120'. Echolocation does not work around
        corners and can only perceive rough shapes, not colors, writing, or
        images on walls. Characters using echolocation emit a sound which is
        inaudible to normal hearing but may be detected by creatures with
        extraordinary hearing or with echolocation themselves.
      </p>
      <h2 id="electrogenic-attack">Electrogenic Attack</h2>
      <p>
        The character can discharge a powerful electric attack against anyone
        they are touching. The attack causes 1d8 points of damage and targets
        must make a CON-modified saving throw or be stunned for 1d4 rounds
        (unable to take actions and is attacked with advantage). Underwater
        electrogenic attacks inflict half the damage and stun time, but affects
        all creatures within 10 feet of the character. This power can be used
        once every 5 minutes.
      </p>
      <h2 id="extra-arms">Extra Arms</h2>
      <p>
        The character possesses 1d6 extra arms. These arms may be humanoid or
        something else (tentacles, insectoid, etc.). These extra limbs provide
        the character:
      </p>
      <ul>
        <li>+5 to any climbing rolls</li>
        <li>+5 to make or evade grab and/or grappling attacks</li>
        <li>+1 to their Strength attribute</li>
      </ul>
      <h2 id="extra-legs">Extra Legs</h2>
      <p>
        The character possesses a number of extra legs. They may be humanoid or
        something else (equine, insectoid, tentacles, etc.). These extra limbs
        provide the character:
      </p>
      <ul>
        <li>+15' of movement</li>
        <li>Advantage on any roll to avoid losing their balance</li>
        <li>+1 to their Dexterity attribute</li>
      </ul>
      <h2 id="gas-attack">Gas Attack</h2>
      <p>
        Thrice per day the character can spray a noxious gas from a specified
        place on their body (mouth, hands, navel, etc.). This gas can be
        projected up to 30', fills a 20' area, and persists for 5 rounds (though
        high winds will disperse it immediately). Creatures within the cloud
        suffer effects identical to the spell <em>Stinking Cloud</em>. The
        character is immune to his or her own gas.
      </p>
      <h2 id="gas-bags">Gas Bags</h2>
      <p>
        The character is able to inflate gas bags enabling them to float in the
        air indefinitely. The character may control their vertical movement but
        horizontal movement is at the mercy of wind currents. He or she may
        carry aloft up to four times their body weight.
      </p>
      <h2 id="gigantism">Gigantism</h2>
      <p>
        Character is much larger than a normal human. Roll a d12 to determine
        their size.
      </p>
      <table>
        <thead>
          <tr>
            <th>D12 Roll</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>1-5</strong>
            </td>
            <td>
              <strong>One-Quarter again Human Size</strong>
              <br />
              7.5ft tall; 500lbs; +2 Strength; +1 Constitution
            </td>
          </tr>
          <tr>
            <td>
              <strong>6-9</strong>
            </td>
            <td>
              <strong>One-Half again Human Size</strong>
              <br />
              9ft tall; 1000lbs +3 Strength; +3 Constitution
            </td>
          </tr>
          <tr>
            <td>
              <strong>10-12</strong>
            </td>
            <td>
              <strong>Double Human Size</strong>
              <br />
              12ft tall; 1500lbs +3 strength; +4 constitution; advantage on all
              hit dice rolls, movement 33
            </td>
          </tr>
        </tbody>
      </table>
      <h2 id="hyper-hearing">Hyper Hearing</h2>
      <p>
        The character makes all hearing perception rolls with advantage and may
        hear up to 300 ft away as if they were standing right next to the source
        of the sound. They may also detect the use of echolocation or other
        ultra/subsonic sounds within 300 ft with a successful perception roll.
        The character has <em>Vulnerability</em> to sonic attacks and against
        them suffers:
      </p>
      <ul>
        <li>
          <em>Disadvantage</em> on saving throws
        </li>
        <li>+1 point per die of damage</li>
        <li>Double the duration of any effect</li>
      </ul>
      <h2 id="hyper-immune-system">Hyper Immune System</h2>
      <p>The character is completely immune to all poisons and diseases.</p>
      <h2 id="hyper-smell">Hyper Smell</h2>
      <p>
        The character has an incredible sense of smell. They gain advantage on
        all scent-related perception rolls and with a successful roll can
        perform such acts as:
      </p>
      <ul>
        <li>
          Identify individuals by their scent even if they're disguised or shape
          shifted
        </li>
        <li>
          Track other characters by their scent (as tracking in the talent
          Survival &amp; Tracking)
        </li>
        <li>
          Sense within 5 miles the general direction and distance of water,
          fresh animal carcass, large trash heap, etc.
        </li>
        <li>
          Detect whether food and water is safe to eat (not spoiled, poisonous,
          etc.) The character has <em>Vulnerability</em> to gas or inhaled
          attacks and against them suffers:
        </li>
        <li>
          <em>Disadvantage</em> on saving throws
        </li>
        <li>+1 point per die of damage</li>
        <li>Double the duration of any effect</li>
      </ul>
      <h2 id="hyper-vision">Hyper Vision</h2>
      <p>
        The character has incredible vision. They gain advantage on all
        vision-related perception rolls, and may see an object 300 ft away as if
        it were right next to them. The character has <em>Vulnerability</em> to
        vision-based attacks (<em>bioluminescence</em>, gaze attacks, etc.) and
        against them suffers:
      </p>
      <ul>
        <li>
          <em>Disadvantage</em> on saving throws
        </li>
        <li>+1 point per die of damage</li>
        <li>Double the duration of any effect</li>
      </ul>
      <h2 id="metamorphosis">Metamorphosis</h2>
      <p>
        The character can alter their form in a manner identical to the spell{" "}
        <em>Alter Self</em>. <em>Metamorphosis</em> is extremely taxing and may
        only be maintained for 30 minutes +10 minutes per +1 CON bonus the
        character possesses. <em>Metamorphosis</em> may only be initiated once
        per hour.
      </p>
      <h2 id="natural-armor">Natural Armor</h2>
      <p>
        The character is naturally armored (scales, carapace, thick fur, thick
        blubbery skin, bark, etc.) affording them an improved armor class. Roll
        d6 to determine armoring:
      </p>
      <table>
        <thead>
          <tr>
            <th>D6 Roll</th>
            <th>Armor</th>
            <th>Armor Dex Penalty</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>1-3</strong>
            </td>
            <td>Light Armor +3 AC</td>
            <td>0</td>
          </tr>
          <tr>
            <td>
              <strong>4-5</strong>
            </td>
            <td>Medium Armor +5 AC</td>
            <td>-1</td>
          </tr>
          <tr>
            <td>
              <strong>6</strong>
            </td>
            <td>Heavy Armor +6 AC</td>
            <td>-3</td>
          </tr>
        </tbody>
      </table>
      <h2 id="natural-weaponry">Natural Weaponry</h2>
      <p>
        The character has natural weapons that inflict 1d6 damage. The form they
        take is up to the player or roll a 1d6:
      </p>
      <table>
        <thead>
          <tr>
            <th>D6 Roll</th>
            <th>Weapon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>1</strong>
            </td>
            <td>Claws or pincers</td>
          </tr>
          <tr>
            <td>
              <strong>2</strong>
            </td>
            <td>Fangs</td>
          </tr>
          <tr>
            <td>
              <strong>3</strong>
            </td>
            <td>Mandibles</td>
          </tr>
          <tr>
            <td>
              <strong>4</strong>
            </td>
            <td>Spurs</td>
          </tr>
          <tr>
            <td>
              <strong>5</strong>
            </td>
            <td>Stinger</td>
          </tr>
          <tr>
            <td>
              <strong>6</strong>
            </td>
            <td>Tusks</td>
          </tr>
        </tbody>
      </table>
      <h2 id="pheromonic-influence">Pheromonic Influence</h2>
      <p>
        The character exudes an invisible, airborne chemical that makes others
        compliant to their verbal commands. Targets:
      </p>
      <ul>
        <li>Must be within 120' of the character for at least 10 minutes.</li>
        <li>
          Are allowed a CON or WIS-modified saving throw (whichever is best) to
          avoid the effect.
        </li>
        <li>
          Failing their save they are affected as if under a{" "}
          <em>Charm Person</em> spell.
        </li>
        <li>
          Making their save; are immune to the character's{" "}
          <em>pheromonic influence</em> for a week. Targets remaining in the
          120' range are allowed additional saving throws to escape the effect
          as per <em>Charm Person</em>. Targets leaving the 120' range will
          automatically shake off the effects in four hours.
        </li>
      </ul>
      <h2 id="prehensile-tail">Prehensile Tail</h2>
      <p>
        The character has a prehensile tail that improves their balance and can
        be used for grasping objects or hanging from. Characters with prehensile
        tail gain +2 to their Dexterity attribute.
      </p>
      <h2 id="radiant-gaze">Radiant Gaze</h2>
      <p>
        The character can project searing energy beams from their eyes. These
        beams have a range of 30 feet and inflict 3d4 hit points of radiation
        damage with a successful Combat attack. Radiant Gaze may only be used
        once every 4 rounds.
      </p>
      <h2 id="regeneration">Regeneration</h2>
      <p>
        The character heals much faster than normal, regaining an additional hit
        die (of their class type) plus their CON bonus (ignore negatives) of
        lost hit points per day. Additionally, given time they can regrow lost
        extremities:
      </p>
      <ul>
        <li>
          <strong>Tiny</strong> (ears, finger, etc. ) - 1d6 hours
        </li>
        <li>
          <strong>Small</strong> (hand, foot, etc.) - 1 day
        </li>
        <li>
          <strong>Large</strong> (arm, leg, tail, etc. ) - 1d4 days
        </li>
      </ul>
      <h2 id="resistance">Resistance</h2>
      <p>
        The character is highly resistant to a specific effect. They are immune
        to low-level instances of it so if resistant to cold they could
        withstand freezing temperatures while nude, if resistant to heat they
        could walk across a bed of hot coals without harm, etc. Against attacks
        based on the effect they:
      </p>
      <ul>
        <li>
          Make all saving throws with <em>Advantage</em>
        </li>
        <li>Suffer -1 points of damage per die</li>
        <li>
          Suffer ½ duration of any attack effects (paralysis, deafness, etc.)
          Roll d12 for type of resistance:
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>D12 Roll</th>
            <th>Resistance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>1-3</strong>
            </td>
            <td>Cold</td>
          </tr>
          <tr>
            <td>
              <strong>4-6</strong>
            </td>
            <td>Electricity</td>
          </tr>
          <tr>
            <td>
              <strong>7-9</strong>
            </td>
            <td>Heat / Fire</td>
          </tr>
          <tr>
            <td>
              <strong>10</strong>
            </td>
            <td>Poison / Radiation</td>
          </tr>
          <tr>
            <td>
              <strong>11</strong>
            </td>
            <td>Chemical (acids, etc.)</td>
          </tr>
          <tr>
            <td>
              <strong>12</strong>
            </td>
            <td>Sonics</td>
          </tr>
        </tbody>
      </table>
      <h2 id="sonic-attack">Sonic Attack</h2>
      <p>
        Thrice per day the character is able to emit a powerful sonic shriek
        that affects all creatures in a 50' cone in front of the character. The
        shriek inflicts 3d4 of damage and will shatter most glass or crystalline
        materials in the area affected. Furthermore, creatures within the area
        affected must make a CON-modified saving throw or be deafened and lose
        any echolocation abilities for 3d4 rounds.
      </p>
      <h2 id="spines-thorns-or-quills">Spines, Thorns, or Quills</h2>
      <p>
        The character is covered in spines, thorns, or quills affording them:
      </p>
      <ul>
        <li>A melee attack doing 1d4 damage</li>
        <li>
          Combat reaction attack at +4 to hit against any creature attacking
          them with: grab; grapple; touch-range effect; natural weapon (claws,
          fangs, etc.); or a melee weapon shorter than a short sword.
        </li>
      </ul>
      <h2 id="symbiotic-domination">Symbiotic Domination</h2>
      <p>
        The character may take over another living creature's motor functions
        via physical contact. The character must touch the target and the target
        is allowed a CON or WIS-modified saving throw to resist the effect.
      </p>
      <ul>
        <li>
          <strong>Targets failing their saving throw</strong> have all their
          movements controlled by the character as long as physical contact is
          maintained.
        </li>
        <li>
          <strong>Targets making their saving throw</strong> may turn the tables
          and seize control of the character's motor functions unless the
          character makes a CON or WIS-modified saving throw with advantage! The
          character may dominate multiple targets as long as he or she can
          maintain physical contact with each.
        </li>
      </ul>
      <h2 id="thanatosis">Thanatosis</h2>
      <p>
        The character is able to directly modulate their life functions giving
        them:
      </p>
      <ul>
        <li>The ability to hold their breath for 10 minutes + CON mod.</li>
        <li>+3 on saving throws vs poison, disease, or death-effects</li>
        <li>
          The ability to enter into a cataleptic state indistinguishable from
          death identical to the spell <em>Feign Death</em>. The character may
          remain in this state for up to 8 hours during a 24-hour period.
        </li>
      </ul>
      <h2 id="venom">Venom</h2>
      <p>
        Thrice per day the character can deploy a venom attack using nettles,
        dermal excretion, stinger, bite, etc. The character must successfully
        hit the target in combat and the target is allowed a saving throw to
        avoid the effect. Roll d8 to determine which type of venom the character
        possesses:
      </p>
      <table>
        <thead>
          <tr>
            <th>D4 Roll</th>
            <th>Venom Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>1</strong>
            </td>
            <td>
              <strong>Weakness venom</strong>
              <br />
              affects target identically to a Ray of Enfeeblement spell for 1
              hour
            </td>
          </tr>
          <tr>
            <td>
              <strong>2</strong>
            </td>
            <td>
              <strong>Paralytic venom</strong>
              <br />
              affects target identically to a Hold Person spell for 2d6 rounds
            </td>
          </tr>
          <tr>
            <td>
              <strong>3</strong>
            </td>
            <td>
              <strong>Psychotropic venom</strong>
              <br />
              affects target identically to a Confusion spell for 1d10 rounds
            </td>
          </tr>
          <tr>
            <td>
              <strong>4</strong>
            </td>
            <td>
              <strong>Lethal venom</strong>
              <br />
              inflicts continuous 1d6 damage on target for 3d4 rounds
            </td>
          </tr>
        </tbody>
      </table>
      <h2 id="web-generation">Web Generation</h2>
      <p>
        Thrice per day the character may project a mass of sticky webbing
        identical to the spell Web save its range is limited to 30' and its size
        limited to a 10' radius. Additionally, the character can generate
        utility webbing as strong as a sturdy rope at will.
      </p>
      <h2 id="wings">Wings</h2>
      <p>
        The character is possessed of a set of functioning wings (insectoid,
        avian, reptilian, or bat-like as they choose) and may fly at a movement
        rate of 60' while carrying up to twice his or her body weight.
      </p>
      <hr />
      <h1>Psionic Powers</h1>
      <h2>Blink</h2>
      <ul className="spell-desc">
        <li>PSP: 2 (stacking)</li>
        <li>Initiate: 1 action</li>
        <li>Discipline: Psychokinesis</li>
        <li>Duration: instant</li>
        <li>Range: 120' </li>
        <li>Visibility: invisible</li>
        <li>Save: negate </li>
        <li>Target: user + 1 other creature </li>
      </ul>
      <p>
        This power instantly teleports the user to any spot within the power's
        range. Blink is unfailingly accurate and the destination may be a place
        the user can see, one they're familiar with, or specified with
        directions and distance (i.e. "20 feet down"). The user may bring along
        one other creature weighing no more than 500lb. Unwilling creatures are
        allowed a saving throw to avoid the effect. If a solid object occupies
        the destination the power fails and the user and any creature traveling
        with them suffer 4d6 points of damage.
      </p>
      <ul>
        <li>
          <b>x2 Stacking:</b> Range of 240' and can take up to two creatures
          1000 lbs or less
        </li>
        <li>
          <b>x3 Stacking:</b> Range of 480' and can take up to four creatures of
          2000 lbs or less
        </li>
      </ul>
      <hr />
      <h1>Spells</h1>
      <h2>
        Dispel Magic
        <span className="fas fa-spell-dot fa-spell-dot--black"></span>
        <span className="fas fa-spell-dot fa-spell-dot--blue"></span>
        <span className="fas fa-spell-dot fa-spell-dot--green"></span>
        <span className="fas fa-spell-dot fa-spell-dot--red"></span>
        <span className="fas fa-spell-dot fa-spell-dot--white"></span>
      </h2>
      <ul className="spell-desc">
        <li>Casting: 1 action</li>
        <li>School: All</li>
        <li>Components: V,S</li>
        <li>Duration: instant</li>
        <li>Range: 120'</li>
        <li>Save: none</li>
        <li>Target: 1 spell or 20' cube</li>
      </ul>
      <p>
        This spell instantaneously ends either all spells within its area of
        effect or a single spell of the caster's choice. It affects enchantments
        on creatures and magically summoned creatures (they're dismissed to
        whence they came), but not magic items. The caster may dispel:
      </p>
      <ul>
        <li>Their own spells automatically</li>
        <li>Third level or below spells automatically</li>
        <li>
          4th level or higher spells with an Wizardry or Thaumaturgy talent roll
          against a DC of 5 + the level of the spell to be dispelled.{" "}
        </li>
      </ul>
      <hr />
      <h1>Talents</h1>
      <h2>Alertness</h2>
      <ul className="spell-desc">
        <li>Type: Common</li>
        <li>Modifier: none</li>
        <li>Prerequisite: none</li>
      </ul>
      <p>
        The character is incredibly aware and gains +3 to all perception rolls,
        is only surprised on a roll of 1 on d12, and makes such rolls without
        penalty even while distracted or asleep.
      </p>
    </div>
  );
};

export default PageMutations;
