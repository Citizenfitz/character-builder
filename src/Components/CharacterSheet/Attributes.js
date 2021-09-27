import React, {useEffect, useState} from 'react';
import DiceBox from '@3d-dice/dice-box'
import {dataAttributes} from '../../Data';

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

const Attributes = () => {
	const [attributes, setAttributes] = useState(dataAttributes)
	const [pendingRoll, setPendingRoll] = useState('strength')
	const [rollResult, setRollResult] = useState(10)

	// set the onRollComplete function onMount
	useEffect(() => {
		Box.onRollComplete = (results) => {
			setRollResult(results[0].value)
		}
	},[Box])

	useEffect(() => {
		setAttributeFromRoll(rollResult)
	},[rollResult])

	// update attribute from numerical input
	const updateAttribute = (e) => {
		e.preventDefault()
		const attr = e.target.id.replace("attrib-","")

		setAttributes(PrevState => {
			const newState = {...PrevState}
			newState[attr].roll = parseInt(e.target.value)
			return newState
		})
	}

	// update attribute from dice roll
	const setAttributeFromRoll = (result) => {
		const newState = {...attributes}
		newState[pendingRoll].roll = result
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
							<input id={`attrib-${key}`} className="attrib-input" type="text" value={values.roll} onChange={updateAttribute} />
						</div>
						<div className="attrib-name"><a id={`roll-${key}`} href="#" onClick={rollDice}>{values.name}</a></div>
						<div className="attrib-mod">Mod: <span><input type="text" readOnly value={values.mod} /></span></div>
					</div>
				)}
			)}
		</div>
	)}
	
export default Attributes;
