import React from "react";

function Input(props) {
    const { placeholder, type, className, required, onChange, name, value } = props;
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                name={name}
                value={value}
                className={`block mt-2 text-md px-3 h-9 w-[222px] border cursor-pointer border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-600  text-gray-900 focus:outline-none mb-2  transition-all duration-200 hover:bg-gray-50 ${className}`}
                id="input-id"
            />
        </div>
    );
}

export default Input;