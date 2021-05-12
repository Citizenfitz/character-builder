calculateBonus = function(attributeValue){
    var bonusValue = attributeValue || 0;
    var bonusRange = [0,0,0,-3,-3,-2,-2,-1,-1,0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6];
    bonusValue = bonusRange[bonusValue];
    return bonusValue;
};

