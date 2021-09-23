import React, {useState} from 'react';
import {dataAttributes} from '../../Data';

const Attributes = () => {
    const [talent, setTalent] = useState(1);
    const showIt = true;

    return (
        <div>
            <section className="card">
            <h2>Attributes</h2>
            <table border="1">
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
            </section>
        </div>
    )
};

export default Attributes;


