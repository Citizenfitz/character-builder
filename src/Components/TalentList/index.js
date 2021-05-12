import React from 'react';
import {talentData } from '../../Data/';

const TalentList = () =>{
    return (
        <div className="talent-descriptions">
        <h2>Talent Descriptions</h2>


            <h3 className="ut-color-common">Common Talents</h3>
            <ol>
                {talentData.filter(talent => (talent.aspect ==='common')).map((talent) => (
                <li key={talent.id}>
                    <b>{talent.name}</b> - {talent.desc}
                </li>
                ))}
            </ol>

            <h3 className="ut-color-fighter">Fighter Talents</h3>
            <ol>
                {talentData.filter(talent => (talent.aspect ==='fighter')).map((talent) => (
                <li key={talent.id}>
                    <b>{talent.name}</b> - {talent.desc}
                </li>
                ))}
            </ol>

            <h3 className="ut-color-priest">Priest Talents</h3>
            <ol>
                {talentData.filter(talent => (talent.aspect ==='priest')).map((talent) => (
                <li key={talent.id}>
                    <b>{talent.name}</b> - {talent.desc}
                </li>
                ))}
            </ol>

            <h3 className="ut-color-wizard">Wizard Talents</h3>
            <ol>
                {talentData.filter(talent => (talent.aspect ==='wizard')).map((talent) => (
                <li key={talent.id}>
                    <b>{talent.name}</b> - {talent.desc}
                </li>
                ))}
            </ol>

            <h3 className="ut-color-knave">Knave Talents</h3>
            <ol>
                {talentData.filter(talent => (talent.aspect ==='knave')).map((talent) => (
                <li key={talent.id}>
                    <b>{talent.name}</b> - {talent.desc}
                </li>
                ))}
            </ol>

        </div>
    )
}

export default TalentList;


