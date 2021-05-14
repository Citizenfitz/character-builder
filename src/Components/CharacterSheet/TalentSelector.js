import React, {useState} from 'react';
import {talentData, raceData } from '../../Data/';


const TalentSelector = (props) => {

    switch(props.type) {
        case 'knaveSecond':
            return (
                <div>
                    <div className="talent-class-indicator talent-class-indicator--knave"></div>
                    <select 
                        onChange={props.handleSetCharTalents} 
                        id={props.id} 
                        value={props.character.talentKnave1}
                    >
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
       
       
        {/*  --------------- All talents excpet Races -------------- */}
        case 'all':
            return (
                <div>
                    <div className="talent-class-indicator"></div>
                    <select 
                        onChange={props.handleSetCharTalents}  
                        id={props.id}
                        value={props.character[props.id]}
                    >
                        <option value="choose" disabled selected >Choose Any Talent</option>
                        <option disabled>---- Common Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='common')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name} 
                                disabled={props.talentDisabled[option.name]}
                            >
                                {option.name}
                            </option>
                        ))}
                        <option disabled>---- Fighter Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='fighter')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name} 
                                disabled={props.talentDisabled[option.name]}
                            >
                                {option.name}
                            </option>
                        ))}
                        <option disabled>---- Priest Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='priest')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name}
                                disabled={props.talentDisabled[option.name]}  
                            >
                                {option.name}
                            </option>
                        ))}
                        <option disabled>---- Magic User Talents ----</option>
                        {talentData.filter(talent => (talent.aspect ==='wizard')).map((option) => (
                            <option 
                                key={option.id} 
                                value={option.name} 
                                disabled={props.talentDisabled[option.name]} 
                            >
                                {option.name}
                            </option>
                        ))}
                        <option disabled>---- Knave Talents ----</option>
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

        {/*  --------------- All talents INCLUDING races -------------- */}
        default:
            return (
                <span>
                <label htmlFor={props.id}>-- Choose a Race or a Talent --<br /></label>
                <div className="talent-class-indicator"></div>
                <select 
                    onChange={props.handleSetCharTalents}  
                    id={props.id}
                    value={props.character[props.id]}
                >
                    <option value="choose" disabled>Choose</option>
                    <option disabled>---- Races ----</option>
                    {raceData.map((option) => (
                        <option 
                            key={option.id} 
                            value={`r-${option.name}`}
                        >
                            Race: {option.name}
                        </option>
                    ))}
                    <option disabled>---- Common Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='common')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name} 
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                    <option disabled>---- Fighter Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='fighter')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name}
                            disabled={props.talentDisabled[option.name]}  
                        >
                            {option.name}
                        </option>
                    ))}
                    <option disabled>---- Priest Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='priest')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name} 
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                    <option disabled>---- Magic User Talents ----</option>
                    {talentData.filter(talent => (talent.aspect ==='wizard')).map((option) => (
                        <option 
                            key={option.id} 
                            value={option.name} 
                            disabled={props.talentDisabled[option.name]} 
                        >
                            {option.name}
                        </option>
                    ))}
                    <option disabled>---- Knave Talents ----</option>
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


