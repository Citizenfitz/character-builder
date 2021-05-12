const talentData = [
    {
      'id': 'c1',
      'aspect': 'common',
      'name': 'Alertness',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'c2',
      'aspect': 'common',
      'name': 'Attribute Increase',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': true,
      'isOption': true
    },
    {
      'id': 'c3',
      'aspect': 'common',
      'name': 'Medical',
      'desc': 'copy',
      'mod': 'Intelligence',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'c4',
      'aspect': 'common',
      'name': 'Riding',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'c5',
      'aspect': 'common',
      'name': 'Stronghold',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': false
    },
    {
      'id': 'c6',
      'aspect': 'common',
      'name': 'Survival & Tracking',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'f1',
      'aspect': 'fighter',
      'name': 'Berserk',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'f2',
      'aspect': 'fighter',
      'name': 'Blind Fighting',
      'desc': 'copy',
      'mod': 'Wisdom',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'f3',
      'aspect': 'fighter',
      'name': 'Bravery',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'f4',
      'aspect': 'fighter',
      'name': 'Combat',
      'desc': 'copy',
      'mod': 'Strength/Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': false
    },
    {
      'id': 'f5',
      'aspect': 'fighter',
      'name': 'Combat Specialization',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'f6',
      'aspect': 'fighter',
      'name': 'Durability',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'f7',
      'aspect': 'fighter',
      'name': 'Multi-Attack',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'f8',
      'aspect': 'fighter',
      'name': 'Missle Deflection',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p1',
      'aspect': 'priest',
      'name': 'Abjuration',
      'desc': 'copy',
      'mod': 'Wisdom',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p2',
      'aspect': 'priest',
      'name': 'Bestow Blessing',
      'desc': 'copy',
      'mod': 'Wisdom',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p3',
      'aspect': 'priest',
      'name': 'Thaurmaturgy',
      'desc': 'copy',
      'mod': 'Wisdom',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p4',
      'aspect': 'priest',
      'name': 'Divine Attunement',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p5',
      'aspect': 'priest',
      'name': 'Incorruptibility',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p6',
      'aspect': 'priest',
      'name': 'Psychic Sensitivity',
      'desc': 'copy',
      'mod': 'Wisdom',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p7',
      'aspect': 'priest',
      'name': 'Scholarly Knowledge',
      'desc': 'copy',
      'mod': 'Intelligence/Wisdom',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'p8',
      'aspect': 'priest',
      'name': 'Sermonize',
      'desc': 'copy',
      'mod': 'Charisma',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k1',
      'aspect': 'knave',
      'name': 'Acrobatics',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k2',
      'aspect': 'knave',
      'name': 'Assassination',
      'desc': 'copy',
      'mod': 'Intelligence',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k3',
      'aspect': 'knave',
      'name': 'Backstabbing',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k4',
      'aspect': 'knave',
      'name': 'Beguilement',
      'desc': 'copy',
      'mod': 'Charisma',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k5',
      'aspect': 'knave',
      'name': 'Inspiration',
      'desc': 'copy',
      'mod': 'Charisma',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k6',
      'aspect': 'knave',
      'name': 'Burglary',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k7',
      'aspect': 'knave',
      'name': 'Climbing',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k8',
      'aspect': 'knave',
      'name': 'Disguise',
      'desc': 'copy',
      'mod': 'Charisma',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k9',
      'aspect': 'knave',
      'name': 'Escapology',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k10',
      'aspect': 'knave',
      'name': 'Fraud',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k11',
      'aspect': 'knave',
      'name': 'Lore & Read Magic',
      'desc': 'copy',
      'mod': 'Intelligence',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k12',
      'aspect': 'knave',
      'name': 'Sleight of hand',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'k13',
      'aspect': 'knave',
      'name': 'Stealth',
      'desc': 'copy',
      'mod': 'Dexterity',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'w1',
      'aspect': 'wizard',
      'name': 'Arcane Knowledge',
      'desc': 'copy',
      'mod': 'Intelligence',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'w2',
      'aspect': 'wizard',
      'name': 'Arcane Sensitivity',
      'desc': 'copy',
      'mod': 'Wisdom',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'w3',
      'aspect': 'wizard',
      'name': 'Encumbered Casting',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': false
    },
    {
      'id': 'w4',
      'aspect': 'wizard',
      'name': 'Spell Refashionment',
      'desc': 'copy',
      'mod': 'Intelligence',
      'isLeveling': true,
      'isStacking': false,
      'isOption': false
    },
    {
      'id': 'w5',
      'aspect': 'wizard',
      'name': 'Stealth Casting',
      'desc': 'copy',
      'mod': 'Intelligence',
      'isLeveling': true,
      'isStacking': false,
      'isOption': false
    },
    {
      'id': 'w6',
      'aspect': 'wizard',
      'name': 'Wizardry 1',
      'desc': 'copy',
      'mod': 'Intelligence',
      'isLeveling': true,
      'isStacking': false,
      'isOption': true
    },
    {
      'id': 'w7',
      'aspect': 'wizard',
      'name': 'Wizardry 2',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': false
    },
    {
      'id': 'w8',
      'aspect': 'wizard',
      'name': 'Wizardry 3',
      'desc': 'copy',
      'mod': 'none',
      'isLeveling': false,
      'isStacking': false,
      'isOption': false
    }
  ];

export {
  talentData
}