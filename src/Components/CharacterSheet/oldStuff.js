


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