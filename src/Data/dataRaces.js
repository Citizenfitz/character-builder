const raceData = [
  {
    id: 1,
    name: "Dwarf",
    desc: "Dwarfs are short and burly humanoids rarely seen without full beards. They stand about 4ft tall, weigh around 150 lbs. have ruddy skin, earthen-toned hair, and tend towards dour and gruff personalities. They’re great miners who’re eminently comfortable in subterranean settings, and they’re particularly resistant to poisons and magic. This talent may not be taken by the magic-user class and dwarves may not choose any magic-user talents.",
    attributes: {
      constitution: {
        bonus: 1,
        max: 18,
      },
      charisma: {
        bonus: -1,
        max: 18,
      },
    },
    movement: 25,
    characteristics: [
      "Languages: Common, Dwarven, Goblinese",
      "Size: Too small to use standard human armor or clothing, longer weapons, or longbows",
      "Darksight (as the spell)",
      "Perception Bonus: +3 to all perception rolls & checks In underground settings for: non-magical traps; hidden pathways & doors; new construction; or sloping passage.",
      "Class Limit: May not be magic-users or take magic-user talents.",
    ],
    saveModsRace: ["+4 vs. magical effects and poisons"],
  },
  {
    id: 2,
    name: "Elf",
    desc: "Elves stand about 5ft tall, and weigh around 120 lbs. They have delicate, beautiful features, slender builds, and long pointed ears. Elves live very long lives and retain their youthful vigor right up till death. The race has an affinity for magic and nature. Their personalities are often described as friendly, but ethereal and detached.",
    attributes: {
      dexterity: {
        bonus: 1,
        max: 18,
      },
      constitution: {
        bonus: -1,
        max: 18,
      },
    },
    movement: 30,
    characteristics: [
      "Languages: Common, elvish [Common, Elvish, Goblinese, Orcish]",
      "Darksight (as the spell)",
      "Perception Bonus: +2 on all perception rolls & checks",
    ],
    saveModsRace: ["Immune to paralyzation by ghouls."],
  },
  {
    id: 3,
    name: "Gnome",
    desc: "Gnomes are distant cousins to dwarves being similar in height but more slender in build. They stand 4ft height, weigh about 100 lbs, and often have large bulbous noses. Gnomes have a greater affinity for magic than dwarves and gravitate towards illusion magic. They tend to be much more jovial and mischievous than their dwarven cousins.",
    attributes: {},
    movement: 25,
    characteristics: [
      "Languages: Common, Dwarven, Kobold, the secret language of burrowing mammals",
      "Darksight (as the spell)",
      "Size: Too small to use standard human armor or clothing, longer weapons, or longbows",
      "Perception Bonus: +3 to all perception rolls & checks In underground settings for: non-magical traps; hidden pathways & doors; new construction; or sloping passages.",
    ],
    saveModsRace: ["+2 vs. magical effects.", "+4 vs. poisons"],
  },
  {
    id: 4,
    name: "Half-Elf",
    desc: "Half-Elves are characters with both human and elven lineage. Such unions tend to produce individuals that strongly favor their elven side but are taller (around 5 1⁄2 ft tall) and more sturdily built (around 150 lbs.).",
    attributes: {},
    movement: 30,
    characteristics: [
      "Languages: Common, Elven",
      "Darksight (as the spell)",
      "Perception Bonus: +2 on all perception rolls & checks",
    ],
    saveModsRace: ["+4 vs ghoul's paralyzation"],
  },
  {
    id: 5,
    name: "Half-Orc",
    desc: "Half orcs are the product of unions between orcs and humans. Most such offspring are monstrous and more orc than man, but player characters are assumed to be of the 10% who can pass for human. Their orcish lineage grants them greater strength and fortitude but tends them towards homely countenances and brutish demeanors. This talent may not be taken by the magic-user class or priest classes. Additionally, half-orcs may not take any magic-user talents.",
    attributes: {
      strength: {
        bonus: 1,
        max: 19,
      },
      constitution: {
        bonus: 1,
        max: 19,
      },
      charisma: {
        bonus: -2,
        max: 18,
      },
    },
    movement: 30,
    characteristics: [
      "Languages: Common, Orcish",
      "Darksight (as the spell)",
      "Class Limit: May not be magic-users or take magic-user talents.",
    ],
    saveModsRace: [],
  },
  {
    id: 6,
    name: "Halfling",
    desc: "Halfing are diminutive humanoids that stand a mere three feet tall and weigh 60 lbs. They commonly go barefoot and have large, furry feet. Their small size and natural agility makes them innately stealthy. They are known to be a hearty, resilient race who are highly resistant to magic, mental influence, and poisons. Halflings tend towards friendly, earthy personalities and enjoy camaraderie, home life, and creature comforts. This talent may not be taken by the magic-user class or priest classes. Additionally, halflings may not take any magic-user talents.",
    attributes: {
      strength: {
        bonus: -1,
        max: 18,
      },
      dexterity: {
        bonus: 1,
        max: 19,
      },
    },
    movement: 25,
    characteristics: [
      "Languages: Common, Halfling",
      "Size: Too small to use standard human armor or clothing, and they may not use any weapon larger than a short sword.",
      "Stealth Bonus: +3 to all Stealth rolls (talent & no-talent)",
      "Class Limit: May not be magic-users or take magic-user talents.",
    ],
    saveModsRace: [
      "+3 vs. magic, mind influencing effects (but not illusions), and poisons.",
    ],
  },
  {
    id: 7,
    name: "Mutant",
    desc: "Mutants are humans transformed by the bizarre and chaotic mutagenic forces in the game world. They are possessed of both remarkable abilities and tragic limitations.",
    attributes: {
      constitution: {
        bonus: -1,
        max: 18,
      },
      charisma: {
        bonus: -2,
        max: 18,
      },
    },
    movement: 30,
    characteristics: ["mutations"],
    saveModsRace: [],
  },
];

export { raceData };
