import React from 'react';
import {levelsData, talentData } from '../../Data';
import TalentSelector from './TalentSelector';


//  --------------- UTILITIES -------------- 

const formatNumberSuffix = (number) => {
    switch(number) {
        case 1:
            return number+'st';
        break;
        case 2:
            return number+'nd';
        break;
        case 3:
            return number+'rd';
        break;
        default:
            return number+'th';
    }
}

const formatNumberModifier = (number) =>{
    let bonusValue = number || 0;
    if (bonusValue > 0) {
        bonusValue = '+'+bonusValue;
    }
    return bonusValue;
}


const LevelsTable = (props) => {
    
    return (
    <div>
    <table className="table table-levels">
        <thead>
            <tr> 
                <th style={{minWidth: "58px"}}>Level</th>	
                <th>HD</th>	
                <th>Save Bonus</th>	
                <th>Talents</th>	
                <th>Talent Details</th> 
            </tr>
        </thead>
        <tbody>
        {/*  --------------- 1st Level - always Combat talent -------------- */}
        <tr className={props.character.level === 1 ? 'table-row--highlight' : ''}>
            <td rowSpan={props.character.aspect ==='knave' ?  4 : 3}  className="ut-align-center">
                1st
            </td>
            <td rowSpan={props.character.aspect ==='knave' ?  4 : 3}  className="ut-align-center">
                1d{props.character.hitDiceType}
            </td>
            <td rowSpan={props.character.aspect ==='knave' ?  4 : 3}   className="ut-align-center">
                +0
            </td>
            <td>
                {props.character.talentAssigned1}
            </td>
            <td>
                {talentData.filter(talent => (talent.name === props.character.talentAssigned1)).map((option) => (
                    <span key={option.aspect}>
                        {option.aspect}
                    </span>
                ))}
                 - {props.character.talentAssigned1Type}
            </td>
        </tr>
        {/*  --------------- 1st Level - Assigned based on class (aspect) -------------- */}
        <tr>
            <td>
                {props.character.talentAssigned2}
            </td>
            <td>
                <b className="talent-class-indicator talent-class-indicator--knave">K</b>  <i>Adjacent</i>
            </td>
        </tr>
        {/*  --------------- 1st Level - Choose a race or any talent -------------- */}
        <tr>
            <td>
                <TalentSelector 
                    type="race" 
                    id="talentLevel1"
                    handleSetCharTalents={props.handleSetCharTalents}
                    talentDisabled={props.talentDisabled}
                    character={props.character}
                /></td>
            <td>
                {talentData.filter(talent => (talent.name === props.character.talentLevel1Type)).map((option) => (
                    <span key={option.aspect}>
                        {option.aspect}
                    </span>
                ))}
                 - {props.character.talentLevel1Type}
            </td>

        </tr>
        {/*  --------------- 1st Level - If they're a Knave they get an extra talent -------------- */}
        {props.character.aspect ==='knave' && ( <tr>
            <td>
                <TalentSelector 
                    type="knaveSecond" 
                    id="talentKnave1"
                    handleSetCharTalents={props.handleSetCharTalents}
                    talentDisabled={props.talentDisabled}
                    character={props.character}
                /></td>
            <td>details</td>
        </tr>  )}  
        {/*  --------------- 1st Level - If they have a disad they get an extra talent  -------------- */}
        {(props.character.disad1 != 'none') && (<tr>
            <td>Disad 1</td>
            <td></td>
            <td></td>
            <td>
                <TalentSelector 
                    type="all"  
                    id="talentDisad1"
                    talentDisabled={props.talentDisabled} 
                    handleSetCharTalents={props.handleSetCharTalents} 
                    character={props.character}
                />
            </td>
            <td>details</td>
        </tr> )}
        {/*  --------------- 1st Level - If they have a second disad they get a seconmd extra talent  -------------- */}
        {(props.character.disad2 != 'none') && ( <tr>
            <td>Disad 2</td>
            <td></td>
            <td></td>
            <td>
                <TalentSelector 
                    type="all"  
                    id="talentDisad2"
                    talentDisabled={props.talentDisabled} 
                    handleSetCharTalents={props.handleSetCharTalents} 
                    character={props.character}
                />
            </td>
            <td>details</td>
        </tr>  )}
        
        {/*  --------------- All the other levels   -------------- */}
        {levelsData.filter(i => i.level > 1).map((i) => (
            <tr key={i.level} className={(i.level % 2 === 0) ? 'ut-zebra-gray' : 'ut-zebra-white'}>
                <td className="ut-align-center">{formatNumberSuffix(i.level)}</td> 
                <td className="ut-align-center">
                    {i.hitDice}d{props.character.hitDiceType}
                    {i.hitDiceBonus && ( <span>+{i.hitDiceBonus}</span> ) }
                </td>	
                <td className="ut-align-center">
                    {i.saveBonus > 0 && ( <span>+</span> ) }{i.saveBonus}
                </td>	
                <td>
                    {i.getsTalent ?  
                    <TalentSelector 
                        type="all" 
                        id={`talentLevel${i.level}` } 
                        talentDisabled={props.talentDisabled} 
                        handleSetCharTalents={props.handleSetCharTalents} 
                        character={props.character}
                    /> : <span>&nbsp;</span>}
                </td>	
                <td>
                    {i.getsTalent ?  'details' : <span>&nbsp;</span>}
                </td>	
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    )
}

export default LevelsTable;
