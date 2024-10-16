import React from 'react';

const Select = ({ options, Style, value, onChange, name }) => {
    let focusBG = {
        FG1: "focus:ring focus:ring-blue-500 bg-red-600",
        FG2: "focus:ring focus:ring-red-500 bg-green-300",
        FG3: "focus:ring focus:ring-black bg-blue-300",
        FG4: "focus:ring focus:ring-green-500 bg-pink-300",
    };

    return (
        <select
            className={`block w-[222px] h-9 px-3 border appearance-none mt-2 border-gray-300  rounded-md shadow-sm  ${focusBG[Style]}`}
            value={value}
            onChange={onChange}
            name={name}
            options={options}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
