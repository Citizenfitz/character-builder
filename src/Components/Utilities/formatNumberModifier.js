	// adds + or - to front of bonus for display
    formatNumberModifier = function(bonusValue){
        var bonusValue = bonusValue || 0;
        if (bonusValue > 0) {
            bonusValue = '+'+bonusValue;
        }
        return bonusValue;
    }