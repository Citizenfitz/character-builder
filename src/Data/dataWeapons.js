const meleeWeaponData = [
	{		
		name: "none",
		damage: "-",
		notes: "",
		cost: ""
	},
	{
		name: "Battle Axe",
		damage: "1d8",
		notes: "two-handed",
		cost: "5gp"
	},
	{
		name: "Hand Axe",
		damage: "1d4",
		notes: "",
		cost: "1gp"
	},
	{
		name: "Club",
		damage: "1d4",
		notes: "",
		cost: ""
	},
	{
		name: "Dagger",
		damage: "1d4",
		notes: "short",
		cost: "3gp"
	},
	{
		name: "Footman's Flail",
		damage: "1d8",
		notes: "",
		cost: "8gp"
	},
	{
		name: "Horseman's Flail",
		damage: "1d6",
		notes: "",
		cost: "5gp"
	},
	{
		name: "Light Hammer",
		damage: "1d4",
		notes: "",
		cost: "1gp"
	},
	{
		name: "War Hammer",
		damage: "1d6",
		notes: "",
		cost: "8gp"
	},
	{
		name: "Knife",
		damage: "1d3",
		notes: "",
		cost: "1gp"
	},
	{
		name: "Lance",
		damage: "1d12",
		notes: "Mounted charge does double damage",
		cost: "8gp"
	},
	{
		name: "Footman's Mace",
		damage: "1d8",
		notes: "",
		cost: "5gp"
	},
	{
		name: "Horseman's Mace",
		damage: "1d6",
		notes: "",
		cost: "3gp"
	},
	{
		name: "Great Maul",
		damage: "1d10",
		notes: "two-handed",
		cost: "5gp"
	},
	{
		name: "Morning Star",
		damage: "1d6",
		notes: "",
		cost: "5gp"
	},
	{
		name: "Heavy Pick",
		damage: "1d8",
		notes: "two-handed",
		cost: "3gp"
	},
	{
		name: "Light Pick",
		damage: "1d6",
		notes: "",
		cost: "1gp"
	},
	{
		name: "Pole Arm",
		damage: "1d10",
		notes: "two-handed",
		cost: "7gp"
	},
	{
		name: "Quarterstaff",
		damage: "1d6",
		notes: "two-handed",
		cost: "1gp"
	},
	{
		name: "Scimitar",
		damage: "1d8",
		notes: "",
		cost: "11gp"
	},
	{
		name: "Bastard Sword",
		damage: "1d8",
		notes: "1d10 damage if used two-handed",
		cost: "20gp"
	},
	{
		name: "Long Sword",
		damage: "1d8",
		notes: "",
		cost: "10gp"
	},
	{
		name: "Short Sword",
		damage: "1d6",
		notes: "",
		cost: "7gp"
	},
	{
		name: "Two-handed Sword",
		damage: "1d10",
		notes: "two-handed",
		cost: "12gp"
	},
	{
		name: "Trident",
		damage: "1d6",
		notes: "",
		cost: "7gp"
	},
]

const rangedWeaponData = [
	{
		name: "none",
		damage: "-",
		range: "",
		rate: "",
		notes: "",
		cost: ""
	},
	{
		name: "Hand Axe",
		damage: "1d4",
		range: "short",
		rate: "1",
		notes: "",
		cost: "1gp"
	},
	{
		name: "Blowgun",
		damage: "1",
		range: "short",
		rate: "1/2",
		notes: "",
		cost: "12gp"
	},
	{
		name: "Long Bow",
		damage: "1d8",
		range: "long",
		rate: "1",
		notes: "two-handed",
		cost: "40gp"
	},
	{
		name: "Short Bow",
		damage: "1d6",
		range: "long",
		rate: "1",
		notes: "two-handed",
		cost: "27gp"
	},
	{
		name: "Sling",
		damage: "1d4",
		range: "long",
		rate: "1",
		notes: "",
		cost: "1gp"
	},
	{
		name: "Hand Crossbow",
		damage: "1d4",
		range: "medium",
		rate: "1/2",
		notes: "",
		cost: "20gp"
	},
	{
		name: "Heavy Crossbow",
		damage: "1d8",
		range: "long",
		rate: "1/2",
		notes: "two-handed",
		cost: "27gp"
	},
	{
		name: "Light Crossbow",
		damage: "1d6",
		range: "long",
		rate: "1/2",
		notes: "",
		cost: "16gp"
	},
	{
		name: "Dagger",
		damage: "1d4",
		range: "short",
		rate: "1",
		notes: "",
		cost: "3gp"
	},
	{
		name: "Dart",
		damage: "1d2",
		range: "short",
		rate: "1",
		notes: "",
		cost: "5sp"
	},
	{
		name: "War Hammer",
		damage: "1d6",
		range: "short",
		rate: "1",
		notes: "",
		cost: "8gp"
	},
	{
		name: "Knife",
		damage: "1d3",
		range: "short",
		rate: "1",
		notes: "",
		cost: "1gp"
	},
	{
		name: "Trident",
		damage: "1d6",
		range: "short",
		rate: "1",
		notes: "",
		cost: "7gp"
	},
	{
		name: "Whip",
		damage: "1d2",
		range: "short",
		rate: "1",
		notes: "May make grab maneuver",
		cost: "3gp"
	},
]

export { meleeWeaponData, rangedWeaponData }