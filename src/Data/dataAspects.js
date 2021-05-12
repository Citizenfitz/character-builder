
// calling it 'aspects' to avoid JS reserved word class

const aspectData = [
    { 
        'id' : 0,
        'name' : 'fighter',
        'hitDiceType' : 8,
        assignedTalent2 : 'Multi Attack',
        description: 'masters of brute, direct force and therefore are the most durable of characters and the most proficient in combat.',
        titles: ["Archer", "Barbarian", "Brawler", "Champion", "Corsair", "Duelist", "Foe", "Gladiator", "Knight", "Man-at-arms", "Mercenary", "Myrmidon", "Paladin", "Pirate", "Pikeman", "Ranger", "Scrapper", "Sell-sword", "Soldier", "Swashbuckler", "Swordsman", "Warrior"]
    }, 
    { 
        'id' : 1,
        'name' : 'priest',
        'hitDiceType' : 6,
        assignedTalent2 : 'Thaurmaturgy',
        description: 'devotees to a particular religion, god, or pantheon; and generally meet challenges with intuition, faith, and fortitude of character. Through piety they access supernatural abilities but often lack intellectual understanding of how these forces work.',
        titles : ["Acolyte", "Adept", "Brother/Sister", "Canon", "Cleric", "Cultist", "Curate", "Disciple", "Druid", "Elder", "Father/Mother", "Friar", "Guru", "Holy man/woman", "Lama", "Liturgist", "Mendicant", "Minister", "Monk/Nun", "Patriarch/Matriarch", "Predicant", "Priest/Priestess", "Pulpiteer", "Rector", "Reverend", "Sermonizer", "Shaman", "Vicar", "Votary", "Yogi"]
    },
    { 
        'id' : 2,
        'name' : 'wizard',
        'hitDiceType' : 4,
        assignedTalent2 : 'Wizardry 1',
        description: 'characters who\'ve gained supernatural abilities through the study of arcane arts. These characters usually meet challenges with analysis, study, and cerebral reasoning.',
        title: ["Alchemist", "Apparitionist", "Augurer", "Cabalist", "Charmer", "Conjurer", "Cunning man/woman", " Diviner", "Enchanter/Enchantress", "Evoker", "Illusionist ", "Mage", "Magician", "Magnus", "Medium", "Necromancer", "Prestidigitator", "Obscurantist", "Sage", "Seer", " Sha'ir", "Soothsayer", "Sorcerer/Sorceress", "Spellbinder", "Thaumaturgist", "Theurgist", "Trickster", "Visionist", "Warlock", "Witch/Warlock", "Wise man/woman", "Wizard"]
    },
     { 
        'id' : 3,
        'name' : 'knave',
        'hitDiceType' : 6,
        assignedTalent2 : 'Stealth',
        description: 'use wit, guile, and stealth as their  preferred modus operandi and have access to a wide array of talents in these areas. In addition to the "thief" archetype, the knave aspect also encompasses various “entertainer” adventurers such as bards and actors.',
        titles : ["Assassin", "Bandit", "Burglar", "Charlatan", "Crook", "Cutpurse", "Filcher", "Footpad", "Fraudster", "Highwayman", "Magsman", "Mountebank", "Ne'er-Do-Well", "Pickpocket", "Pirate", "Robber", "Rogue", "Rutterkin", "Scofflaw", "Second-story man", "Sharpener", "Slink", "Swindler", "Thug", "Acrobat", "Actor", "Bard", "Jester", "Jongleur", "Fili", " Lark", "Minstrel", "Mummer", "Racaraide", "Skald" ]
    }
];

export {
    aspectData
  }