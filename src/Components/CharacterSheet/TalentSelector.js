import React, {useState} from 'react';
import {talentData, raceData } from '../../Data/';


const TalentSelector = (props) => {

    switch(props.type) {
        case 'knaveSecond':
            return (
                <div>
                    <div className="talent-class-indicator talent-class-indicator--knave"></div>
                    <select onChange={props.handleSetCharTalents} id={props.id} defaultValue={props.character.talentKnave1}>
                    <option defaultValue="choose" disabled selected >Choose Any Knave Talent</option>
                    {talentData.filter(talent => (talent.aspect ==='knave')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name}
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                    </select>
                </div>
            )
        break;
        case 'all':
            return (
                <div>
                    <div className="talent-class-indicator talent-class-indicator--wizard"></div>
                    <select onChange={props.handleSetCharTalents}  id={props.id}>
                        <option defaultValue="choose" disabled selected >Choose Any Talent</option>
                        <option defaultValue="" disabled>---- Common Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='common')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name} 
                                disabled={props.talentDisabled[option.name]}
                            >
                                {option.name}
                            </option>
                        ))}
                        <option defaultValue="" disabled>---- Fighter Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='fighter')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name} 
                                disabled={props.talentDisabled[option.name]}
                            >
                                {option.name}
                            </option>
                        ))}
                        <option defaultValue="" disabled>---- Priest Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='priest')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name}
                                disabled={props.talentDisabled[option.name]}  
                            >
                                {option.name}
                            </option>
                        ))}
                        <option defaultValue="" disabled>---- Magic User Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='wizard')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name} 
                                disabled={props.talentDisabled[option.name]} 
                            >
                                {option.name}
                            </option>
                        ))}
                        <option defaultValue="" disabled>---- Knave Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='knave')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name} 
                                disabled={props.talentDisabled[option.name]} 
                            >
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            )
        break;
        default:
            return (
                <span>
                <label htmlFor={props.id}>-- Choose a Race or a Talent --<br /></label>
                <select onChange={props.handleSetCharTalents}  id={props.id}>
                    <option defaultValue="choose" disabled selected hidden>Choose</option>
                    <option defaultValue="" disabled>---- Races ----</option>
                    {raceData.map((option) => (
                        <option 
                            key={option.id} 
                            value={`r-${option.name}`}
                        >
                            Race: {option.name}
                        </option>
                    ))}
                    <option defaultValue="" disabled>---- Common Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='common')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name} 
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                    <option defaultValue="" disabled>---- Fighter Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='fighter')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name}
                            disabled={props.talentDisabled[option.name]}  
                        >
                            {option.name}
                        </option>
                    ))}
                    <option defaultValue="" disabled>---- Priest Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='priest')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name} 
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                    <option defaultValue="" disabled>---- Magic User Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='wizard')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name} 
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                    <option defaultValue="" disabled>---- Knave Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='knave')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name} 
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
                </span>
            )
    }
}

export default TalentSelector;


