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
	armor: null,
	meleeWeapon: null,
	rangeWeapon: null,
	disads: [],
	talents: [],
	specAbilities: []
}

export const CharacterContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'update': 
			return ({
				...state,
				...action.data
			})
		case 'updateAttr': 
			return({
				...state,
				attributes: { ...action.data }
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
