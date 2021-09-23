import React from 'react';

const DisadSelector = (props) => (
    <div>
        <select 
            onChange={props.handleSetDisad}
            value={props.character[props.id]}
            id={props.id}
        >
            {props.dataDisads.map((option) => (
                <option 
                    key={option.id} 
                    value={option.name}
                    disabled={props.disadDisabled[option.name]}
                >
                    {option.name}
                </option>
            ))}
        </select>
</div>
);

export default DisadSelector;
