import React from "react";

function Input({ placeholder, type, className, required, onChange, disabled, name, value }) {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                name={name}
                value={value}
                disabled={disabled}
                className={`block mt-2 text-md px-3 h-9 border cursor-pointer border-gray-300 focus:ring-1 focus:ring-indigo-600  text-gray-900 focus:outline-none mb-2  transition-all duration-200 hover:bg-gray-50 ${className}`}
                id="input-id"
            />
        </div>
    );
}

export default Input;