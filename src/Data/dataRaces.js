const raceData = [
  {
    id: 1,
    name: "Dwarf",
    desc: "Dwarves are short and burly humanoids rarely seen without full beards. They stand about 4ft tall, weigh around 150lbs, have ruddy skin, earthen toned hair, and tend towards dour and gruff personalities. They’re great miners who are eminently comfortable in subterranean settings, and they’re particularly hearty and resistant to poisons and magic. This talent may not be taken by the magic-User class and dwarves may not choose any Magic-User talents.",
    attributes: {
      constitution: {
        bonus: 1
      },
      charisma: {
        bonus: -1
      }
    },
    characteristics: [
      "Languages: Common, Dwarven",
      "Too small to use standard human armor or clothing, longer weapons, or longbows",
      "Darksight (as the spell)",
      "In underground settings, and when actively searching, they can detect non-magical traps; hidden pathways/doors; new construction; or sloping passages with a DC 13 check."
    ],
    saveModsRace: [
      "+4 saving throws against magical effects",
      "+4 saving throws against poisons"
    ],
  },
  {
    id: 2,
    name: "Elf",
    desc: "Elves stand about 5ft tall, and weigh around 120lbs. They have delicate, beautiful features, slender builds, and long pointed ears. Elves live very long lives and retain their youthful vigor right up till death. The race has an affinity for magic and nature. Their personalities are often described as friendly, but ethereal and detached.",
    attributes: {
      dexterity:  {
        bonus: 1
      },
      constitution:  {
        bonus: -1
      }
    },
    characteristics: [
      "Languages: Common, Elvish",
      "Darksight - may see up to 60' in darkness",
      "Detects secret doors when actively searching with a DC 13 check."
    ],
    saveModsRace: [
      "Immune to paralyzation by ghouls."
    ]
  },
  {
    id: 3,
    name: "Gnome",
    desc: "Gnomes are distant cousins to dwarves being similar in height but more slender in build. They stand 4ft height, weigh about 100lbs, and often have large bulbous noses. Gnomes have a greater affinity for magic than dwarves and gravitate towards illusion magic. Gnomes tend to be much more jovial and mischievous than their dwarven cousins. They speak a dialect of Dwarven",
    attributes: {},
    characteristics: [
      "Languages: Common, Dwarven, that of small burrowing animals",
      "Darksight (as the spell)",
      "Too small to use standard human armor or clothing, longer weapons, or longbows",
      "In underground settings, and when actively searching, they can detect non-magical traps; hidden pathways/doors; new construction; or sloping passages with a DC 13 check."
    ],
    saveModsRace: [
      "+2 saving throws against magical effects.",
      "+4 saving throws against poisons"
    ]
  },
  {
    id: 4,
    name: "Half-Elf",
    desc: "Half-elves are characters with both human and elven lineage. Such unions tend to produce individuals that strongly favor their elven side but are taller (around 5 1⁄2ft tall) and more sturdily built (around 150lbs).",
    attributes: {},
    characteristics: [
      "Languages: Common, Elven",
      "Darksight (as the spell)",
      "Detects secret doors when actively searching with a DC 13 check."
    ],
    saveModsRace: [
      "+4 on saving throws vs ghoul's paralyzation"
    ]
  },
  {
    id: 5,
    name: "Half-Orc",
    desc: "Half orcs are the product of unions between orcs and humans. Most such offspring are monstrous and more orc than man, but player characters are assumed to be of the 10% who can pass for human. Their orcish lineage grants them greater strength and fortitude but tends them towards homely countenances and brutish demeanors. This talent may not be taken by the Magic-User class or Priest classes. Additionally, half-orcs may not take any magic-user talents.",
    attributes: {
      strength:  {
        bonus: 1,
        max: 19
      },
      constitution:  {
        bonus: 1,
        max: 19
      },
      charisma:  {
        bonus: -2
      }
    },
    characteristics: [
      "Languages: Common, Orcish",
      "Darksight (as the spell)"
    ],
    saveModsRace: []
  },
  {
    id: 6,
    name: "Halfling",
    desc: "Halfing are diminutive humanoids that stand a mere 1 yard tall and weigh 60lbs. They commonly go barefoot and have furry, large feet. Their small size and natural agility makes them very stealthy by nature. They are known to be a hearty, resilient race who are highly resistant to magic, mental influence, and poisons. Halflings tend towards friendly, earthy personalities and enjoy camaraderie, home life, and creature comforts. This talent may not be taken by the Magic-User class or Priest classes. Additionally, halflings may not take any magic-user talents.",
    attributes: {
      strength: {
        bonus: -1
      },
      dexterity: {
        bonus: 1,
        max: 19
      }
    },
    characteristics: [
      "Languages: Common, Halfling",
      "Too small to use standard human armor or clothing, and they may not use any weapon larger than a short sword.",
      "Stealth Talent - Automatically has the Stealth talent. If they choose the Knave class they may substitute this for any other Knave talent instead.",
    ],
    saveModsRace: [
      "+3 saving throws vs magic, mind influencing effects (but not illusions), and poisons.",
    ]
  },
];

export { raceData };
