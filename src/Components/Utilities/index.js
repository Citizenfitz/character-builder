const calculateBonus = (attributeValue = 0) =>{
	const bonusRange = [0,0,0,-3,-3,-2,-2,-1,-1,0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6]
	return bonusRange[attributeValue]
}

// adds + or - to front of bonus for display
const formatNumberModifier = (bonusValue = 0) =>{
	if (bonusValue > 0) {
		bonusValue = '+'+bonusValue;
	}
	return bonusValue;
}

const formatNumberSuffix = (number) => {
	switch(number) {
		case 1: return number+'st';
		case 2: return number+'nd';
		case 3: return number+'rd';
		default: return number+'th';
	}
}

export {calculateBonus, formatNumberModifier, formatNumberSuffix};