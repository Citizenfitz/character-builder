import React, {useEffect, useState} from 'react';
import DiceBox from '@3d-dice/dice-box'
import {dataAttributes} from '../../Data';
import {
  calculateBonus,
  formatNumberModifier
} from "../Utilities";


// create new DiceBox class
const Box = new DiceBox("#dice-box", {
	theme: 'purpleRock',
	assetPath: '/assets/dice-box/'
})

// initalize DiceBox onDomReady so canvas can be properly measured
document.addEventListener("DOMContentLoaded", () => {
	Box.init()
})

document.addEventListener("mousedown", () => {
	const diceBoxCanvas = document.getElementById("dice-canvas")
	if(window.getComputedStyle(diceBoxCanvas).display !== "none") {
		Box.hide()
	}
})

const Attributes = (props) => {
	const [attributes, setAttributes] = useState(dataAttributes)
	const [pendingRoll, setPendingRoll] = useState('strength')

	useEffect(() => {
		const attribTotals = {}
		Object.entries(attributes).map(([key,value]) => attribTotals[key] = value.total)
		props.onChange(attribTotals)
	}, [attributes])

	// set the onRollComplete function onMount
	Box.onRollComplete = (results) => {
		setAttributeFromRoll(results[0].value)
	}

	// update attribute from numerical input
	const updateAttribute = (e) => {
		e.preventDefault()
		let val = e.target.value
		if(val) {
			val = parseInt(val)
		}
		const attr = e.target.id.replace("attrib-","")
		setAttributes(PrevState => {
			const newState = {...PrevState}
			newState[attr].roll = val
			newState[attr].total = val + newState[attr].bonus
			newState[attr].mod = formatNumberModifier(calculateBonus(val))
			return newState
		})
	}

	// update attribute from dice roll
	const setAttributeFromRoll = (result) => {
		const newState = {...attributes}
		newState[pendingRoll].roll = result
		newState[pendingRoll].total = result + newState[pendingRoll].bonus
		newState[pendingRoll].mod = formatNumberModifier(calculateBonus(result))
		setAttributes(() => {
			return newState
		})
	}

	// roll dice on button click
	const rollDice = (e) => {
		e.preventDefault()
		const attr = e.currentTarget.id.replace("roll-","")
		// store which attribute we're rolling for
		setPendingRoll(attr)
		// roll 3d dice
		Box.show().roll('3d6')
	}

	return (
		<div className="attributes">
			{Object.entries(attributes).map(([key, values]) => {
				return (
					<div className="attrib-group" key={key}>
						<div className="attrib-val">
							<input id={`attrib-${key}`} className="attrib-input" type="number" inputMode="numeric" min={values.min} max={values.max} value={values.total} onChange={updateAttribute} />
						</div>
						<div className="attrib-name"><button id={`roll-${key}`} onClick={rollDice}>{values.name}</button></div>
						<div className="attrib-mod">Mod: <span><input type="text" readOnly value={values.mod} /></span></div>
					</div>
				)}
			)}
		</div>
	)}
	
export default Attributes;
