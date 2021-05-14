import React, {useState} from 'react';
import TalentList from '../TalentList';
import LevelsTable from './LevelsTable';
import PresetsSelector from './PresetsSelector';
import {aspectData, levelsData, presetData, talentData, raceData} from '../../Data';
import OptionModal from '../OptionModal';

{/*  --------------- UTILITIES -------------- */}

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
    const bonusValue = number || 0;
    if (bonusValue > 0) {
        bonusValue = '+'+bonusValue;
    }
    return bonusValue;
}

const CharacterSheet = () => {
    const [character, setCharacter] = useState({
        name: '',
        level : 1,
        race : 'Human',
        gender: 'Male',
        aspect : aspectData[0].name,
        hitDiceType: aspectData[0].hitDiceType,
        attribStr: 10,
        attribDex: 10,
        attribInt: 10,
        attribWis : 10,
        attribCon: 10,
        attribCha: 10,
        disad1 : '',
        disad2 : '',
        talentAssigned1 : 'Combat',
        talentAssigned2 : 'Multi-attack',
        talentLevel1 : 'choose',
        talentKnave1 : 'choose',
        talentDisad1 : 'choose',
        talentDisad2 : 'choose',
        talentLevel3 : 'choose',
        talentLevel5 : 'choose',
        talentLevel7 : 'choose',
        talentLevel9 : 'choose'
    })

    const [talentDisabled, setTalentDisabled] = useState({
        'Alertness' : false, 
        'Attribute Increase' : false, 
        'Medical' : false, 
        'Riding' : false, 
        'Stronghold' : false, 
        'Survival & Tracking' : false, 
        'Berserk' : false, 
        'Blind Fighting' : false, 
        'Bravery' : false, 
        'Combat' : true, 
        'Combat Specialization' : false, 
        'Durability' : false, 
        'Multi-Attack' : true, 
        'Missle Deflection' : false, 
        'Abjuration' : false, 
        'Bestow Blessing' : false, 
        'Thaurmaturgy' : false, 
        'Divine Attunement' : false, 
        'Incorruptibility' : false, 
        'Psychic Sensitivity' : false, 
        'Scholarly Knowledge' : false, 
        'Sermonize' : false, 
        'Acrobatics' : false, 
        'Assassination' : false, 
        'Backstabbing' : false, 
        'Beguilement' : false, 
        'Inspiration' : false, 
        'Burglary' : false, 
        'Climbing' : false, 
        'Disguise' : false, 
        'Escapology' : false, 
        'Fraud' : false, 
        'Lore & Read Magic' : false, 
        'Sleight of hand' : false, 
        'Stealth' : false, 
        'Arcane Knowledge' : false, 
        'Arcane Sensitivity' : false, 
        'Encumbered Casting' : true, 
        'Spell Refashionment' : true, 
        'Stealth Casting' : true, 
        'Wizardry 1' : false, 
        'Wizardry 2' : true, 
        'Wizardry 3' : true 
    })

    const handleCharLevel = e => {
        const {value}  = e.target;
        setCharacter((PrevState) => ({ ...PrevState, level : value }));
     };

    const handleCharAspect = e => {
        const newAspectId= e.target.value;
        setCharacter((PrevState) => ({ ...PrevState, aspect : aspectData[newAspectId].name}));
        setCharacter((PrevState) => ({ ...PrevState, hitDiceType : aspectData[newAspectId].hitDiceType}));
        const oldTalent = character.assignedTalent2;
        const newTalent = aspectData[newAspectId].assignedTalent2;
        setCharacter((PrevState) => ({ ...PrevState, talentAssigned2 : aspectData[newAspectId].assignedTalent2}));
        setTalentStates(oldTalent, newTalent);
     };

     const handlePreset = e =>{
        const {value} = e.target;
        setCharacter((PrevState) => ({ 
            ...PrevState,  
            aspect : presetData[value].aspect,
            talentAssigned2 : presetData[value].talentAssigned2,
            talentLevel1 : presetData[value].talentLevel1,
            talentKnave1  : presetData[value].talentKnave1, 
            talentDisad1 : presetData[value].talentKnave1, 
            talentDisad2 : presetData[value].talentKnave1, 
            talentLevel3 : presetData[value].talentLevel3, 
            talentLevel5 : presetData[value].talentLevel5, 
            talentLevel7 : presetData[value].talentLevel7, 
            talentLevel9 : presetData[value].talentLevel9, 
        }));


     }

    const handleSetCharTalents = e => {
        let value = e.target.value;
        {/*  see if it's seetting a race, reversing race to human, or neither */}
        const talentType = value.substring(0,2);
        const talentNoPrefix = value.substring(2);
        const talentBeingReplaced = character[e.target.id];

        switch (talentType){
            // if it's setting a race
            case 'r-' : return (
                setCharacter((PrevState) => ({ ...PrevState, race : talentNoPrefix })),
                setCharacter((PrevState) => ({ ...PrevState,  [e.target.id] : talentNoPrefix }))
            )
            break;
            // if it's choosing a talent and defaulting back to human
            case 'h-' : return (
                setCharacter((PrevState) => ({ ...PrevState, race : 'Human' })),
                setCharacter((PrevState) => ({ ...PrevState,  [e.target.id] : talentNoPrefix }))
            )
            break;
            // if it's nothing to do with race and just choosing a talent
            default: return (
                setCharacter((PrevState) => ({ ...PrevState,  [e.target.id] : value })),
                setTalentStates(talentBeingReplaced, value)
            )
        }  
    }

    const setTalentStates =(oldTalent, newTalent) => {
        // enable old talent that was delected
        setTalentDisabled((PrevState) => ({ ...PrevState,  [oldTalent] : false }))
        // disable new talent that was chosen
        setTalentDisabled((PrevState) => ({ ...PrevState,  [newTalent] : true }))
        // if new talent was Attribute Increase then re-enable it
        if (newTalent ==='Attribute Increase') {
            setTalentDisabled((PrevState) => ({ ...PrevState,  [newTalent] : false }))
        }
        // if Wizardry 1 is chosen enable all other wizard talents except Wizardry 3
        if (newTalent ==='Wizardry 1') {
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Wizardry 2' : false }))
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Encumbered Casting' : false }))
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Spell Refashionment' : false }))
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Stealth Casting' : false }))
        }
        // if Wizardry 1 is deslected disable all other sub-talents 
        // also check to see if user has already chosen other sub-talents and if so, remove them
        if (oldTalent ==='Wizardry 1') {
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Wizardry 2' : true }))
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Encumbered Casting' : true }))
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Spell Refashionment' : true }))
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Stealth Casting' : true }))
            clearTalentSlots('Wizardry 2');
            clearTalentSlots('Encumbered Casting');
            clearTalentSlots('Spell Refashionment');
            clearTalentSlots('Stealth Casting');
        }
        // if Wizardry 2 is chosen, enable Wizardry 3
        if (newTalent ==='Wizardry 2') {
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Wizardry 3' : false }))
        }
        // if Wizardry 2 is deslected, disable Wizardry 3
        // also check to see if user has already chosen Wizardry 3 and if so, remove it
        if (oldTalent ==='Wizardry 2') {
            setTalentDisabled((PrevState) => ({ ...PrevState,  'Wizardry 3' : true }))
            clearTalentSlots('Wizardry 3');
        }
    }

    const clearTalentSlots = (talentToRemove) => {
        const talentSlotName = [
            'talentAssigned1',
            'talentAssigned2',
            'talentLevel1',
            'talentKnave1',
            'talentDisad1',
            'talentDisad2',
            'talentLevel3',
            'talentLevel5',
            'talentLevel7',
            'talentLevel9'
        ];

        for (let i=0; i < talentSlotName.length; i++){
            let talentSlot = talentSlotName[i];
            if (character[talentSlot] === talentToRemove) {
                setCharacter((PrevState) => ({ ...PrevState,  [talentSlot] : '' }))
            }
        }
    }


    return (
        <div>
    
            {/*  --------------- OPTIONAL PRESETS - Not working yet -------------- */}
            <section>
                <PresetsSelector
                    presetData={presetData}
                    handlePreset={handlePreset}
                 />
            </section>

            {/*  --------------- TOP CHAR STUFF -------------- */}
            <section>
                <select onChange={handleCharLevel}>
                {levelsData.map((i) => (
                    <option 
                        key={i.level} 
                        value={i.level} 
                    >
                    {formatNumberSuffix(i.level)}
                    </option>
                ))}
            </select>&nbsp;

            level <span className="ut-captialize">{character.race}</span>
            
            {aspectData.map((i) => (
                <span key={i.name} className="checkbox-wrapper">
                    <input 
                        type="radio" 
                        name="class" 
                        value={i.id} 
                        id={i.name} 
                        checked={character.aspect === i.name}
                        onClick={handleCharAspect}
                    ></input>
                    <label htmlFor={i.name} className={i.name}>{i.name}</label>
                </span>
                ))}
                </section>

            {/*  --------------- Disads -------------- */} 
           <h3>Disadvantages</h3>
           <p><b>Optionally</b> Select up to two disadvantages at 1st level. Each grants an additional starting talent.</p>
            <label>Optional Disadvantage 1: </label><br />
            <label>Optional Disadvantage 2: </label>

            {/*  --------------- Big table with levels stuff -------------- */}
            <LevelsTable 
                character={character} 
                talentDisabled={talentDisabled}
                handleSetCharTalents={handleSetCharTalents}
            />

            {/*  --------------- Current Talents for debugging -------------- 
            <section> 
            <h2>Current Talents</h2>
                <ol>
                <li>Assigned 1: {character.talentAssigned1}</li>
                <li>Assigned 2: {character.talentAssigned2}</li>
                <li>Race or Talent: {character.talentLevel1}</li>
                <li>Knave-only talent: {character.talentKnave1}</li>
                <li>Disad 1: {character.talentDisad1}</li>
                <li>Disad 2: {character.talentDisad2}</li>
                <li>3rd: {character.talentLevel3}</li>
                <li>5th: {character.talentLevel5}</li>
                <li>7th: {character.talentLevel7}</li>
                <li>9th: {character.talentLevel9}</li>
                </ol>
            </section>  

            */}


            {/*  --------------- Talent definitions - will probably be in a tray or something. -------------- */}
            <section> 
                <TalentList />
            </section>      

        </div>
    )
}


export default CharacterSheet;
