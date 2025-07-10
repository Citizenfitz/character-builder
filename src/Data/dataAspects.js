// calling it 'aspects' to avoid JS reserved word class

const aspectData = [
  {
    id: 0,
    name: "fighter",
    displayName: "Fighter",
    hitDiceType: 8,
    assignedTalent2: "Multi-Attack",
    description:
      "Fighters excel in combat, war, and martial pursuits. They are masters of brute, direct force and the most durable of characters. They benefit from high Strength, Dexterity, and Constitution.",
    weapon: "any",
    armor: "any",
    archetypes:
      "Archer, Barbarian, Brawler, Champion, Corsair, Duelist, Foe, Gladiator, Knight, Man-at-arms, Mercenary, Myrmidon, Paladin, Pirate, Pikeman, Ranger, Scrapper, Sell-sword, Soldier, Swashbuckler, Swordsman, Warrior",
    saveModsClass:
      "+2 vs petrification, polymorph, breath weapons, entangling and grappling attacks. ",
  },
  {
    id: 1,
    name: "priest",
    displayName: "Priest",
    hitDiceType: 6,
    assignedTalent2: "Prayers",
    description:
      "Priests are devotees of a religion, god, or pantheon. Through piety they have access to supernatural abilities and they stand second only to fighters in combat ability.  High Wisdom and Charisma benefit them. ",
    weapon: "blunt, non-slashing, non-piercing",
    armor: "any",
    archetypes:
      "Acolyte, Adept, Brother/Sister, Canon, Cleric, Cultist, Curate, Disciple, Druid, Elder, Father/Mother, Friar, Guru, Holy man/woman, Lama, Liturgist, Mendicant, Minister, Monk/Nun, Patriarch/Matriarch, Predicant, Priest/Priestess, Pulpiteer, Rector, Reverend, Sermonizer, Shaman, Vicar, Votary, Yogi",
    saveModsClass:
      "+2 vs poison, paralyzation, death magic, and mental attacks",
  },
  {
    id: 2,
    name: "wizard",
    displayName: "Wizard",
    hitDiceType: 4,
    assignedTalent2: "Wizardry 1",
    description:
      "Wizard is a catch-all term encompassing a wide range of characters who've gained supernatural abilities through the study of arcane arts. They are poor combatants and benefit from high Intelligence. ",
    weapon: "Club, Dagger, Dart, Staff, Crossbow (small or hand only)",
    armor: "none",
    archetypes:
      "Alchemist, Apparitionist, Augurer, Cabalist, Charmer, Conjurer, Cunning man/woman, Diviner, Enchanter/Enchantress, Evoker, Illusionist, Mage, Magician, Magnus, Medium, Necromancer, Prestidigitator, Obscurantist, Sage, Seer, Sha'ir, Soothsayer, Sorcerer/Sorceress, Spellbinder, Thaumaturgist, Theurgist, Trickster, Visionist, Warlock, Witch/Warlock, Wise man/woman, Wizard",
    saveModsClass: "+2 vs spells, illusions, rods, staves, and wands",
  },
  {
    id: 3,
    name: "rogue",
    displayName: "Rogue",
    hitDiceType: 6,
    assignedTalent2: "Stealth",
    description:
      "Rogues are masters of stealth, guile, and deception. Beyond the classic 'thief' archetype, they include 'entertainer' adventurers like bards, acrobats, and mummers. High Dexterity and Charisma benefit them.",
    weapon: "any",
    armor: "Leather or padded only.",
    archetypes:
      "Assassin, Bandit, Burglar, Charlatan, Crook, Cutpurse, Filcher, Footpad, Fraudster, Highwayman, Magsman, Mountebank, Ne'er-Do-Well, Pickpocket, Pirate, Robber, Rogue, Rutterkin, Scofflaw, Second-story man, Sharpener, Slink, Swindler, Thug, Acrobat, Actor, Bard, Jester, Jongleur, Fili, Lark, Minstrel, Mummer, Racaraide, Skald",
    saveModsClass: "+2 vs breath weapons and any save requiring dexterity",
  },
];

export { aspectData };
