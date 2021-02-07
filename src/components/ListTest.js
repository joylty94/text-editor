import React, { useState, useCallback } from 'react';

const ListText = () => {
    const [list, setList] = useState([
        {
            name: 'a',
        },
        {
            name: 'b',
        },
        {
            name: 'c',
        },
        {
            name: 'd',
        },
        {
            name: 'e',
        },
    ]);
    const onChangeValue = useCallback(
        (index) => (e) => {
            let value = e.target.value;
            setList((prev) => {
                let newPrev = [...prev];
                newPrev[index] = { name: value };
                return newPrev;
            });
        },
        []
    );
    return (
        <ul>
            {list.map((l, i) => (
                <li key={`list-${i}`}>
                    <input value={l.name} onChange={onChangeValue(i)} />
                </li>
            ))}
        </ul>
    );
};

export default ListText;
