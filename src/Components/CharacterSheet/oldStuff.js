


    const [modalState, setModalState] = useState ('');
    
    const openModal = () =>{
        setModalState('text in modal');
      }

    const closeModal = () =>{
        setModalState('');
      }



const charClassTalents = [
    { 
        'name' : 'Combat',
        'slot' : 'class1'
    },
    { 
        'name' : 'Class talent 2 name',
        'slot' : 'class2' 
    }
];
const charClassChoiceTalent = [
    { 
        'name' : 'Class  choice talent 1 name',
        'slot' : 'classChoice1'
    },
    { 
        'name' : 'Class  choice talent 2 name',
        'slot' : 'classChoice2' 
    }
];
const charClassDisadsTalents = [
    { 
        'name' : 'Disad talent 1 name',
        'slot' : 'disad1'
     },
    { 
        'name' : 'Disad talent 2 name',
        'slot' : 'disad2'
     },
    { 
        'name' : 'Disad talent 3 name',
        'slot' : 'disad3'
     }
];
const charLevelTalents = [
    { 
        'name' : 'Level 2 talent',
        'slot' : 'level2' 
    },
    { 
        'name' : 'Level 4 talent',
        'slot' : 'level4'  
    },
    { 
        'name' : 'Level 6 talent',
        'slot' : 'level6'  
    },
    { 
        'name' : 'Level 8 talent' ,
        'slot' : 'level8' 
    },
    { 
        'name' : 'Level 10 talent' ,
        'slot' : 'level10' 
    },
    { 
        'name' : 'Level 12 talent',
        'slot' : 'level12'  
    }

];


 {/*       <ol>
            {charClassTalents.map((i) => (
                <li key={i.id}>
                    <i>{i.slot}</i> - {i.name}
                </li>
            ))}
            {charClassChoiceTalent.map((i) => (
                <li key={i.id}>
                <i>{i.slot}</i> - {i.name}
                </li>
            ))}
            {charClassDisadsTalents.map((i) => (
                <li key={i.id}>
                <i>{i.slot}</i> - {i.name}
                </li>
            ))}
            {charLevelTalents.map((i) => (
                <li key={i.id}>
                    <i>{i.slot}</i> - {i.name}
                </li>
            ))}
        </ol>
*/}



            {/*     
                <OptionModal 
                        modalState={modalState}
                        closeModal={() =>closeModal()}
                    />
                    <button onClick={openModal}>test modal</button>
            */}




const CharacterSummary = (props) =>{

    return (
    <div>
        <section>
        <select onChange={props.handleCharLevel}>
            {levelsData.map((i) => (
                <option 
                    key={i.level} 
                    value={i.level} 
                >
                    {i.level}{i.suffix}
                </option>
            ))}
        </select>&nbsp;
         level {props.charRace} {props.charAspect}
         </section>
    </div>
    )
}



<table className="table table-levels">
<thead>
    <tr> 
        <th>Level</th>
        <th>label</th>	
        <th>Talent</th>	
        <th>Talent Level</th> 
    </tr>
</thead>
<tbody>
{/*  --------------- 1st Level - always Combat talent -------------- */}
<tr>
    <td rowspan="6">1st</td>
    <td>Class Assigned Talent 1: </td>
    <td>{character.talentAssigned1}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr>
    <td>Class Assigned Talent 2: </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr>
    <td>Class Assigned Talent 2: </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr>
    <td>1st Level Talent </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr>
    <td>Disad 1 Talent </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr>
    <td>Disad 2 Talent </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr className="ut-zebra-gray">
    <td>3</td>
    <td>3rd Level Talent </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr>
    <td>5</td>
    <td>5th level Talent </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr  className="ut-zebra-gray">
    <td>7</td>
    <td>7th Level Talent </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
<tr>
    <td>9</td>
    <td>9th Level Talent </td>
    <td>{character.talentAssigned2}</td>
    <td>1/2 level adjacent</td>
</tr>
</tbody>
</table>