import React, {useEffect, useState} from 'react';
import DiceBox from '@3d-dice/dice-box'
import {dataAttributes} from '../../Data';

// create new DiceBox class
const Box = new DiceBox("#dice-box", {
	theme: 'purpleRock',
	assetPath: '/assets/dice-box/'
})

// initalize DiceBox onDomReady so canvas can be properly measured
document.addEventListener("DOMContentLoaded", function() {
	Box.init()
})

const Attributes = () => {
	const [attributes, setAttributes] = useState(dataAttributes)
	const [pendingRoll, setPendingRoll] = useState('strength')

	useEffect(() => {
		Box.onRollComplete = (results) => {
			setAttributeFromRoll(results[0].value)
		}
	},[])

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
		setAttributes(PrevState => {
			const newState = {...PrevState}
			newState[pendingRoll].roll = result
			return newState
		})
	}

	// roll dice on button click
	const rollDice = (e) => {
		const attr = e.currentTarget.id.replace("roll-","")
		// store which attribute we're rolling for
		setPendingRoll((prev) => attr)
		// roll 3d dice
		Box.roll('3d6')
	}

	return (
		<div className="attributes">
			<table border="1" className="table table--attributes">
				<thead>
					<tr>
						<th>Attribute</th>
						<th>Roll</th>
						<th>Mod</th>
					</tr>
				</thead>
				<tbody>
				{Object.entries(attributes).map(([key, values]) => {
					return (
					<tr key={key}>
						<td>{values.name}</td>
						<td>
							<input id={`attrib-${key}`} className="attribInput" type="number" value={values.roll} onChange={updateAttribute} />
							<button id={`roll-${key}`} onClick={rollDice}>
								<img src="/assets/images/rolling-dices.svg" width="24" height="24" />
							</button>
						</td>
						<td>{values.mod}</td>
					</tr>
				)})}
				</tbody>
			</table>
		</div>
	)}
	
export default Attributes;
