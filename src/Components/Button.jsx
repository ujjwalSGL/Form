import React from 'react'

function Button({ type, children, className, name, value, disabled }) {
    return (
        <div>
            <button
                type={type}
                className={className}
                name={name}
                value={value}
                disabled={disabled}
            >{children}</button>
        </div>
    )
}
export default Button