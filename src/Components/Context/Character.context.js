import React, { createContext, useReducer } from 'react'
import { dataAttributes } from '../../Data/dataAttributes';

const initialState = {
	playerName: "",
	characterName: "",
	class: "fighter",
	level: 1,
	attributes: {...dataAttributes},
	ac: 0,
	hitDice: 1,
	hp: 0,
	movement: 30,
	perception: 10,
	hitDiceBonus: null,
	saveBonus: 0,
	xp: 0,
	alignment: "Neutral",
	subclass: false,
	aspect: {
		name: "",
		title: "",
		description: ""
	},
	race: {
		name: "",
		desc: ""
	},
	armor: {
		armor: "none",
    ac: 0,
    penalty: 0,
	},
	meleeWeapon: null,
	rangeWeapon: null,
	disads: [],
	talents: [],
	specAbilities: []
}

export const CharacterContext = createContext()

// calculated value placeholders
let ac

const userReducer = (state, action) => {
  switch (action.type) {
    case 'update': 
			return ({
				...state,
				...action.data
			})
		case 'updateAttr':
			// thing that need recalculates when attributes change
			// ac
			ac = state.armor.ac + action.data.dexterity.mod

			return({
				...state,
				ac,
				attributes: { ...action.data }
			})
		case 'updateArmor':
			// calc new ac and armor disadvantage
			ac = state.attributes.dexterity.mod + action.data.ac
			return ({
				...state,
				ac,
				armor: action.data
			})
    case 'reset': 
			return ({
				...initialState
			})
    default: throw new Error('Unexpected action')
  }
}

export const CharacterProvider = (props) => {
  const data = useReducer(userReducer, initialState)
  return (
    <CharacterContext.Provider value={data}> 
      {props.children}
    </CharacterContext.Provider>
  )
}

export const CharacterConsumer = CharacterContext.Consumer
