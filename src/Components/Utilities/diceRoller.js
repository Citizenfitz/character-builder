function diceRoller(diceNumber, diceSides, diceBonus, diceDropLowest, special)
		//need to pass it number, number, number, and boolean
		{
		var i = 0;
		var diceNumber = diceNumber || 1;
		var diceSides = diceSides || 6;
		var diceBonus = diceBonus || 0;
		var diceDropLowest = diceDropLowest || false; // whether to drop the lowest die rolled for total
        var special = special || ' '; // whether to roll dice with advantage
        var die1 = 0;
        var die2 = 0
        var advantageTotal = 0;
        
        // if has special
        if (special==='advantage') {
        	for (i=1; i<=diceNumber; i++)
            {
                die1 = (Math.floor(Math.random()*diceSides)+1);
                die2 = (Math.floor(Math.random()*diceSides)+1);
                if(die1 > die2) {
                    advantageTotal += die1;
                } else { advantageTotal += die2; }
            };
            console.log(die1 + ' ' + die2+ ' advantage! '+advantageTotal); 
        } else if (special==='disadvantage') {
        	for (i=1; i<=diceNumber; i++)
            {
                die1 = (Math.floor(Math.random()*diceSides)+1);
                die2 = (Math.floor(Math.random()*diceSides)+1);
                if(die1 > die2) {
                    advantageTotal += die2;
                } else { advantageTotal += die1; }
            };
            console.log(die1 + ' ' + die2+ ' disadvantage! '+advantageTotal); 
        };
	
	    // if drop lowest
		if (special==='droplowest' && diceSides===6 && diceNumber>1){
			diceDropLowest=false // only allowed on six-sided dice with 2 dice or more
		};
		
		var diceRollHistory=new Array();
		diceRollHistory.length=0;
		var diceRollTotal=0;

		for (i=1; i<=diceNumber; i++)
		{
		 diceRollHistory.push((Math.floor(Math.random()*diceSides)+1));
		};
	
		diceRollHistory.sort(); 
		// sorts rolls from lowest to highest.
		// only works as long as dice are 9-sided or less which is why we only allow it for 6-siders
	
		//the loop below uses the boolean as a number to start the array at 0 or one thus automatically dropping the first value (now the lowest die) if true
		for (i= Number(diceDropLowest); i< diceRollHistory.length; i++) {
			diceRollTotal=diceRollTotal+diceRollHistory[i];
		};
	
	    // if none of the above
	    
	    
		//add in the bonus, if any
		diceRollTotal=diceRollTotal+diceBonus;
	
		return diceRollTotal;
	}