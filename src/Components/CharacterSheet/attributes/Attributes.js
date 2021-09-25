import React, {useState} from 'react';
// import DiceBox from '@3d-dice/dice-box'
// import DiceParser from '@3d-dice/fdp'
import {dataAttributes} from '../../../Data';
import "./_attributes.scss"

const Attributes = () => {
	const [attributes, setAttributes] = useState(dataAttributes)
	// create DiceBox
	// let Box = new DiceBox("#dice-box",{
	// 	assetPath: '/assets/'
	// })
	// create Roller
	// const Roller = new DiceParser()

	const updateAttribute = (e) => {
		e.preventDefault()
		const attr = e.target.id.replace("attrib-","")

		setAttributes(PrevState => {
			const newState = {...PrevState}
			newState[attr].roll = parseInt(e.target.value)
			return newState
		})
		
	}
	const rollDice = (e) => {
		console.log('rolling')
		// this.DRP.parseNotation('3d6')
		// Box.roll('3d6')

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
					console.log('key', values)
					return (
					<tr key={key}>
						<td>{values.name}</td>
						<td>
							<input id={`attrib-${key}`} className="attribInput" type="number" value={values.roll} onChange={updateAttribute} />
							<button onClick={rollDice}>
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
			
			
			