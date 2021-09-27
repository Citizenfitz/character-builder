const dataAttributes = {
	strength:   { 
		'name' : 'STR',
		'roll'  : 10,
		'min' : 3,
		'max' : 18,
		'mod' : 0,
		'total' : 0,
		'bonus': 0,
	},
	dexterity:  { 
		'name' : 'DEX',
		'roll'  : 10,
		'min' : 3,
		'max' : 18,
		'mod' : 0,
		'total' : 0,
		'bonus': 0,
	},
	constitution:   { 
		'name' : 'CON',
		'roll'  : 10,
		'min' : 3,
		'max' : 18,
		'mod' : 0,
		'total' : 0,
		'bonus': 0,
	},
	intelligence:  { 
		'name' : 'INT',
		'roll'  : 10,
		'min' : 3,
		'max' : 18,
		'mod' : 0,
		'total' : 0,
		'bonus': 0,
	},
	wisdom: { 
		'name' : 'WIS',
		'roll'  : 10,
		'min' : 3,
		'max' : 18,
		'mod' : 0,
		'total' : 0,
		'bonus': 0,
	},
	charisma: { 
		'name' : 'CHA',
		'roll'  : 10,
		'min' : 3,
		'max' : 18,
		'mod' : 0,
		'total' : 0,
		'bonus': 0,
	}
};

// mod values from 0 to 22
const dataAttributesMods = [
	-4,
	-4,
	-4,
	-3,
	-3,
	-2,
	-2,
	-1,
	-1,
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5
]


export {
	dataAttributes, dataAttributesMods
}