const calculateBonus = (attributeValue) =>{
    var bonusValue = attributeValue || 0;
    var bonusRange = [0,0,0,-3,-3,-2,-2,-1,-1,0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6];
    bonusValue = bonusRange[bonusValue];
    return bonusValue;
};


	// adds + or - to front of bonus for display
const formatNumberModifier = (bonusValue) =>{
        var bonusValue = bonusValue || 0;
        if (bonusValue > 0) {
            bonusValue = '+'+bonusValue;
        }
        return bonusValue;
    }

    function formatNumberSuffix(number) {
        switch(number) {
            case 1:
                return number+'st';
            break;
            case 2:
                return number+'nd';
            break;
            case 3:
                return number+'rd';
            break;
            default:
                return number+'th';
        }
      }

export {calculateBonus, formatNumberModifier, formatNumberSuffix};