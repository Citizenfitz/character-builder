import React, {useState} from 'react';
import {dataAttributes} from '../../Data';

const Attributes = () => {
    return (
        <div>
            <table border="1" className="table table--attributes">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Roll</th>
                        <th>Mod</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAttributes.map((attribute) => (
                        <tr key={attribute.name}>
                            <td>{attribute.name}</td>
                            <td>{attribute.roll}</td>
                            <td>{attribute.mod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Attributes;


