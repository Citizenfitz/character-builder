import React from 'react';
import {presetData } from '../../Data';

const PresetsSelector = (props) => {
    return(
        <div>
            <label htmlFor="presetSelector">Optional Preset: </label> 
            <select id="presetSelector">
                <option defaultValue="" disabled selected >Choose</option>
                {presetData.map((i) => (
                    <option  key={i.id} value={i.id}  >
                        {i.subclass &&  ('---')}{i.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PresetsSelector;


